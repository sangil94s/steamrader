import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Common/Header';
import Top from '@/components/Common/Top';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '사이드 프로젝트 | Steam Rader',
  description: '사이드 프로젝트 - 스팀 할인 정보를 가져오는 프로젝트',
  openGraph: {
    title: "Steam Rader",
    description: '개인프로젝트로 스팀 대작 게임 할인 정보를 보여줍니다'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
        <Top />
      </body>
    </html>
  );
}
