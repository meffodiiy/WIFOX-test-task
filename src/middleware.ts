import { NextRequest, NextResponse, } from 'next/server'
import { ACCESS_TOKEN_COOKIES_KEY, verifyAccessToken, } from '@lib/auth'


const PRIVATE_ROUTES = [
  '/dashboard',
]
export const USER_ID_CUSTOM_HEADER = 'X-USER-ID'

export async function middleware (request: NextRequest) {

  if (PRIVATE_ROUTES.every( route => !request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIES_KEY)

  const accessTokenPayload = accessToken && await verifyAccessToken(accessToken.value)

  if (!accessTokenPayload) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const headers = new Headers(request.headers)
  headers.set(USER_ID_CUSTOM_HEADER, accessTokenPayload.id)

  return NextResponse.next({
    request: {
      headers,
    },
  })
}
