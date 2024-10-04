import type { ImageAnalysisResponse } from './index'

import { analyzeImage } from '.'
import type { UseMutationResult } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

type UploadImageParams = {
    file: File
}

/**
 * Custom hook for creating a user using React Query's useMutation.
 *
 * This hook encapsulates the logic for creating a user, leveraging React Query's
 * powerful state management and caching capabilities. It returns a mutation
 * result object that includes functions to trigger the mutation and access
 * its state (loading, error, data).
 * @returns {UseMutationResult} A mutation result object for uploading an image and analyzing it with Azure Cognitive Services, which includes methods like mutate, mutateAsync, and properties like isLoading, isError, and data.
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
