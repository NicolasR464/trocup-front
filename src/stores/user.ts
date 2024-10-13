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
                address: [],
                geopoints: {
                    type: '',
                    coordinates: [],
                },
                email: '',
                password: '',
                sexe: 'autre',
                phoneNumber: undefined,
                activityStatus: '',
                birthDate: new Date(),
                bankInfo: undefined,
                avatarUrl: undefined,
                isPremium: false,
                favoriteArticles: undefined,
                credit: undefined,
                comments: undefined,
                articles: undefined,
                debit: undefined,
            },

            setUserData: (userData: Partial<User>): void => {
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
