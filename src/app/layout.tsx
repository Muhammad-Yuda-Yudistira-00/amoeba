import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script"
import Music from "@/components/elements/Music"
import ReduxProvider from '@/app/providers'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appName = process.env.NEXT_PUBLIC_APP_NAME;
const appDesc = `Explore ${appName} – a free online checklist tool with stunning design! Create simple Checklists effortlessly, powered by beautiful tools that boost productivity with flair. Start now!`;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

export const metadata: Metadata = {
  title: appName,
  description: appDesc,
  openGraph: {
    title: appName,
    description: appDesc,
    url: appUrl,
    siteName: appName,
    images: [
      {
        url: `${appUrl}/sample/sample-web.jpg`,
        width: 1200,
        height: 630
      }
    ],
    type: "website"
  },
  robots: "index, follow",
  alternates: {
    canonical: appUrl
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="">
      <head>

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-30774F78SL"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-30774F78SL');
          `}
        </Script>

        <meta name="apple-mobile-web-app-title" content="AmoeBALIst" />
        {/* Logo / brand for favicon */}
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="favicon-128.png" sizes="128x128" />
        <meta name="application-name" content="&nbsp;"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />

        {/* google search console via tag html for verification */}
        <meta name="google-site-verification" content="zj-GFUXInFYVlsAm7D3Ngd_wsDSwRyutH-0xOYI5bVE" />
        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200`}
      >
        <ReduxProvider>
          {children}
          <div className="relative w-full h-80 m-auto text-center z-30 bg-[url('/themes/patterns/metallic-holographic.jpg')] py-24 bg-cover bg-red-700 bg-blend-color-burn">
            <Music />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
