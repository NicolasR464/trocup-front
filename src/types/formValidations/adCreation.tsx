import { z } from 'zod'

import { ArticleSchema } from '@/types/article'

/**
 * @description Schema for article form data
 * @exports ArticleFormDataSchema
 */
export const ArticleFormDataSchema = ArticleSchema.omit({
    _id: true,
    version: true,
    owner: true,
    imageUrls: true,
    createdAt: true,
    lastModified: true,
})
    .pick({
        manufactureDate: true,
        purchaseDate: true,
        price: true,
        dimensions: true,
        size: true,
        state: true,
        status: true,
        category: true,
        subCategory: true,
        deliveryType: true,
    })
    .extend({
        adTitle: z.string().min(5, 'Le titre est requis'),
        description: z
            .string()
            .min(10, 'La description doit contenir au moins 10 caractères'),
    })

export type ArticleFormData = z.infer<typeof ArticleFormDataSchema>
