import { apiEndpoints } from '../../constants/endpoints'

export const publicImgUpload = async (
    img: File,
): Promise<
    | {
          public_id: string
          url: string
      }
    | undefined
> => {
    const cloudinaryForm = new FormData()

    let folder = 'temp'

    if (process.env.NODE_ENV === 'development') folder = 'temp-dev'
    cloudinaryForm.append('file', img)
    cloudinaryForm.append('folder', folder)
    cloudinaryForm.append('upload_preset', 'unsigned')

    const response = await fetch(apiEndpoints.CLOUDINARY, {
        method: 'POST',
        body: cloudinaryForm,
    })
    console.log(response)

    //
    if (response.ok) {
        const {
            public_id,
            url,
        }: {
            public_id: string
            url: string
        } = (await response.json()) as { public_id: string; url: string }

        return {
            public_id,
            url,
        }
    }

    if (response.status !== 200)
        throw new Error('Cloudinary image upload failed')

    return undefined
}
