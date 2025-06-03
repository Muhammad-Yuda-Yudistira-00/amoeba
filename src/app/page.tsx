import ContainerHome from '@/components/fragments/ContainerHome'
import type {Metadata} from "next"
import CreateChecklistButton from '@/components/fragments/checklist/CreateChecklistButton'
import DocNeeded from '@/components/elements/documentation/DocNeeded'
import Roadmap from '@/components/elements/documentation/Roadmap'
import About from '@/components/elements/documentation/About'

const appName = process.env.NEXT_PUBLIC_APP_NAME
const appDesc = process.env.NEXT_PUBLIC_APP_DESC
const appUrl = process.env.NEXT_PUBLIC_APP_URL

export const metadata: Metadata = {
  title: `Checklist Check List Maker Free, Task Manager / Todolist | ${appName}`,
  description: appDesc,
  applicationName: appName,
  author: `{name: 'Muhammad Yuda Yudistira', url: 'https://my-profile-ten-kohl.vercel.app/'}`,
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

export default function Home() {
  return (
    <ContainerHome>
    <div className="flex flex-col items-center gap-28 pt-2 bg-[url('https://c4.wallpaperflare.com/wallpaper/644/305/118/pattern-black-gradient-texture-wallpaper-preview.jpg')] bg-cover bg-center w-full h-full">
      <div className="flex flex-col gap-6 md:gap-12 pt-8">
        <div className="text-center md:px-10">
          <h1 className="text-5xl font-extrabold dark:text-white uppercase">Checklipst<small className="ms-2 font-semibold text-gray-500 dark:text-gray-400 uppercase">checklist is second todolist</small></h1>
          <div className="m-auto w-full pt-14 flex justify-center h-full">
            <Roadmap />
          </div>
        </div>
        <div className="m-auto flex flex-col items-center w-full justify-center">
          <CreateChecklistButton />
          <span className="pt-4">
            <About></About>
          </span>
        </div>
      </div>
      <div className="px-2 text-center">
        <small className="text-orange-900 bg-orange-400 px-2 pb-1">*This created for alternative simple checklist, specially checkli, i want to improve UI (web styling) to be beautiful looks and very very simple then checkli. made simple and past to access, not confused users.</small>
      </div>
    </div>

    <DocNeeded />
    </ContainerHome>
  );
}
