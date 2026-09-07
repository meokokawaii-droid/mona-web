import type { Metadata } from 'next'
import { Noto_Serif_SC, Cormorant_Garamond } from 'next/font/google'
import { SiteExtras } from '@/components/survey/site-extras'

import './globals.css'

const notoSerifSC = Noto_Serif_SC({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif-cn"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-serif-en"
});

export const metadata: Metadata = {
  title: '萌 Mona Meoko | 个人主页',
  description: '22岁 / 日语学习中 / 自由灵魂 - 热爱社会学、政治学与一切表达自我的事物',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="bg-background">
      <body className={`${notoSerifSC.variable} ${cormorant.variable} antialiased bg-background`} style={{ fontFamily: 'var(--font-serif-cn), var(--font-serif-en), serif' }}>
        {children}
        <SiteExtras />
        
      </body>
    </html>
  )
}
