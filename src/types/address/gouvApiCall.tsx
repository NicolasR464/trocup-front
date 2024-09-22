import { z } from 'zod'

import { AddressSchema, GeopointsSchema } from './userAddress'

/**
 * @description Schema for the API Gouv Feature object
 * @exports ApiGouvFeatureSchema
 */
export const ApiGouvFeatureSchema = z.object({
    type: z.string(),
    geometry: GeopointsSchema,
    properties: z.object({
        label: z.string(),
        score: z.number(),
        housenumber: z.string(),
        id: z.string(),
        type: z.string(),
        name: z.string(),
        street: z.string(),
        city: z.string(),
        postcode: z.string(),
        citycode: z.string(),
        x: z.number(),
        y: z.number(),
    }),
})

/**
 * @description Schema for the API Gouv Response object
 * @exports ApiGouvResponseSchema
 */
export const ApiGouvResponseSchema = z.object({
    type: z.string(),
    version: z.string(),
    features: z.array(z.lazy(() => ApiGouvFeatureSchema)),
    attribution: z.string(),
    licence: z.string(),
    query: z.string(),
    limit: z.number(),
})

/**
 * @description Schema for the Address Suggestion object
 * @exports AddressSuggestionSchema
 */
export const AddressSuggestionSchema = z.object({
    label: z.string(),
    properties: AddressSchema,
})

// Type inference
export type ApiGouvResponse = z.infer<typeof ApiGouvResponseSchema>
export type ApiGouvFeature = z.infer<typeof ApiGouvFeatureSchema>
export type AddressSuggestion = z.infer<typeof AddressSuggestionSchema>