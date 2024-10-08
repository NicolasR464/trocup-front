import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { users } from '@/mocks/users'

import { wait } from '@/utils/functions'

/**
 * Mock API endpoint to get/test users data.
 * @param {NextRequest} request - The incoming request object containing the page number.
 * @returns {Promise<NextResponse>} The response object containing the user data.
 */
export const GET = async (request: NextRequest): Promise<NextResponse> => {
    const { searchParams } = request.nextUrl

    const skip = Number.parseInt(searchParams.get('skip') ?? '0', 10)
    const limit = Number.parseInt(
        searchParams.get('limit') ?? users.length.toString(),
        10,
    )

    await wait(500)

    const chunkOfUsers = users.slice(skip, skip + limit)

    const nextCursor = skip + limit < users.length ? skip + limit : undefined

    /*
     * This block of code below is to mock error 500
     * const number = Math.random() * 10
     * if (number < 9)
     *     return NextResponse.json(
     *         { error: 'Internal Server Error' },
     *         { status: 500 },
     *     )
     */

    return NextResponse.json({ users: chunkOfUsers, nextCursor })
}
