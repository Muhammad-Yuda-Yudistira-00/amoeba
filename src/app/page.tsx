import ContainerHome from '@/components/fragments/ContainerHome'
// import {metadata} from "next"
import CreateChecklistButton from '@/components/fragments/checklist/CreateChecklistButton'

const appName = process.env.NEXT_PUBLIC_APP_NAME
const appDesc = process.env.NEXT_PUBLIC_APP_DESC
// const appUrl = process.env.NEXT_PUBLIC_APP_URL

// export const metadata = {
//   title: `${appName} | Homapage`,
//   description: appDesc,
//   openGraph: {
//     title: `${appName} | Homepage`,
//     description: appDesc,
//     url: appUrl,
//     siteName: appName,
//     images: [
//       {
//         url: `${appUrl}/sample/sample-web.jpg`,
//         width: 1200,
//         height: 630
//       }
//     ],
//     type: 'website'
//   },
//   robots: 'index, follow',
//   alternates: {
//     canonical: appUrl
//   }
// }

export default function Home() {
  return (
    <ContainerHome>
      <div className="text-center">
        <h1 className="text-7xl md:text-9xl font-loversQuarrel pb-10 bg-black/20"><span className="text-lime-400">{appName}</span> is simple <span className="text-orange-600">checklist</span></h1>
        <small className="opacity-90 md:opacity-85 font-extralight bg-white text-black py-2 rounded-sm px-2 text-sm md:text-xl">{appDesc}</small>
      </div>
      <div>
        <CreateChecklistButton />
      </div>
    </ContainerHome>
  );
}
