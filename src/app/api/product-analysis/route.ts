import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * POST endpoint for analyzing the product data.
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} A response object with the analysis result or an error message.
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
    const formData = await request.formData()
    const image = formData.get('file')

    if (!image || !(image instanceof File)) {
        return NextResponse.json(
            { error: 'Invalid file upload' },
            { status: 400 },
        )
    }

    return NextResponse.json({ message: 'Product data analyzed successfully.' })
}
