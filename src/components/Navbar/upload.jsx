'use client'
import { Itim, JetBrains_Mono } from "next/font/google"
import { useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";

const itim = Itim({ subsets: ['latin'], weight: ['400'] })
const jetBrains = JetBrains_Mono({ subsets: ['latin'], weight: '600' })
const Upload = ({ userId, hideContent, setHideContent }) => {
    const [judul, setJudul] = useState('')
    const [foto, setFoto] = useState(null)
    const [loadingUpload, setLoadingUpload] = useState(false)
    const [pickCategory, setPickCategory] = useState([])
    const inputCategory = useRef(null)
    const [kategoriLength, setKategoriLength] = useState(0)

    const submit = async (e) => {
        const formData = new FormData()
        formData.append("title", judul)
        formData.append("image", foto)
        formData.append("category", pickCategory)
        formData.append("userId", userId)

        try {
            const response = await fetch("/api/foto", {
                method: 'POST',
                body: formData
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        if (e.key == "Enter" || e.type == "click") {
            if (judul !== "" && foto !== null && pickCategory.length > 0) {
                setLoadingUpload(true)
                submit()
            }
        }
    }

    const handleKategoriPick = (e) => {
        const ICategory = inputCategory.current.value
        const kategori = pickCategory.filter(item => item.includes(ICategory))
        if (e.key == "Enter" || e.type == "click") {
            if (kategoriLength <= 4 && ICategory !== "" && kategori.length < 1) {
                pickCategory.push(ICategory)
                setKategoriLength(pickCategory.length)
                inputCategory.current.value = ""
            }
        }
    }

    return (
        <div className={`w-full h-screen ${hideContent ? 'hidden' : 'flex'} items-center justify-center bg-black bg-opacity-60 fixed top-0 left-0 z-40`}>
            <div className="w-full md:w-96 h-full md:h-[550px] px-8 bg-white md:rounded-3xl relative">
                <IoMdCloseCircleOutline onClick={() => {
                    setHideContent(true)
                    setFoto(null)
                    setJudul('')
                    setPickCategory([])
                }} className="text-3xl absolute top-2 right-2 z-10 cursor-pointer" />
                <h1 className={`${jetBrains} text-3xl text-center mt-10`}>Unggah Foto Kamu</h1>
                <div className="w-full mt-5 flex justify-center">
                    <label className="w-3/5 h-40 flex flex-col items-center justify-center bg-gray-200 rounded-3xl cursor-pointer" htmlFor="image">
                        <RiImageAddFill className={`text-7xl ${foto !== null ? 'text-green-500' : 'text-black'}`} />
                        <h1 className="text-black text-opacity-70">Pilih Foto</h1>
                    </label>
                    <input onChange={(e) => setFoto(e.target.files[0])} className="hidden" id="image" type="file" accept=".png, .jpg, .jpeg" />
                </div>
                <div className="w-full mt-4 flex justify-center">
                    <div className="w-3/4">
                        <input onChange={(e) => setJudul(e.target.value)} value={judul} onKeyDown={handleKategoriPick} className="w-full py-2 px-2 bg-gray-200 border-2 border-gray-400 focus:border-gray-600 outline-none rounded" type="text" placeholder="Judul Foto" />
                    </div>
                </div>
                <div className="w-full mt-4 flex justify-center">
                    <div className="w-3/4 flex items-center relative">
                        <input ref={inputCategory} onKeyDown={handleKategoriPick} className="w-full py-2 pl-2 pr-7 bg-gray-200 border-2 border-gray-400 focus:border-gray-600 outline-none rounded" type="text" placeholder="Kategori Foto" />
                        <button onClick={handleKategoriPick} className="px-3 h-full text-2xl absolute right-0">+</button>
                    </div>
                </div>
                <div className="w-full mt-4 flex justify-center">
                    <div className="w-3/4 flex flex-wrap gap-2">
                        {kategoriLength <= 0 ? null
                            : pickCategory.map((kategori, index) => {
                                return (
                                    <div key={index} className="px-2 flex items-center gap-x-1 bg-pink-300 rounded-2xl">
                                        <button
                                            onClick={(e) => {
                                                const value = e.target.value
                                                const deleteKategori = pickCategory.filter(item => !item.includes(value))
                                                setPickCategory(deleteKategori)
                                                setKategoriLength(deleteKategori.length)
                                            }}
                                            value={kategori} 
                                            className="text-2xl"
                                        >
                                            x
                                        </button>
                                        <h1 className="text-white">{kategori.length >= 10 ? `${kategori.slice(0, 10)}..` : kategori}</h1>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="w-full mt-4 flex justify-center">
                    <button onClick={handleSubmit} className="w-3/4 py-2 bg-pink-500 hover:bg-opacity-90 text-white text-opacity-90">Unggah</button>
                </div>
            </div>
            <div className={`w-full h-screen bg-black bg-opacity-60 ${loadingUpload ? 'flex' : 'hidden'} items-center justify-center fixed top-0 left-0 z-10`}>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        </div>
    )
}

export default Upload