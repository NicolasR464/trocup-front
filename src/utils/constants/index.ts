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
