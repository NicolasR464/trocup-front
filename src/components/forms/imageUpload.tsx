'use client'

import { CldUploadWidget } from 'next-cloudinary'

const ImageUploader = (): React.JSX.Element => {
    return (
        <CldUploadWidget uploadPreset='<Your Upload Preset>'>
            {({ open }) => {
                return (
                    <button
                        onClick={() => {
                            open()
                        }}
                    >
                        {'Importe une image'}
                    </button>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUploader
