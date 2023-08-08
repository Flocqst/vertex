import Navbar from '@/components/Layout/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vertex',
  description: 'Vertex dApp',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>
            <Navbar />
            <section className="flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-20 pb-10 pt-8 max-md:pb-32 sm:px-20">
              <div className="w-full">
                {children}
              </div>
            </section>
          </main>
        </Providers>
      </body>
    </html>
  )
}
