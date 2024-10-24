import { NextResponse } from 'next/server'

import { wait } from '@/utils/functions'

/**
 * POST endpoint for analyzing the product data.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A mock response with a random estimated value or an error message.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await
export const POST = async (request: Request): Promise<NextResponse> => {
    // Toggle this to false when real API is ready
    const MOCK_API = true

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (MOCK_API) {
        // Simulate API delay
        await wait(1_000)

        // Return mock data
        return NextResponse.json({
            message: 'MOCK: Product data analyzed successfully.',
            content: {
                productName: 'MOCK: Product name',
                estimatedValue: Math.floor(Math.random() * 100),
            },
        })
    }

    // Implement real Dataiku API call here
    return NextResponse.json(
        { error: 'Dataiku API not yet implemented' },
        { status: 501 },
    )
}
