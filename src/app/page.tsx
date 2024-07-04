import Logo from '@lib/components/Logo'
import * as Texts from '@lib/constants/texts'
import Button from '@lib/components/Button'
import { useRouter, } from 'next/navigation'

export default function HomePage () {
  const router = useRouter()
  return (
    <main className="home-page">
      <Logo variant="big"/>
      <h3>{Texts.APP_DESCRIPTION}</h3>
      <Button onClick={() => router.push('/login')}>
        {Texts.LOG_IN}
      </Button>
    </main>
  )
}
