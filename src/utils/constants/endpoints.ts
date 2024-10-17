import { environment } from '@/types/environment'

export const apiEndpoints = {
    // Micro services
    USERS: 'api/users/',
    ARTICLES: 'api/articles/',
    TRANSACTIONS: 'api/transactions/',
    /** @TODO Update the endpoint below  */
    INSTANT_MESSAGES: 'instantmsgs/',

    // Local API endpoints
    IMAGE_ANALYSIS: 'image-analysis/',
    PRODUCT_ANALYSIS: 'product-analysis/',

    // Third party APIs
    API_GOUV: 'https://api-adresse.data.gouv.fr/search/',
    USER_AVATAR: 'https://api.multiavatar.com/',
    CLOUDINARY: `https://api.cloudinary.com/v1_1/${environment.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
}
