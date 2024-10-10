/** The limit of documents we want to get per fetch for the infinite scrolls */
export const paginationLimit = 20

/** The list of React Query keys  */
export const rqKeys = {
    USERS: 'users',
}

/** Object containing page paths used throughout the application, set in alphabetical order */
export const pagePaths = {
    /** Path to the sign-in/ sign-up page */
    AUTH: {
        SIGN_IN: 'auth/sign-in/',
        SIGN_UP: 'auth/sign-up/',
    },
    /** Home page path */
    HOME: '/',
    /** Path to the onboarding page */
    ONBOARDING: '/onboarding/',
}

/** Object containing notifications to the user for various cases, set in alphabetical order */
export const userMessages = {
    onboardingError:
        'Erreur de sauvegarde de tes informations. Réessaye plus tard.',
    onboardingSuccess: 'Tes informations ont été sauvegardées',
}

/**
 * Object containing translations
 */
export const translations = {
    product: {
        categories: {
            CLOTHING: 'Vêtements',
            SHOES: 'Chaussures',
            ACCESSORIES_LUGGAGE: 'Accessoires et bagages',
            WATCHES_JEWELRY: 'Montres et bijoux',
            BABY_CLOTHING: 'Vêtements de bébé',
            GAMES_TOYS: 'Jeux et jouets',
            FURNITURE: 'Meubles',
            APPLIANCES: 'Appareils électroménagers',
            DECORATION: 'Décoration',
            ELECTRONICS: 'Électronique',
            BICYCLES: 'Vélos',
            BOOKS: 'Livres',
            OTHER: 'Autre',
        },
        states: {
            NEW: 'Neuf',
            LIKE_NEW: 'Comme neuf',
            VERY_GOOD_CONDITION: 'Très bonne condition',
            GOOD_CONDITION: 'Bonne condition',
            FAIR_CONDITION: 'Condition moyenne',
            TO_REPAIR: 'À réparer',
        },
        status: {
            AVAILABLE: 'Disponible',
            UNAVAILABLE: 'Indisponible',
            RESERVED: 'Réservé',
        },
        delivery: {
            PICKUP: 'En main propre',
            SHIPPING: 'À l’envoi',
            BOTH: 'En main propre ou à l’envoi',
        },
    },
}
