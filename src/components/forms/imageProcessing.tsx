/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client'

import { useState } from 'react'
import type { DragTypes, FileDropItem } from 'react-aria-components'
import { DropZone } from 'react-aria-components'
import Image from 'next/image'

import { useArticleStore } from '@/stores/article'
import { useImageAnalysis } from '@/utils/apiCalls/local/mutations'

import { Button } from '../shadcn/ui/button'

const getImageBlob = async (data: FileDropItem): Promise<File> => {
    const file = await data.getFile()
    return file
}

const ImageProcessing = (): React.JSX.Element => {
    const [image, setImage] = useState<string>('')
    const [isDragging, setIsDragging] = useState(false)

    const { mutateAsync, isPending } = useImageAnalysis()

    // This state is used to track if the image has been loaded
    const [imageLoaded, setImageLoaded] = useState(false)

    /**
     * Function called when the user selects an image. The will reach the image analysis API.
     * @param {File} file - The selected file to be uploaded.
     */
    const handleFileChange = async (file: File): Promise<void> => {
        const imageUrl = URL.createObjectURL(file)
        const { setAnalyzedImage } = useArticleStore.getState()

        setImage(imageUrl)

        await mutateAsync(
            { file },
            {
                onSuccess: (data) => {
                    if ('content' in data) {
                        setAnalyzedImage(data.content)
                    }
                },
            },
        )
    }

    return (
        <div className='flex w-full flex-col items-center justify-center'>
            <DropZone
                getDropOperation={(types: DragTypes) => {
                    if (
                        types.has('image/png') ||
                        types.has('image/jpeg') ||
                        types.has('image/jpg') ||
                        types.has('image/webp') ||
                        types.has('image/tiff')
                    )
                        return 'copy'

                    return 'cancel'
                }}
                className={`flex max-h-[1000px] min-h-[300px] w-2/3 min-w-[200px] flex-col items-center justify-center rounded-lg border-4 border-dashed border-gray-300 transition-colors duration-300 ${isDragging ? 'bg-green-200' : ''}`}
                onDropEnter={() => {
                    setIsDragging(true)
                }}
                onDropExit={() => {
                    setIsDragging(false)
                }}
                onDrop={(event) => {
                    getImageBlob(event.items[0] as FileDropItem).then(
                        (imageResult) => {
                            handleFileChange(imageResult)
                            setIsDragging(false)
                        },
                    )
                }}
            >
                {/** Image selection window */}
                {!imageLoaded && (
                    <Button
                        className='relative cursor-pointer'
                        onClick={() => {
                            // @ts-expect-error
                            document.querySelector('#fileInput')?.click()
                        }}
                    >
                        <input
                            id='fileInput'
                            accept='image/*'
                            type='file'
                            className='absolute left-0 top-0 h-full w-full opacity-0'
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleFileChange(file)
                            }}
                        />
                        <span className='relative z-10'>
                            {'➕ Ajoute une photo'}
                        </span>
                    </Button>
                )}

                {/** Uploaded image to display */}
                {!!image && (
                    <Image
                        className='h-full max-h-[300px] w-full max-w-[300px] rounded-lg'
                        src={image}
                        alt='Uploaded image'
                        width={300}
                        height={300}
                        priority
                        onLoad={() => {
                            setImageLoaded(true)
                        }}
                    />
                )}
            </DropZone>

            {!!isPending && <p>{'Analyse en cours…'}</p>}
        </div>
    )
}

export default ImageProcessing
