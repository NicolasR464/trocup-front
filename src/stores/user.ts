import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { User } from '@/types/user'

type UserStore = {
    user: User
    setUserData: (userData: Partial<User>) => void
}

/**
 * This store is used to manage user data, including pseudo, avatarUrl, isPremium status, and address.
 * It provides a method to update the user data partially.
 */
export const useUserStore = create<UserStore>()(
    persist(
        immer((set) => ({
            user: {
                id: '',
                version: 0,
                pseudo: '',
                name: '',
                surname: '',
                email: '',
                phoneNumber: undefined,
                activityStatus: '',
                birthDate: new Date(),
                avatarUrl: undefined,
                isPremium: false,
                credit: undefined,
                articles: undefined,
                debit: undefined,
            },

            setUserData: (userData: Partial<User>): void => {
                set((state) => {
                    state.user = { ...state.user, ...userData }
                })
            },

            deleteStoredUserData: (): void => {
                set((state) => {
                    state.user = {} as User
                })
            },
        })),
        {
            name: 'user-store',
        },
    ),
)
