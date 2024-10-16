import { z } from 'zod'

import { AddressSuggestionSchema } from '@/types/address/gouvApiCall'
import { Address, AddressSchema } from '@/types/address/userAddress'
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
    status: true,
}).extend({
    adTitle: z
        .string({
            required_error: 'Le titre est requis.',
        })
        .min(1, 'Le titre est requis.'),
    category: z.string({
        required_error: 'La catégorie est requise.',
    }),
    subCategory: z.string({
        required_error: 'La sous-catégorie est requise.',
    }),
    deliveryType: z.string({
        required_error: 'Le type de livraison est requis.',
    }),
    state: z.string({
        required_error: 'L’état de l’objet est requis.',
    }),
    description: z
        .string({
            required_error: 'La description est requise.',
        })
        .min(10, 'La description doit contenir au moins 10 caractères.'),
    /**
     * @description The label of the address chosen by the user from the list of saved addresses
     */
    savedUserAddressLabel: z.string().optional(),
    /**
     * @description User input to add a new address
     */
    addressInput: z.string().optional(),
    /**
     * @description The full address object chosen by the user
     */
    newAddressObject: AddressSchema,
    registeredAddressObject: AddressSchema,
    /**
     * @description The list of addresses suggested by the API
     */
    addressSuggestions: z.array(AddressSuggestionSchema).optional(),
})

export type ArticleFormData = z.infer<typeof ArticleFormDataSchema>

export const addressObjectEmpty: Address = {
    label: '',
    street: '',
    city: '',
    postcode: '',
    citycode: '',
    geopoints: { type: '', coordinates: [] },
}
