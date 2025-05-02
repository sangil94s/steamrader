import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Top from '@/components/Common/Top';
import ReactQueryProvider from './util/ReactQuery';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '2025년 스팀 대작게임 할인 정보',
  description: '스팀 할인 정보를 가져오는 프로젝트',
  openGraph: {
    title: '2025년 스팀 대작게임 할인 정보',
    description: '개인프로젝트로 스팀 대작 게임 할인 정보를 보여줍니다',
  },
  other: {
    'google-site-verification': 'BBrEoloKrI9hK33Qgu_9Py7BoGyDDPTrmerozCLMQhg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          {children}
          <Top />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
