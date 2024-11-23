import { Toaster } from 'react-hot-toast'
import type { Metadata } from 'next'
import {
    Carrois_Gothic_SC,
    Quattrocento_Sans,
    Questrial,
} from 'next/font/google'

import Footer from '@/components/designSystem/footer'
import NavbarWrapper from '@/components/designSystem/NavbarWrapper'

import { pagePaths } from '@/utils/constants'
import ReactQueryProvider from '@/utils/providers/ReactQuery'
import UserStoreProvider from '@/utils/providers/UserStoreProvider'

import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const carroisGothic = Carrois_Gothic_SC({
    weight: '400',
    subsets: ['latin'],
})
const quattrocentoSans = Quattrocento_Sans({
    weight: ['400'],
    subsets: ['latin'],
})
const questrial = Questrial({
    weight: '400',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'TrocUp',
    description: 'Le troc 2.0',
    icons: {
        icon: '/trocup_icon.ico',
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://trocup.fr',
        siteName: 'TrocUp',
    },
    other: {
        custom: ['utf8'],
    },
}

const Layout = ({
    children,
}: {
    children: React.ReactNode
}): React.JSX.Element => (
    <ClerkProvider
        signUpFallbackRedirectUrl={pagePaths.ONBOARDING}
        afterSignOutUrl={pagePaths.HOME}
    >
        <html lang="en">
            <body
                className={`${carroisGothic.className} ${quattrocentoSans.className} ${questrial.className}`}
            >
                <ReactQueryProvider>
                    <header>
                        {/* Utilisation du composant Client pour la Navbar */}
                        <NavbarWrapper />
                    </header>
                    <div className="flex min-h-screen flex-col">
                        <main className="flex-grow">
                            <UserStoreProvider />
                            <Toaster />
                            {children}
                        </main>
                        <Footer />
                    </div>
                </ReactQueryProvider>
            </body>
        </html>
    </ClerkProvider>
)

export default Layout
