import { cookies, } from 'next/headers'
import { REFRESH_TOKEN_COOKIES_KEY, verifyRefreshToken, } from '@lib/auth'
import { redirect, } from 'next/navigation'

export async function GET () {
  const refreshToken = cookies().get(REFRESH_TOKEN_COOKIES_KEY)

  if (!refreshToken || !await verifyRefreshToken(refreshToken.value)) {
    return redirect('/login')
  }


}
