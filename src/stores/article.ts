import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { ImageAnalysis } from '@/utils/apiCalls/local'

import type { Article } from '@/types/article'

type ArticleStore = {
    analysedImage: ImageAnalysis
    article: Partial<Article>
    openConfirmDialog: boolean
    setAnalyzedImage: (analysedImage: ImageAnalysis) => void
    setArticle: (article: Partial<Article>) => void
    setOpenConfirmDialog: (open: boolean) => void
}

/**
 * This store is used to manage article data, including the analysed image data and article details.
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
        openConfirmDialog: false,

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

        setOpenConfirmDialog: (open: boolean): void => {
            set((state) => {
                state.openConfirmDialog = open
            })
        },
    })),
)
