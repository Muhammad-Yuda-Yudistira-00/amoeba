"use client"

import {useRouter} from "next/navigation"
import {useState} from "react"

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
    <div className="flex flex-col justify-center items-center min-h-screen gap-6 bg-[url('/themes/background/city-1.jpg')] bg-cover">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl uppercase font-mutlu pb-4">awasome checklist</h1>
        <small className="font-extralight bg-stone-400 px-2 text-xl">Simple, easy to use, beautiful looks and fun...</small>
      </div>
      <div>
        <button onClick={handleClick} disabled={loading} className="bg-stone-400 px-4 py-2 border-8 hover:scale-110 hover:px-8 hover:rotate-12 hover:-translate-x-2 uppercase transition-all duration-500 text-xs md:text-lg">
          {loading ? "Loading.." : "create"}
        </button>
      </div>
    </div>
  );
}
