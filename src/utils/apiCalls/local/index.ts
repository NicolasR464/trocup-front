import { localInstance } from '@/utils/axiosInstances/local'
import { apiEndpoints } from '@/utils/constants/endpoints'

import type { AxiosResponse } from 'axios'

type ImageAnalysisSuccess = {
    message: string
    data: {
        public_id: string
        secure_url: string
    }
}
type ImageAnalysisError = {
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
