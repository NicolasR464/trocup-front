/* eslint-disable no-console */
'use client'

import { publicImgUpload } from '@/utils/apiCalls/thirdPartyApis/cloudinary'
import React, { useMemo } from 'react'
import type {
    DropEvent,
    DropzoneInputProps,
    DropzoneState,
    FileRejection,
} from 'react-dropzone'
import { useDropzone } from 'react-dropzone'

const baseClass =
    'flex flex-1 flex-col items-center p-5 border-2 border-dashed rounded border-gray-300 bg-gray-100 text-gray-500 outline-none transition duration-200 ease-in-out h-[200px]'
const focusedClass = 'border-blue-500'
const acceptClass = 'border-green-500'
const rejectClass = 'border-red-500'

const StyledDropzone = (props: DropzoneInputProps): React.JSX.Element => {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    }: DropzoneState = useDropzone({
        accept: { 'image/*': [] },
        onDrop: (
            acceptedFiles: File[],
            fileRejections: FileRejection[],
            event: DropEvent,
        ) => {
            const { onDrop } = props as {
                onDrop?: (
                    acceptedFiles: File[],
                    fileRejections: FileRejection[],
                    event: DropEvent,
                ) => void
            }
            if (onDrop) {
                onDrop(acceptedFiles, fileRejections, event)
            }
        },
    })

    const className = useMemo(() => {
        let classes = baseClass
        if (isFocused) classes += ` ${focusedClass}`
        if (isDragAccept) classes += ` ${acceptClass}`
        if (isDragReject) classes += ` ${rejectClass}`
        return classes
    }, [isFocused, isDragAccept, isDragReject])

    return (
        <div className='container'>
            <div {...getRootProps({ className })}>
                <input {...getInputProps()} />
                <p>
                    {'Dépose une image ici, ou clique pour en sélectionner une'}
                </p>
            </div>
        </div>
    )
}

const onDrop = async (drop: DropEvent): void => {
    console.log(drop)

    const img = await publicImgUpload(drop[0])

    console.log(img)
}

const ImageUpload = (): React.JSX.Element => {
    return <StyledDropzone onDrop={onDrop} />
}

export default ImageUpload
