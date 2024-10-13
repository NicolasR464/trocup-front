import { z } from 'zod'

import { AddressSuggestionSchema } from '@/types/address/gouvApiCall'
import { AddressSchema } from '@/types/address/userAddress'
import { ArticleSchema } from '@/types/article'

/**
 * @description Schema for article form data
 * @exports ArticleFormDataSchema
 */
export const ArticleFormDataSchema = ArticleSchema.pick({
    manufactureDate: true,
    brand: true,
    model: true,
    purchaseDate: true,
    dimensions: true,
    size: true,
    state: true,
    status: true,
    category: true,
    subCategory: true,
    deliveryType: true,
}).extend({
    adTitle: z.string().min(5, 'Le titre est requis'),
    description: z
        .string()
        .min(10, 'La description doit contenir au moins 10 caractères'),
    /**
     * @description The label of the address chosen by the user from the list of saved addresses
     */
    savedUserAddressLabel: z.string().optional(),
    /**
     * @description User input to add a new address
     */
    addressInput: z.string().optional(),
    /**
     * @description The full address chosen by the user
     */
    addressObject: AddressSchema.optional(),
    addressSuggestions: z.array(AddressSuggestionSchema).optional(),
})

export type ArticleFormData = z.infer<typeof ArticleFormDataSchema>
