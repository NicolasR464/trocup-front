import type { AxiosInstance } from 'axios'
import axios from 'axios'

/**
 * Creates an Axios instance with the specified base URL.
 * @param {string} baseURL - The base URL for the Axios instance.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const createInstance = (baseURL: string): AxiosInstance => {
    const instance = axios.create({
        baseURL,
        timeout: 40_000,
    })
    return instance
}
