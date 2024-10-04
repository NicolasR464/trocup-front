import { environment } from '@/types/environment'

import { createInstance } from '.'

/**
 * Creates an Axios instance for instant message-related API requests.
 * @returns {AxiosInstance} - The created Axios instance.
 */
export const localInstance = createInstance(
    typeof window === 'undefined'
        ? environment.LOCAL_API_URL
        : environment.NEXT_PUBLIC_LOCAL_API_URL,
)
