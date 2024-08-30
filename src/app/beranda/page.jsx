'use client'
import Navbar from "@/components/Navbar/navbar"
import { useEffect, useState } from "react"
import getData from "@/libs/api-libs/getApi"
import ListFoto from "@/components/ListFoto"

const Page = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fecthData = async () => {
            try {
                const foto = await getData("/foto/random", '')
                setData(foto)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fecthData()
    }, [])

    return (
        <main>
            <Navbar />
            {loading
                ? <div className="w-full h-[70vh] flex items-center justify-center">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
                : <section>
                    <ListFoto api={data} />
                </section>}
        </main>
    )
}

export default Page