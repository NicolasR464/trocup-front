import { localInstance } from '@/utils/axiosInstances/local'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type { AxiosResponse } from 'axios'
import { ProductDataParams } from './mutations'

export type ImageAnalysis = {
    brand: string
    tags: string[]
    objectIdentified: string
    category: string
    subCategory: string
    state: string
}

/**
 * Error type for both image analysis and product analysis
 */
export type AnalysisError = {
    error: string
}

export type ImageAnalysisSuccess = {
    message: string
    content: ImageAnalysis
}

export type ImageAnalysisResponse = ImageAnalysisSuccess | AnalysisError

export type ProductAnalysisResponse = {
    productName: string
    productEstimation: number
}

// export type ProductAnalysisSuccess = {
//     message: string
//     content: ProductAnalysis
// }

// export type ProductAnalysisResponse = ProductAnalysisSuccess | AnalysisError

/**
 * Store and analyze an image by sending it to the local instance.
 * @param {File} file - The image file to be analyzed.
 * @returns {Promise<AnalysisResponse>} A promise that resolves to the analysis response.
 * @throws {Error} If the image analysis fails.
 */
export const analyzeImage = async (
    file: File,
): Promise<ImageAnalysisResponse> => {
    const response: AxiosResponse<ImageAnalysisResponse> =
        await localInstance.postForm(apiEndpoints.IMAGE_ANALYSIS, { file })

    if (response.status !== 200)
        throw new Error(`Failed to fetch ${apiEndpoints.IMAGE_ANALYSIS}`)

    return response.data
}

/**
 * Analyze an the form content for the product data by sending it to the local instance.
 * @param {FormData} formData - The form data to be analyzed.
 * @returns {Promise<ImageAnalysisResponse>} A promise that resolves to the analysis response.
 * @throws {Error} If the image analysis fails.
 */
export const analyzeProductData = async (
    formData: ProductDataParams,
): Promise<ProductAnalysisResponse> => {
    const response: AxiosResponse<ProductAnalysisResponse> =
        await localInstance.postForm(apiEndpoints.PRODUCT_ANALYSIS, {
            formData,
        })

    if (response.status !== 200)
        throw new Error(`Failed to fetch ${apiEndpoints.PRODUCT_ANALYSIS}`)

    return response.data
}
