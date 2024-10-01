import ImageUpload from '@/components/forms/imageUpload'

const newArticle = (): React.JSX.Element => {
    return (
        <>
            <h1>{'New Article'}</h1>
            <ImageUpload />
        </>
    )
}

export default newArticle
