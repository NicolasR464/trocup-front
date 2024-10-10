import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { Address } from '@/types/address/userAddress'

type UserData = {
    pseudo: string
    avatarUrl: string
    isPremium: boolean
    address?: Address
}

type UserStore = {
    user: UserData
    setUserData: (userData: Partial<UserData>) => void
}

/**
 * This store is used to manage user data, including pseudo, avatarUrl, isPremium status, and address.
 * It provides a method to update the user data partially.
 */
export const useUserStore = create<UserStore>()(
    persist(
        immer((set) => ({
            user: {
                pseudo: '',
                avatarUrl: '',
                isPremium: false,
                address: undefined,
            },

            setUserData: (userData: Partial<UserData>): void => {
                set((state) => {
                    state.user = { ...state.user, ...userData }
                })
            },
        })),
        {
            name: 'user-store',
        },
    ),
)
