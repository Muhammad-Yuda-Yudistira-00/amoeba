"use client"

import ContainerHome from '@/components/fragments/ContainerHome'
import CreateChecklistButton from '@/components/fragments/checklist/CreateChecklistButton'
import DocNeeded from '@/components/elements/documentation/DocNeeded'
import Roadmap from '@/components/elements/documentation/Roadmap'
import About from '@/components/elements/documentation/About'
import {useEffect} from 'react'

const appName = process.env.NEXT_PUBLIC_APP_NAME


export default function Home() {
  useEffect(() => {
    document.title = `Homepage | ${appName}`
  }, [])

  return (
    <ContainerHome>
    <div className="flex flex-col items-center gap-6 pt-2 pb-4 bg-[url('/themes/background/girls.svg')] bg-cover bg-center w-full h-full">
      <div className="flex flex-col gap-6 md:gap-12 pt-8">
        <div className="text-center md:px-10">
          <h1 className="text-4xl md:text-5xl font-extrabold dark:text-neutral-800 uppercase bg-white/10">{appName}<small className="text-lg md:text-4xl ms-2 font-semibold text-white dark:text-red-700 lowercase bg-orange-200/40 px-2"> task manager or todolist</small></h1>
          <div className="m-auto w-full pt-14 flex justify-center h-full px-4">
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
        <small className="text-orange-900 bg-orange-400 px-2 pb-1">*This created for alternative checklist than checkli, i want to improve UI (style) to be beautiful looks. not login.</small>
      </div>
    </div>

    <DocNeeded />
    </ContainerHome>
  );
}
