"use client"

import {useRouter} from "next/navigation"
import {useState} from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  function handleClick() {
    setLoading(true)
    fetch("https://checklist.titik.my.id/api/checklist", {
      method: "POST",
      headers: {
        "Conten-Type": "application/json",
        "x-api-key": "ab781859020b0c50e8394cedae6044e036e17fd50a0c64113f1e88684822b4c2"
      }
    }).then(res => res.json())
    .then(data => {
      router.push("/checklist/" + data.data.code)
    })
  }

  return (
    <div className="flex flex-col justify-center bg-yellow-900 items-center min-h-screen gap-6">
      <div className="text-center">
        <h1 className="text-6xl uppercase">awasome checklist</h1>
        <small className="font-extralight">Simple, easy to use, bautiful looks, fun with Amoeba</small>
      </div>
      <div>
        <button onClick={handleClick} disabled={loading} className="bg-stone-400 px-4 py-2 border-8 hover:scale-110 hover:px-8 hover:-rotate-45 hover:-translate-x-2 uppercase">
          {loading ? "Loading.." : "create"}
        </button>
      </div>
    </div>
  );
}
