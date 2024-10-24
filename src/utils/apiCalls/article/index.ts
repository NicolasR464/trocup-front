import { articleInstance } from '@/utils/axiosInstances/article'
import { apiEndpoints } from '@/utils/constants/endpoints'
import { addAuthHeader } from '@/utils/functions'

import type { Article } from '@/types/article'

import type { AxiosResponse } from 'axios'

/**
 * Fetch all articles from the API.
 * @returns {Promise<Article[]>} An array of articles.
 */
export const getArticles = async (): Promise<Article[]> => {
    const response: AxiosResponse<Article[]> = await articleInstance.get(
        apiEndpoints.ARTICLES,
    )

    if (response.status !== 200)
        throw new Error(`Failed to fetch ${apiEndpoints.ARTICLES}`)

    return response.data
}
/**
 * Create a new article.
 * @param {Partial<Article>} article - The article to create.
 * @param {string} JWT - The JWT token for authentication.
 * @returns {Promise<Partial<Article>>} The created article.
 */
export const createArticle = async (
    article: Partial<Article>,
    JWT: string,
): Promise<Partial<Article>> => {
    if (!JWT) throw new Error('No JWT provided')
    console.log('🔥 JWT', JWT)

    addAuthHeader(articleInstance, JWT)

    const response: AxiosResponse<Partial<Article>> =
        await articleInstance.post(apiEndpoints.ARTICLES, article)

    if (response.status !== 201)
        throw new Error(`Failed to create ${apiEndpoints.ARTICLES}`)

    return response.data
}
