import { z } from 'zod'

import type { CategoryEnumSchema, SubcategoryEnumSchema } from './categories'

import {
    categoriesList,
    subcategoriesList,
} from '@/utils/constants/productValues'

/**
 * @description Schema for dimensions
 * @exports DimensionsSchema
 */
export const DimensionsSchema = z.object({
    length: z.number(),
    width: z.number(),
    height: z.number(),
    weight: z.number(),
})

/**
 * @description Schema for state enum
 * @exports StateSchema
 */
export const StateSchema = z.enum([
    'NEW',
    'LIKE_NEW',
    'VERY_GOOD_CONDITION',
    'GOOD_CONDITION',
    'FAIR_CONDITION',
    'TO_REPAIR',
])

/**
 * @description Schema defining the availability of the article
 * @exports StatusSchema
 */
export const StatusSchema = z.enum(['AVAILABLE', 'UNAVAILABLE', 'RESERVED'])

/**
 * @description Schema for delivery type enum
 * @exports DeliveryTypeSchema
 */
export const DeliveryTypeSchema = z.enum(['SHIPPING', 'PICKUP', 'BOTH'])

/**
 * @description Schema for article
 * @exports ArticleSchema
 */
export const ArticleSchema = z.object({
    _id: z.string(),
    version: z.number().int(),
    owner: z.string(),
    adTitle: z.string(),
    brand: z.string().optional(),
    model: z.string().optional(),
    description: z.string(),
    size: z.string().optional(),
    price: z.number().positive(),
    manufactureDate: z.date().optional(),
    purchaseDate: z.date().optional(),
    state: StateSchema,
    status: StatusSchema,
    imageUrls: z.array(z.string().url()),
    createdAt: z.date(),
    lastModified: z.date(),
    category: z.enum([...categoriesList] as [string, ...string[]]),
    subCategory: z.enum([...subcategoriesList] as [string, ...string[]]),
    deliveryType: DeliveryTypeSchema,
    dimensions: DimensionsSchema.optional(),
})

// Type inference
export type CategoryEnum = z.infer<typeof CategoryEnumSchema>
export type SubcategoryEnum = z.infer<typeof SubcategoryEnumSchema>
export type Dimensions = z.infer<typeof DimensionsSchema>
export type State = z.infer<typeof StateSchema>
export type Status = z.infer<typeof StatusSchema>
export type DeliveryType = z.infer<typeof DeliveryTypeSchema>
export type Article = z.infer<typeof ArticleSchema>
