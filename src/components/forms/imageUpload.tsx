/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-console */
'use client'

import { useState } from 'react'
import type { DragTypes } from 'react-aria-components'
import { DropZone } from 'react-aria-components'
import type { DropEvent } from 'react-dropzone'

import { publicImgUpload } from '@/utils/apiCalls/thirdPartyApis/cloudinary'
import Image from 'next/image'

const ImageUpload = (): React.JSX.Element => {
    const [dropped, setDropped] = useState(false)
    const [image, setImage] = useState<string>('')
    const [isDragging, setIsDragging] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <div className='flex h-full w-full items-center justify-center'>
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
                className={`flex h-full max-h-[1000px] min-h-[300px] w-2/3 min-w-[200px] items-center justify-center rounded-lg border-4 border-dashed border-gray-300 transition-colors duration-300 ${isDragging ? 'bg-green-200' : ''}`}
                onDropEnter={() => {
                    setIsDragging(true)
                }}
                onDropExit={() => {
                    setIsDragging(false)
                }}
                onDrop={async (event) => {
                    setIsDragging(false)

                    console.log(event)

                    const imageFile = async (data) => {
                        console.log({ data })

                        const file = (await data.items[0].getFile()) as File
                        return file
                    }

                    const imageResult = await imageFile(event)

                    console.log(imageResult)

                    if (imageResult) {
                        publicImgUpload(imageResult)
                            .then((response) => {
                                console.log(
                                    'Image uploaded successfully:',
                                    response,
                                )
                                setImage(response.secure_url)
                            })
                            .catch((error) => {
                                console.error('Error uploading image:', error)
                            })
                    }

                    setDropped(true)
                }}
            >
                <div>{!dropped && 'Drop image here'}</div>

                {!!image && (
                    <Image
                        className='h-full w-full rounded-lg'
                        src={image}
                        alt='Uploaded image'
                        width={1_000}
                        height={1_000}
                        priority
                        onLoad={() => {
                            setImageLoaded(true)
                        }}
                    />
                )}
            </DropZone>
        </div>
    )
}

export default ImageUpload
