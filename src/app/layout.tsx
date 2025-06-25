import "./globals.css";
import Script from "next/script"
import Music from "@/components/elements/Music"
import ReduxProvider from '@/app/providers'
import type {Metadata} from "next"
import { Geist, Geist_Mono } from "next/font/google"

const appName = process.env.NEXT_PUBLIC_APP_NAME
const appDesc = process.env.NEXT_PUBLIC_APP_DESC
const appUrl = process.env.NEXT_PUBLIC_APP_URL

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: `Checklist Check List Maker Free, Task Manager / Todolist | ${appName}`,
  description: appDesc,
  applicationName: appName,
  authors: [{name: 'Muhammad Yuda Yudistira', url: 'https://my-profile-ten-kohl.vercel.app/'}],
  creator: `${appName} Team.`,
  keywords: ['Checklist', 'Todolist', 'Task Manager'],
  openGraph: {
    title: `Checklist Check List Maker Free, Task Manager / Todolist | ${appName}`,
    description: appDesc,
    url: appUrl,
    siteName: appName,
    images: [
      {
        url: `${appUrl}/sample/thumbnail.jpg`,
        width: 1200,
        height: 630
      }
    ],
    type: 'website'
  },
  robots: 'index, follow',
  alternates: {
    canonical: appUrl
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="">
      <head>
        <meta name="apple-mobile-web-app-title" content="AmoeBALIst" />
        {/* Logo / brand for favicon */}
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="new-logo/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="new-logo/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="new-logo/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="new-logo/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="new-logo/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="new-logo/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="new-logo/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="new-logo/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="new-logo/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="new-logo/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="new-logo/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="new-logo/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="new-logo/favicon-128.png" sizes="128x128" />
        <meta name="application-name" content="&nbsp;"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />


        {/* google search console via tag html for verification */}
        <meta name="google-site-verification" content="zj-GFUXInFYVlsAm7D3Ngd_wsDSwRyutH-0xOYI5bVE" />

        {/* google fonts tester */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Charm:wght@400;700&family=Playwrite+DK+Loopet:wght@100..400&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200`}
      >
        {/* google analytics */}
        {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && (
          <>
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-30774F78SL" strategy="lazyOnload"></Script>
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-30774F78SL');
            `}
          </Script>
          </>
        )}

        <ReduxProvider>
          {children}
          <div className="relative w-full h-80 m-auto text-center z-30 pb-24 pt-0 bg-gradient-to-t from-[#1a1a1a] to-stone-700">
            <Music />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
