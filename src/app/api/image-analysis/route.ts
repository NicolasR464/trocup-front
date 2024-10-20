/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import type { ImageAnalysisSuccess } from '@/utils/apiCalls/local'
import { apiEndpoints } from '@/utils/constants/endpoints'
import { mainFolder, subfolders } from '@/utils/constants/images'
import {
    categoriesList,
    products,
    subcategoriesList,
} from '@/utils/constants/productValues'

import { StateSchema } from '@/types/article'
import type { CloudinaryResponse } from '@/types/article/cloudinaryApiCall'
import { environment } from '@/types/environment'

import { AzureKeyCredential } from '@azure/core-auth'
import type {
    AnalyzeFromUrl200Response,
    AnalyzeFromUrlDefaultResponse,
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
): Promise<ImageAnalysisSuccess> => {
    const result: AnalyzeFromUrl200Response | AnalyzeFromUrlDefaultResponse =
        await client.path('/imageanalysis:analyze').post({
            body: {
                url: imageUrl,
            },
            queryParameters: {
                features,
            },
            contentType: 'application/json',
        })

    if (isUnexpected(result)) {
        throw result.body.error
    }

    console.log('🚀 ~ result:')
    console.log(result.body)

    let brand = ''
    let objectIdentified = ''
    const tags: string[] = []
    let category = ''
    let subCategory = ''
    let state = ''

    if (result.body.captionResult?.text.includes('broken')) {
        state = StateSchema.Enum.TO_REPAIR
    }

    console.log(`Model Version: ${result.body.modelVersion}`)

    console.log(`Image Metadata: ${JSON.stringify(result.body.metadata)}`)

    // Identify the object name
    if (
        result.body.objectsResult &&
        result.body.objectsResult.values.length > 0
    ) {
        const objects = result.body.objectsResult.values
        let highestConfidenceObject = undefined

        console.log('🚀 ~ objects:')
        console.log(objects)

        for (const object of objects) {
            highestConfidenceObject =
                highestConfidenceObject &&
                object.tags[0].confidence >
                    highestConfidenceObject.tags[0].confidence
                    ? object
                    : object
        }

        objectIdentified = highestConfidenceObject.tags[0].name
    }

    // Read the text from the image - and extract the brand name
    if (result.body.readResult && result.body.readResult.blocks.length > 0) {
        brand = result.body.readResult.blocks[0].lines[0].text
        brand = brand.charAt(0).toUpperCase() + brand.slice(1)
    }

    if (result.body.tagsResult) {
        console.log('🚀 ~ result.body.tagsResult:')
        console.log(result.body.tagsResult.values)
        for (
            let index = 0;
            index <= 3 && index < result.body.tagsResult.values.length;
            index++
        ) {
            tags.push(result.body.tagsResult.values[index].name)
        }
    }

    // Identify the category and subCategory
    for (const tag of tags) {
        // Find the category
        const categoryFound = categoriesList.find(
            (cat) =>
                cat.includes(tag.toUpperCase()) ||
                tag.toUpperCase().includes(cat),
        )

        if (categoryFound) {
            category = categoryFound
        }
    }

    // Identify the subCategory
    if (category) {
        for (const tag of tags) {
            const subCategories = Object.entries(
                products.categories[category].subcategories,
            )

            const subCategoryFound = subCategories.find(
                ([key, value]) =>
                    key.includes(tag.toUpperCase()) ||
                    tag.toUpperCase().includes(key) ||
                    value.toUpperCase().includes(tag.toUpperCase()) ||
                    tag.toUpperCase().includes(value.toUpperCase()),
            )

            if (subCategoryFound)
                subCategory = subCategoryFound[0].replaceAll(' ', '_')
        }
    }

    const objectData = {
        brand,
        objectIdentified,
        tags,
        category,
        subCategory,
        state,
    }

    return {
        message: 'Image analyzed successfully.',
        content: objectData,
    }
}

/**
 * POST endpoint for storing and analyzing an image.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} A response object with the analysis result or an error message.
 */
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

    console.log('✅ Cloudinary')

    // STEP#2 : Analyze the image with Azure Cognitive Services

    const azureEndpoint: string = environment.AZURE_COGNITIVE_SERVICES_ENDPOINT
    const azureKey: string = environment.AZURE_COGNITIVE_SERVICES_KEY
    const azureCredential = new AzureKeyCredential(azureKey)

    const azureClient: ImageAnalysisClient = createImageAnalysisClient(
        azureEndpoint,
        azureCredential,
    )

    const azureFeatures: string[] = [
        'Objects',
        'Read',
        'Tags',
        'Caption',
        'DenseCaptions',
    ]

    const azureAnalysis = await analyzeImageFromUrl(
        azureClient,
        imageData.secure_url,
        azureFeatures,
    )

    return NextResponse.json(azureAnalysis)

    // STEP#3 : Send the data to Dataiku (To do on an other ticket)
}
