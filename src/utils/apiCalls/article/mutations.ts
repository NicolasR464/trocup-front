import { createArticle } from '@/utils/apiCalls/article'

import type { Article } from '@/types/article'

import { useMutation, type UseMutationResult } from '@tanstack/react-query'

type CreateArticleParams = {
    article: Partial<Article>
    JWT: string
}

export const useCreateArticle = (): UseMutationResult<
    Partial<Article>,
    Error,
    CreateArticleParams
> => {
    return useMutation<Partial<Article>, Error, CreateArticleParams>({
        mutationFn: ({ article, JWT }) => createArticle(article, JWT),
    })
}
