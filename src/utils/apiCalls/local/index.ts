import { localInstance } from '@/utils/axiosInstances/local'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type { AxiosResponse } from 'axios'

export type ImageAnalysisSuccess = {
    message: string
    content: {
        brand: string
        tags: string[]
        objectIdentified: string
    }
}
export type ImageAnalysisError = {
    error: string
}

export type ImageAnalysisResponse = ImageAnalysisSuccess | ImageAnalysisError

export const analyzeImage = async (
    file: File,
): Promise<ImageAnalysisResponse> => {
    const response: AxiosResponse<ImageAnalysisResponse> =
        await localInstance.postForm(apiEndpoints.IMAGE_ANALYSIS, { file })

    if (response.status !== 200)
        throw new Error(`Failed to fetch ${apiEndpoints.IMAGE_ANALYSIS}`)

    return response.data
}
