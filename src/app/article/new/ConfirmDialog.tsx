'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/shadcn/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/shadcn/ui/dialog'

import { useArticleStore } from '@/stores/article'
import { useCreateArticle } from '@/utils/apiCalls/article/mutations'

import { useAuth } from '@clerk/nextjs'

const ConfirmDialog = (): React.JSX.Element => {
    const { getToken } = useAuth()

    const router = useRouter()

    const { article, openConfirmDialog } = useArticleStore((state) => ({
        article: state.article,
        openConfirmDialog: state.openConfirmDialog,
    }))

    console.log('🔥 article in ConfirmDialog', article)

    const { mutateAsync: createArticle, isPending: isCreatingArticle } =
        useCreateArticle()

    const handleCreateArticle = async (): Promise<void> => {
        console.log('🚀 handleCreateArticle')

        const JWT = await getToken({ template: 'trocup-1' })
        if (!JWT) {
            router.push('/?error=not-logged-in')
            return
        }

        await createArticle(
            { article, JWT },
            {
                onSuccess: () => {
                    console.log('🔥 article created')
                },
                onError: (error) => {
                    console.error('❌ createArticle error', error)
                },
            },
        )
    }

    return (
        <Dialog open={openConfirmDialog}>
            {'price' in article && (
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle className='text-center'>
                            {'L’article est estimé à'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className='grid gap-4 border-b py-4 text-center text-2xl font-bold'>
                        {`${article.price} €`}
                    </div>
                    <div className='text-center'>
                        <span>{` En cliquant sur ‘Je valide’, tu accepteras nos `}</span>
                        <Link
                            className='underline'
                            href='/terms-and-conditions'
                        >
                            {'conditions d’utilisation'}
                        </Link>
                    </div>

                    <DialogFooter className='flex w-full items-center sm:justify-around'>
                        <Link
                            className='text-red-500 underline'
                            href='/'
                        >
                            {'Je refuse'}
                        </Link>
                        <Button
                            disabled={isCreatingArticle}
                            onClick={() => {
                                handleCreateArticle()
                            }}
                        >
                            {'Je valide'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    )
}

export default ConfirmDialog
