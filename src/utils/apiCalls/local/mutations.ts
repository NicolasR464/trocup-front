import type { AnalysisResponse } from './index'

import type { Article } from '@/types/article'

import { analyzeImage, analyzeProductData } from '.'
import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

type UploadImageParams = {
    file: File
}

type ProductDataParams = {
    formData: Partial<Article>
}

/**
 * Custom hook for storing and analyzing the content of an image using React Query's useMutation.
 * @returns {UseMutationResult} A mutation result object for storing and analyzing an image with Cloudinary and Azure Cognitive Services.
 */
export const useImageAnalysis = (): UseMutationResult<
    AnalysisResponse,
    Error,
    UploadImageParams
> => {
    return useMutation<AnalysisResponse, Error, UploadImageParams>({
        mutationFn: ({ file }) => analyzeImage(file),
    })
}

/**
 * Custom hook for storing and analyzing the content of an image using React Query's useMutation.
 * @returns {UseMutationResult} A mutation result object for storing and analyzing an image with Cloudinary and Azure Cognitive Services.
 */
export const useProductDataAnalysis = (): UseMutationResult<
    AnalysisResponse,
    Error,
    ProductDataParams
> => {
    return useMutation<AnalysisResponse, Error, ProductDataParams>({
        mutationFn: ({ formData }) => analyzeProductData(formData),
    })
}
