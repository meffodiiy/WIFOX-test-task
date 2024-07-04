import * as jose from 'jose'
import User from '@db/models/user.model'
import { cookies, } from 'next/headers'
import { redirect, } from 'next/navigation'


export const ACCESS_TOKEN_COOKIES_KEY = 'at'
// const ACCESS_TOKEN_LIFE_TIME = 5 * 60 * 1000  // 5 minutes
const ACCESS_TOKEN_LIFE_TIME = 5 * 60 * 60 * 1000  // 5 hours
// const ACCESS_TOKEN_LIFE_TIME = 10 * 1000  // 10 seconds
export const REFRESH_TOKEN_COOKIES_KEY = 'rt'
const REFRESH_TOKEN_LIFE_TIME = 4 * 7 * 24 * 60 * 60 * 1000  // 4 weeks
const ACCESS_TOKEN_SECRET = new TextEncoder().encode(process.env.AUTH_ACCESS_TOKEN_SECRET)
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(process.env.AUTH_REFRESH_TOKEN_SECRET)


type AccessTokenPayload = { id: User['_id'], }
type RefreshTokenPayload = { id: User['_id'], }


export async function generateAccessToken (user: User) {
  return await (
    new jose.SignJWT({ id: user._id, } satisfies AccessTokenPayload)
      .setProtectedHeader({ alg: 'HS256', })
      .setExpirationTime(Date.now() + ACCESS_TOKEN_LIFE_TIME)
      .sign(ACCESS_TOKEN_SECRET)
  )
}

export async function generateRefreshToken (user: User) {
  return await (
    new jose.SignJWT({ id: user._id, } satisfies RefreshTokenPayload)
      .setProtectedHeader({ alg: 'HS256', })
      .setExpirationTime(Date.now() + REFRESH_TOKEN_LIFE_TIME)
      .sign(REFRESH_TOKEN_SECRET)
  )
}

export async function generateTokens (user: User) {
  return {
    access: await generateAccessToken(user),
    refresh: await generateRefreshToken(user),
  }
}

export async function verifyAccessToken (token: string): Promise<AccessTokenPayload | false> {
  try {
    const { payload, } = await jose.jwtVerify<AccessTokenPayload>(token, ACCESS_TOKEN_SECRET)

    if (new Date().getTime() > payload.exp!) {
      throw new Error('Token expired')
    }

    return payload
  }
  catch (error) {
    console.log('ERROR in verifyAccessToken', error)
    return false
  }
}

export async function verifyRefreshToken (token: string): Promise<RefreshTokenPayload | false> {
  try {
    const { payload, } = await jose.jwtVerify<RefreshTokenPayload>(token, REFRESH_TOKEN_SECRET)

    if (new Date().getTime() > payload.exp!) {
      throw new Error('Token expired')
    }

    return payload
  }
  catch (error) {
    console.log('ERROR in verifyRefreshToken', error)
    return false
  }
}

export async function authorizeAndRedirect (user: User, redirectURL: string) {
  cookies().set({
    name: ACCESS_TOKEN_COOKIES_KEY,
    value: await generateAccessToken(user),
    httpOnly: true,
    path: '/',
    expires: Date.now() + ACCESS_TOKEN_LIFE_TIME,
  })
  cookies().set({
    name: REFRESH_TOKEN_COOKIES_KEY,
    value: await generateRefreshToken(user),
    httpOnly: true,
    path: '/refresh',
    expires: Date.now() + REFRESH_TOKEN_LIFE_TIME,
  })
  redirect(redirectURL)
}
