'use client'
import getData from "@/libs/api-libs/getApi";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoArrowUndo } from "react-icons/io5";
import ListFoto from "../ListFoto";
import { useRouter } from "next/navigation";

const Search = ({ hideSearch, setHideSearch }) => {
    const [foto, setFoto] = useState([])
    const [inputSearch, setInputSearch] = useState('')
    const [inputSearchLg, setInputSearchLg] = useState('')
    const [loading, setLoading] = useState(true)
    const route = useRouter()

    const handleSearch = (e) => {
        const keyword = inputSearchLg
        if (e.key == "Enter" || e.type == "click") {
            if (keyword !== "") {
                e.preventDefault()
                route.push(`/kategori/${keyword}`)
            }
        }
    }

    useEffect(() => {
        setLoading(true)
        const fecthData = async () => {
            try {
                const foto = await getData("/foto/random", `?category=${inputSearch}`)
                setFoto(foto)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        if (inputSearch !== "") {
            fecthData()
        }
    }, [inputSearch])
    
    return (
        <>
            <div className="w-full hidden lg:flex items-center relative">
                <input onChange={(e) => setInputSearchLg(e.target.value)} onKeyDown={handleSearch} value={inputSearchLg} className="w-full py-2 pl-1 border-2 border-black border-opacity-30 outline-none rounded-xl" type="text" placeholder="Pencarian Foto..." fdprocessedid="" />
                <BsSearch onClick={handleSearch} className="text-2xl absolute right-2 opacity-50 cursor-pointer" />
            </div>
            <div className={`w-full h-screen ${hideSearch ? "hidden" : "block"} lg:hidden fixed top-0 left-0 z-40 overflow-x-hidden overflow-y-scroll hideScrollBar bg-white`}>
                <div className="w-full h-auto">
                    <div className="w-full px-3 mt-3 flex items-center gap-x-2">
                        <IoArrowUndo onClick={() => setHideSearch(true)} className="text-3xl opacity-40 cursor-pointer" />
                        <div className="w-full flex items-center relative">
                            <input onChange={(e) => setInputSearch(e.target.value)} value={inputSearch} className="w-full py-2 pr-2 pl-10 outline-none border-2 border-black border-opacity-30 rounded-2xl" type="text" placeholder="Pencarian..." />
                            <BsSearch className="text-2xl absolute left-2 opacity-50" />
                        </div>
                    </div>
                    {loading
                        ? null
                        : foto.status == 404
                            ? null
                            : <section className="w-full">
                                <ListFoto api={foto} />
                            </section>}
                </div>
            </div>
        </>
    )
}

export default Search