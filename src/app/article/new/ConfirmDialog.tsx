'use client'

import { Button } from '@/components/shadcn/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/shadcn/ui/dialog'

import { useArticleStore } from '@/stores/article'
import Link from 'next/link'

const ConfirmDialog = (): React.JSX.Element => {
    const { article, openConfirmDialog } = useArticleStore((state) => ({
        article: state.article,
        openConfirmDialog: state.openConfirmDialog,
    }))

    console.log('🔥 article in ConfirmDialog', article)

    return (
        <Dialog open={openConfirmDialog}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle className='text-center'>
                        {'Le produit est estimé à'}
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
                    <Button>{'Je valide'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmDialog
