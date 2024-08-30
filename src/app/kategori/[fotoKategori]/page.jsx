'use client'
import ListFoto from "@/components/ListFoto"
import Navbar from "@/components/Navbar/navbar"
import getData from "@/libs/api-libs/getApi"
import { Itim } from "next/font/google"
import { useEffect, useState } from "react"
import { FaRegSadCry } from "react-icons/fa";

const itim = Itim({subsets: ['latin'], weight: '400'})

const Page = ({ params }) => {
    const { fotoKategori } = params
    const hidePersen = fotoKategori.replace("%20", " ")
    const [foto, setFoto] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fecthData = async () => {
            try {
                const foto = await getData("/foto/random", `?category=${hidePersen}`)
                setFoto(foto)
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
                : <div className="w-full h-auto mt-3 lg:mt-7">
                    <section>
                        {foto.status == 404 ? <div className="w-full h-[70vh] flex flex-col items-center justify-center">
                            <FaRegSadCry className="w-40 h-40 text-gray-700"/>
                            <h1 className="text-3xl">Foto tidak ditemukan</h1>
                        </div>
                        : <ListFoto api={foto} />}
                    </section>
                </div>}
        </main>
    )
}

export default Page