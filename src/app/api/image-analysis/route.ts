import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { apiEndpoints } from '@/utils/constants/endpoints'
import { mainFolder, subfolders } from '@/utils/constants/images'

import type { CloudinaryResponse } from '@/types/article/cloudinaryApiCall'
import { environment } from '@/types/environment'

import { AzureKeyCredential } from '@azure/core-auth'
import type {
    CropRegionOutput,
    DenseCaptionOutput,
    DetectedObjectOutput,
    DetectedPersonOutput,
    DetectedTagOutput,
    DetectedTextBlockOutput,
    ImageAnalysisClient,
} from '@azure-rest/ai-vision-image-analysis'
import createImageAnalysisClient, {
    isUnexpected,
} from '@azure-rest/ai-vision-image-analysis'
import axios from 'axios'

const analyzeImageFromUrl = async (
    client: ImageAnalysisClient,
    imageUrl: string,
    features: string[],
): Promise<void> => {
    const result: { data: any } = await client
        .path('/imageanalysis:analyze')
        .post({
            body: {
                url: imageUrl,
            },
            queryParameters: {
                features: features,
                'smartCrops-aspect-ratios': [0.9, 1.33],
            },
            contentType: 'application/json',
        })

    if (isUnexpected(result)) {
        throw result.body.error
    }

    console.log(`Model Version: ${result.body.modelVersion}`)
    console.log(`Image Metadata: ${JSON.stringify(result.body.metadata)}`)
    if (result.body.captionResult)
        console.log(
            `Caption: ${result.body.captionResult.text} (confidence: ${result.body.captionResult.confidence})`,
        )
    if (result.body.denseCaptionsResult)
        result.body.denseCaptionsResult.values.forEach(
            (denseCaption: DenseCaptionOutput) =>
                console.log(`Dense Caption: ${JSON.stringify(denseCaption)}`),
        )
    if (result.body.objectsResult)
        result.body.objectsResult.values.forEach(
            (object: DetectedObjectOutput) =>
                console.log(`Object: ${JSON.stringify(object)}`),
        )
    if (result.body.peopleResult)
        result.body.peopleResult.values.forEach(
            (person: DetectedPersonOutput) =>
                console.log(`Person: ${JSON.stringify(person)}`),
        )
    if (result.body.readResult)
        result.body.readResult.blocks.forEach(
            (block: DetectedTextBlockOutput) =>
                console.log(`Text Block: ${JSON.stringify(block)}`),
        )
    if (result.body.smartCropsResult)
        result.body.smartCropsResult.values.forEach(
            (smartCrop: CropRegionOutput) =>
                console.log(`Smart Crop: ${JSON.stringify(smartCrop)}`),
        )
    if (result.body.tagsResult)
        result.body.tagsResult.values.forEach((tag: DetectedTagOutput) =>
            console.log(`Tag: ${JSON.stringify(tag)}`),
        )
}

export const POST = async (request: NextRequest): Promise<NextResponse> => {
    const formData = await request.formData()
    const image = formData.get('file')

    if (!image || !(image instanceof File)) {
        return NextResponse.json(
            { error: 'Invalid file upload' },
            { status: 400 },
        )
    }
    // STEP#1 : Upload the image to Cloudinary
    const cloudinaryForm = new FormData()

    //// Determine the subfolder based on the environment
    const subfolder =
        process.env.NODE_ENV === 'development'
            ? subfolders.development
            : subfolders.production

    //// Append necessary fields to the form data
    cloudinaryForm.append('file', image)
    cloudinaryForm.append('folder', `${mainFolder}/${subfolder}`)
    cloudinaryForm.append('upload_preset', 'unsigned')

    //// Make the request to Cloudinary
    const response = await axios.post(apiEndpoints.CLOUDINARY, cloudinaryForm)

    if (response.status !== 200)
        return NextResponse.json(
            {
                message: 'Image could not be uploaded on Cloudinary',
            },
            { status: 500 },
        )

    const imageData = response.data as CloudinaryResponse

    // return NextResponse.json({
    //     message: 'Image uploaded successfully',
    //     data: imageData,
    // })

    // STEP#2 : Analyze the image 🔥

    const endpoint: string = environment.AZURE_COGNITIVE_SERVICES_ENDPOINT
    const key: string = environment.AZURE_COGNITIVE_SERVICES_KEY
    const credential = new AzureKeyCredential(key)

    const client: ImageAnalysisClient = createImageAnalysisClient(
        endpoint,
        credential,
    )

    const features: string[] = [
        'Caption',
        'DenseCaptions',
        'Objects',
        'People',
        'Read',
        'SmartCrops',
        'Tags',
    ]

    await analyzeImageFromUrl(client, imageData.secure_url, features)
}
