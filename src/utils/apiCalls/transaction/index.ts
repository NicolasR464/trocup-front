import type { TransactionParams } from './mutations'

import { transactionInstance } from '@/utils/axiosInstances/transaction'
import { apiEndpoints } from '@/utils/constants/endpoints'
import { addAuthHeader } from '@/utils/functions'

import type { Transaction } from '@/types/transaction'

import type { AxiosResponse } from 'axios'

export const getTransactions = async (): Promise<Transaction[]> => {
    const response: AxiosResponse<Transaction[]> =
        await transactionInstance.get(
            apiEndpoints.microServices.private.TRANSACTIONS,
        )

    if (response.status !== 200)
        throw new Error(
            `Failed to fetch ${apiEndpoints.microServices.private.TRANSACTIONS}`,
        )

    return response.data
}

/**
 * Function to create a new transaction.
 * @param {TransactionParams} data - The transaction data to create.
 * @param {string} JWT - The JSON Web Token for authentication.
 * @returns {Promise<TransactionResponse>} The created transaction.
 */
export const createTransaction = async (
    data: TransactionParams['data'],
    JWT: TransactionParams['JWT'],
): Promise<Transaction> => {
    addAuthHeader(transactionInstance, JWT)

    // eslint-disable-next-line no-console
    console.log('data', data)

    const response: AxiosResponse<Transaction> = await transactionInstance.post(
        apiEndpoints.microServices.private.TRANSACTIONS,
        data,
    )

    if (response.status !== 201)
        throw new Error(
            `Failed to fetch ${apiEndpoints.microServices.private.TRANSACTIONS}`,
        )

    return response.data
}

/**
 * Fetch all transactions for a specific user.
 * @param {string} userId - The ID of the user whose transactions are to be fetched.
 * @param {string} JWT - The JWT token for authentication.
 * @returns {Promise<Transaction[]>} A list of transactions for the user.
 * @throws {Error} If the user cannot be found or their transactions cannot be retrieved.
 */
export const getTransactionsByUser = async (
    userId: string,
    JWT: string,
): Promise<Transaction[]> => {
    if (!JWT) throw new Error('No JWT provided')

    addAuthHeader(transactionInstance, JWT)

    const response: AxiosResponse<Transaction[]> =
        await transactionInstance.get(
            `${apiEndpoints.microServices.private.TRANSACTIONS}users/${userId}`,
        )

    if (response.status !== 200)
        throw new Error(
            `Failed to fetch transactions for user ${String(userId)}`,
        )

    return response.data
}
