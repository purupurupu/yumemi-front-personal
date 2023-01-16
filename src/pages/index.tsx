import { Inter } from '@next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Prefectures } from '@/components/Prefectures'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Yumemi Personal Trial</title>
        <meta name='description' content='Yumemi Personal Trial' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <Prefectures />
      </main>
    </>
  )
}
