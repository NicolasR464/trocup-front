/** Display mock product data. */
'use client'
import { useParams } from 'next/navigation'

const Article = (): React.JSX.Element => {
    const { _id } = useParams()
    console.log('le search hereeeeee', _id)

    if (!_id) {
        console.log('koukou', _id)
        return <p>Sorry no article found</p>
    }
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <h1>{'Articlesssss'}</h1>
        </main>
    )
}

export default Article
