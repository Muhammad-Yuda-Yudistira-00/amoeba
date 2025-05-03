import ContainerHome from '@/components/fragments/ContainerHome'
// import {metadata} from "next"
import CreateChecklistButton from '@/components/fragments/checklist/CreateChecklistButton'

const appName = process.env.NEXT_PUBLIC_APP_NAME
const appDesc = process.env.NEXT_PUBLIC_APP_DESC
const appUrl = process.env.NEXT_PUBLIC_APP_URL

export const metadata = {
  title: `${appName} | Free checklist maker`,
  description: appDesc,
  author: 'Check Lipst Team',
  openGraph: {
    title: `${appName} | Free checklist maker, support mobile`,
    description: appDesc,
    url: appUrl,
    siteName: appName,
    images: [
      {
        url: `${appUrl}/sample/thumbnail-medsos-sharing.jpg`,
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

export default function Home() {
  return (
    <ContainerHome>
    <div className="flex flex-col items-center gap-16">
      <div className="flex flex-col gap-8">
        <div className="text-center md:px-10">
          <h1 className="text-7xl md:text-9xl font-loversQuarrel pb-4 bg-black/20 px-12"><span className="text-lime-400">{appName}</span> is simple <span className="text-orange-600">checklist</span></h1>
          <small className="opacity-90 md:opacity-85 inline-block md:max-w-3xl font-extralight bg-white text-black py-2 rounded-sm px-2 text-sm md:text-lg rounded mt-2">{appDesc}</small>
        </div>
        <div className="m-auto flex items-center w-full justify-center">
          <CreateChecklistButton />
        </div>
      </div>
      <div>
        <small className="text-yellow-400 bg-black/30 px-2">*This created for alternative simple checklist, specially checkli, i want to improve UI (web styling) to be beautiful looks and very very simple then checkli. made simple and past to access, not confused users.</small>
      </div>
    </div>
    </ContainerHome>
  );
}
