import ArticleForm from '@/components/forms/adCreation'
import ImageProcessing from '@/components/forms/imageProcessing'

const newArticle = (): React.JSX.Element => {
    return (
        <>
            <h1>{'New Article'}</h1>
            <ImageProcessing />
            <ArticleForm />
        </>
    )
}

export default newArticle
