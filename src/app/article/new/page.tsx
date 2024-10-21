import ArticleForm from '@/components/forms/adCreation'
import ImageProcessing from '@/components/forms/imageProcessing'
import ConfirmDialog from './ConfirmDialog'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const newArticle = (): React.JSX.Element => {
    return (
        <>
            <h1>{'New Article'}</h1>
            <ImageProcessing />
            <ArticleForm />
            <ConfirmDialog />
        </>
    )
}

export default newArticle
