"use client"

import {useRouter} from "next/navigation"
import {useState} from "react"
import ContainerHome from '@/components/fragments/ContainerHome'

const appName = process.env.NEXT_PUBLIC_APP_NAME
const apiweb = process.env.NEXT_PUBLIC_API_WEB
const apikey = process.env.NEXT_PUBLIC_API_KEY

export default function Home() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleClick() {
    setLoading(true)
    fetch(`${apiweb}/checklist`, {
      method: "POST",
      headers: {
        "Conten-Type": "application/json",
        "x-api-key": apikey!
      }
    }).then(res => res.json())
    .then(data => {
      router.push("/checklist/" + data.data.code)
    })
  }

  return (
    <ContainerHome>
      <div className="text-center">
        <h1 className="text-4xl md:text-7xl font-mutlu pb-10"><span className="text-lime-400">{appName}</span> is simple <span className="text-orange-600">checklist</span></h1>
        <small className="opacity-90 md:opacity-85 font-extralight bg-white text-black py-2 rounded-sm px-2 text-xl">Checklist maker tools, free, simple, easy to use, beautiful looks, fun, like the checkli (popular checklist)</small>
      </div>
      <div>
        <button onClick={handleClick} disabled={loading} className="bg-stone-400 px-4 py-2 border-8 hover:scale-110 hover:px-8 hover:rotate-12 hover:-translate-x-2 hover:bg-orange-500 uppercase transition-all duration-500 text-xs md:text-lg">
          {loading ? "Loading.." : "create"}
        </button>
      </div>
    </ContainerHome>
  );
}
