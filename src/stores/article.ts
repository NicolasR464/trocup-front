import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { ImageAnalysis } from '@/utils/apiCalls/local'

import type { Article } from '@/types/article'

type ArticleStore = {
    analysedImage: ImageAnalysis
    article: Partial<Article>
    setAnalyzedImage: (analysedImage: ImageAnalysis) => void
    setArticle: (article: Partial<Article>) => void
}

/**
 * This store is used to manage article data, including analysedImage and article details.
 * It provides a method to update the analysed image data.
 */
export const useArticleStore = create<ArticleStore>()(
    immer((set) => ({
        analysedImage: {
            brand: '',
            tags: [],
            objectIdentified: '',
            category: '',
            subCategory: '',
            state: '',
        },
        article: {},

        setAnalyzedImage: (analysedImage: ImageAnalysis): void => {
            set((state) => {
                state.analysedImage = analysedImage
            })
        },

        setArticle: (article: Partial<Article>): void => {
            set((state) => {
                state.article = article
            })
        },
    })),
)
