import { mainFolder, subfolders } from '@/utils/constants/images'
import { apiEndpoints } from '../../constants/endpoints'

export const publicImgUpload = async (
    img: File,
): Promise<
    | {
          public_id: string
          secure_url: string
      }
    | undefined
> => {
    const cloudinaryForm = new FormData()

    const subfolder =
        process.env.NODE_ENV === 'development'
            ? subfolders.development
            : subfolders.production

    cloudinaryForm.append('file', img)
    cloudinaryForm.append('folder', `${mainFolder}/${subfolder}`)
    cloudinaryForm.append('upload_preset', 'unsigned')

    const response = await fetch(apiEndpoints.CLOUDINARY, {
        method: 'POST',
        body: cloudinaryForm,
    })

    //
    if (response.ok) {
        const {
            public_id,
            secure_url,
        }: {
            public_id: string
            secure_url: string
        } = (await response.json()) as { public_id: string; secure_url: string }

        return {
            public_id,
            secure_url,
        }
    }

    if (response.status !== 200)
        throw new Error('Cloudinary image upload failed')

    return undefined
}
