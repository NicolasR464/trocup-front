import type {
    ImageAnalysis,
    ImageAnalysisResponse,
    ProductAnalysisResponse,
} from './index'

import type { Article } from '@/types/article'

import { analyzeImage, analyzeProductData } from '.'
import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

type UploadImageParams = {
    file: File
}

export type ProductDataParams = {
    formData: Partial<Article> & {
        analysedImageData?: Partial<ImageAnalysis>
    }
}

/**
 * Custom hook for storing and analyzing the content of an image using React Query's useMutation.
 * @returns {UseMutationResult} A mutation result object for storing and analyzing an image with Cloudinary and Azure Cognitive Services.
 */
export const useImageAnalysis = (): UseMutationResult<
    ImageAnalysisResponse,
    Error,
    UploadImageParams
> => {
    return useMutation<ImageAnalysisResponse, Error, UploadImageParams>({
        mutationFn: ({ file }) => analyzeImage(file),
    })
}

/**
 * Custom hook for analyzing the content of the product using React Query's useMutation.
 * @returns {UseMutationResult} A mutation result object for sending back the product analysis and value.
 */
export const useProductDataAnalysis = (): UseMutationResult<
    ProductAnalysisResponse,
    Error,
    ProductDataParams
> => {
    return useMutation<ProductAnalysisResponse, Error, ProductDataParams>({
        mutationFn: (formData) => analyzeProductData(formData),
    })
}
