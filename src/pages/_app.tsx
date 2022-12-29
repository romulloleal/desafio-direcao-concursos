import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'

import 'nprogress/nprogress.css'

import { GlobalTheme } from '~/styles/global'
import { Header, Main } from '~/styles/pages/app'
import Loading from '~/components/Loading'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useMemo(() => {
    // disable link prefetch
    router.prefetch = async () => {}
  }, [router])
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <Loading />
      <GlobalTheme />
      <Header>
        <Link href='/' className='logo'>
          Desafio - Direção Concursos
        </Link>
      </Header>
      <Main>
        <Component {...pageProps} />
      </Main>
    </>
  )
}
