import toast from 'react-hot-toast'

import { NotificationType } from '@/types'
import { environment } from '@/types/environment'

import type { AxiosInstance } from 'axios'
import {
    adjectives,
    animals,
    colors,
    uniqueNamesGenerator,
} from 'unique-names-generator'

export const wait = async (mlseconds: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, mlseconds)
    })
}

/**
 * Generates a random avatar URL using the MultiAvatar API.
 *
 * This function creates a random number between 0 and 99, then uses it to generate
 * a unique avatar URL. The URL includes the API key stored in the environment variables.
 * @returns {string} A URL string pointing to a randomly generated avatar image.
 * @example
 * const avatarUrl = getRandomAvatarUrl();
 * // Returns something like: "https://api.multiavatar.com/42.png?apikey=YOUR_API_KEY"
 * @see https://api.multiavatar.com/ for more information about the MultiAvatar API.
 */
export const getRandomAvatarUrl = (): string => {
    const randomNumber = Math.floor(Math.random() * 100)

    return `https://api.multiavatar.com/${randomNumber}.png?apikey=${environment.NEXT_PUBLIC_MULTIAVATAR_API_KEY}`
}

/**
 * Generates a random user pseudonym using the unique-names-generator library.
 *
 * This function combines adjectives, animals, and colors to create a unique and humorous name.
 * @returns {string} A randomly generated user pseudonym.
 * @example
 * const pseudonym = getRandomUserPseudonym();
 * Returns something like: "Fierce-Tiger-Lime"
 * @see https://github.com/DylanVann/unique-names-generator for more information about the unique-names-generator library.
 */
export const getRandomUserPseudonym = (): string => {
    const randomPseudo = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors],
        separator: ' ',
        length: 3,
        style: 'capital',
    })

    return randomPseudo
}
/**
 * Adds an Authorization header with a JWT token to the specified axios instance.
 *
 * This function sets the Authorization header of the provided axios instance
 * to include the given JWT token. This is typically used to authenticate
 * API requests.
 * @param {AxiosInstance} axiosInstance - The axios instance to which the Authorization header will be added.
 * @param {string} JWT - The JSON Web Token to be included in the Authorization header.
 * @returns {void}
 * @example
 * const jwtToken = 'your.jwt.token';
 * addAuthHeader(axiosInstance, jwtToken);
 * // Now all subsequent requests using the provided axiosInstance will include the Authorization header
 */
export const addAuthHeader = (
    axiosInstance: AxiosInstance,
    JWT: string,
): void => {
    axiosInstance.defaults.headers.Authorization = `Bearer ${JWT}`
}

export const notify = ({
    message,
    type,
}: {
    message: string
    type: NotificationType
}): void => {
    switch (type) {
        case NotificationType.enum.SUCCESS: {
            toast.success(message)
            break
        }
        case NotificationType.enum.ERROR: {
            toast.error(message)
            break
        }
        default: {
            toast(message)
            break
        }
    }
}
