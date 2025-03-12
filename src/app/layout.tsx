import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script"
import Music from "@/components/elements/Music"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appName = "Amoeba List"; 
const appDesc = "Aplikasi checklist yang membantu mengatur tugasmu lebih baik.";
const appUrl = "https://amoeba-weld.vercel.app";

export const metadata: Metadata = {
  title: `${appName} | Checklist`,
  description: appDesc,
  openGraph: {
    title: `${appName} | Checklist`,
    description: appDesc,
    url: appUrl,
    siteName: appName,
    images: [
      {
        url: `${appUrl}/alt-logo/amoeba-logo.png`,
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
    <html lang="id">
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

        <meta name="apple-mobile-web-app-title" content="Amoeba List" />

        {/* google search console via tag html for verification */}
        <meta name="google-site-verification" content="zj-GFUXInFYVlsAm7D3Ngd_wsDSwRyutH-0xOYI5bVE" />

        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200`}
      >
        {children}
        <div className="relative w-full h-80 m-auto text-center z-30 bg-[url('/themes/patterns/metallic-holographic.jpg')] py-24 bg-cover bg-red-700 bg-blend-color-burn">
          <Music />
        </div>
      </body>
    </html>
  );
}
