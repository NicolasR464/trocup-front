import { NextResponse } from 'next/server'

/**
 * POST endpoint for analyzing the product data.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A response object with the analysis result or an error message.
 */
export const POST = async (request: Request): Promise<NextResponse> => {
    // console.log(await request.json())
    const formData = await request.formData()
    console.log(formData)

    const productData = ''

    if (!productData) {
        console.log('🔥 No product data provided')
        // return NextResponse.json(
        //     { error: 'No product data provided' },
        //     { status: 400 },
        // )
    }

    return NextResponse.json({
        message: 'Product data analyzed successfully.',
        content: { estimatedValue: Math.floor(Math.random() * 100) },
    })
}
