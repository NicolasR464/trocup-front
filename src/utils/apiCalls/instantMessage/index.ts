import axios from 'axios'
import { apiEndpoints } from '@/utils/constants/endpoints'
import type { InstantMessage } from '@/types/instantMessage'
import type { AxiosResponse } from 'axios'
import { instantMsgInstance } from '@/utils/axiosInstances/instantMessage'

const getHeaders = (token: string) => ({
    Authorization: `Bearer ${token}`,
})

// 1. Fonction pour récupérer tous les messages
export const getInstantMsgs = async (
    token: string,
): Promise<InstantMessage[]> => {
    const headers = getHeaders(token)
    const response: AxiosResponse<InstantMessage[]> =
        await instantMsgInstance.get(apiEndpoints.INSTANT_MESSAGES, { headers },)
    if (response.status !== 200) {
        throw new Error(`Failed to fetch ${apiEndpoints.INSTANT_MESSAGES}`)
    }
    return response.data
}

// 2. Fonction pour créer un message
export const sendMessage = async (
    roomID: string,
    sender: string,
    receiver: string,
    message: string,
    sentAt: Date,
    token: string,
): Promise<InstantMessage> => {
    const headers = getHeaders(token)
    const messageData = { roomID, sender, receiver, message, sentAt }
    const response: AxiosResponse<InstantMessage> =
        await instantMsgInstance.post(
            apiEndpoints.INSTANT_MESSAGES,
            messageData,
            { headers },
        )
    if (response.status !== 201) {
        throw new Error('Erreur lors de la création du message')
    }
    return response.data
}
// 3. Fonction pour récupérer un message spécifique par ID
export const getInstantMsgById = async (
    msgId: string,
    token: string,
): Promise<InstantMessage> => {
    const headers = await getHeaders(token)
    const response: AxiosResponse<InstantMessage> =
        await instantMsgInstance.get(
            `${apiEndpoints.INSTANT_MESSAGES}${msgId}`,
            { headers },
        )
    if (response.status !== 200) {
        throw new Error(`Failed to fetch message with ID ${msgId}`)
    }
    return response.data
}

// 4. Fonction pour récupérer les messages d’une room spécifique
export const getMessagesByRoomID = async (
    roomID: string,
    token: string,
): Promise<InstantMessage[]> => {
    const headers = await getHeaders(token)
    const response: AxiosResponse<InstantMessage[]> =
        await instantMsgInstance.get(
            `${apiEndpoints.INSTANT_MESSAGES}rooms/${roomID}`,
            { headers },
        )
    if (response.status !== 200) {
        throw new Error(`Failed to fetch messages for roomID ${roomID}`)
    }
    return response.data
}

// 5. Fonction pour supprimer un message par ID
export const deleteMessageById = async (
    msgId: string,
    token: string,
): Promise<void> => {
    const headers = await getHeaders(token)
    const response = await instantMsgInstance.delete(
        `${apiEndpoints.INSTANT_MESSAGES}/${msgId}`,
        { headers },
    )
    if (response.status !== 200) {
        throw new Error(`Failed to delete message with ID ${msgId}`)
    }
}

export async function fetchRoomsForUser(token: string, userId: string) {
    const allMessages = await getInstantMsgs(token)

    // Filtrer les messages pour obtenir les rooms uniques où l'utilisateur est impliqué
    const userRoomsMap: Record<string, any> = {}

    allMessages.forEach((message) => {
        if (message.sender === userId || message.receiver === userId) {
            if (!userRoomsMap[message.roomID]) {
                userRoomsMap[message.roomID] = {
                    id: message.roomID,
                    name: `Room ${message.roomID}`,
                    lastMessage: message.message,
                    lastUpdated: message.sentAt,
                }
            } else if (new Date(message.sentAt) > new Date(userRoomsMap[message.roomID].lastUpdated)) {
                userRoomsMap[message.roomID].lastMessage = message.message
                userRoomsMap[message.roomID].lastUpdated = message.sentAt
            }
        }
    })
}