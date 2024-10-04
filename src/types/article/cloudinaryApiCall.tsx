import { z } from 'zod'

// Define the Zod schema for the Cloudinary response
export const CloudinaryResponseSchema = z.object({
    asset_id: z.string(),
    public_id: z.string(),
    version: z.number(),
    version_id: z.string(),
    signature: z.string(),
    width: z.number(),
    height: z.number(),
    format: z.string(),
    resource_type: z.string(),
    created_at: z.string(),
    tags: z.array(z.string()),
    bytes: z.number(),
    type: z.string(),
    etag: z.string(),
    placeholder: z.boolean(),
    url: z.string(),
    secure_url: z.string(),
    asset_folder: z.string(),
    display_name: z.string(),
    access_mode: z.string(),
    original_filename: z.string(),
})

// Infer the TypeScript type from the Zod schema
export type CloudinaryResponse = z.infer<typeof CloudinaryResponseSchema>
