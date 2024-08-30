'use client'
import Navbar from "@/components/Navbar/navbar"
import getData from "@/libs/api-libs/getApi"
import { Itim, JetBrains_Mono } from "next/font/google"
import Image from "next/image"
import { useEffect, useState } from "react"
import { IoSend } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { useRouter } from "next/navigation"
import { IoArrowUndo } from "react-icons/io5";
import ListFoto from "@/components/ListFoto"
import Link from "next/link"



const itim = Itim({ subsets: ['latin'], weight: '400' })
const jetBrains = JetBrains_Mono({ subsets: ['latin'], weight: '600' })
const cookies = require("js-cookie")

const Page = ({ params }) => {
    const { id } = params
    const [foto, setFoto] = useState([])
    const [fotoCategory, setFotoCategory] = useState([])
    const [user, setUser] = useState([])
    const [komentar, setKomentar] = useState([])
    const [like, setLike] = useState([])
    const [likeStatus, setLikeStatus] = useState(false)
    const [loading, setLoading] = useState(true)
    const [textKomen, setTextKomen] = useState('')
    const [saveKomen, setSaveKomen] = useState([])
    const [hideKomentar, setHideKomentar] = useState(true)
    const router = useRouter()

    const timeAgo = (createAt) => {
        const currentTimeInSeconds = Math.floor(Date.now() / 1000); // waktu sekarang dalam detik
        const diffInSeconds = currentTimeInSeconds - createAt.seconds; // selisih waktu dalam detik

        if (diffInSeconds < 60) {
            return "baru saja";
        } else if (diffInSeconds < 3600) { // kurang dari 1 jam
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} menit`;
        } else if (diffInSeconds < 86400) { // kurang dari 1 hari
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} jam`;
        } else if (diffInSeconds < 604800) { // kurang dari 1 minggu
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} hari`;
        } else {
            const weeks = Math.floor(diffInSeconds / 604800);
            return `${weeks} minggu`;
        }
    }

    const addKomentar = async () => {
        try {
            const response = await fetch("/api/komentar", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: cookies.get("userLoginId"),
                    fotoId: id,
                    text: textKomen
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const resultKomen = () => {
        const komen = {
            name: cookies.get("userName"),
            image: cookies.get("userImage"),
            text: textKomen,
            createAt: "baru saja"
        }
        saveKomen.push(komen)
    }

    const handleKomentar = (e) => {
        const statusLogin = cookies.get("statusLogin")

        if (statusLogin == "true") {
            if (e.key == "Enter" || e.type == "click") {
                if (textKomen !== '') {
                    resultKomen()
                    addKomentar()
                    setTextKomen('')
                }
            }
        }
    }

    const handleLike = async () => {
        try {
            const response = await fetch("/api/like", {
                method: 'POST',
                body: JSON.stringify({
                    fotoId: id,
                    userId: cookies.get("userLoginId")
                })
            })
            const like = await getData("/like", `?userId=${cookies.get("userLoginId")}&fotoId=${id}`)
            setLike(like)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUnLike = async () => {
        try {
            const response = await fetch("/api/like", {
                method: 'DELETE',
                body: JSON.stringify({
                    id: like.data.id
                })
            })
        } catch (error) {
            
        }
    }

    const handleSubmitLike = () => {
        const statusLogin = cookies.get("statusLogin")

        if (statusLogin == "true") {
            if (likeStatus) {
                if (like.status = 200) {
                    handleUnLike()
                    setLikeStatus(false)
                }
            } else {
                handleLike()
                setLikeStatus(true)
            }
        }
    }

    useEffect(() => {
        const fecthData = async () => {
            try {
                const foto = await getData("/foto", `?id=${id}`)
                const category = foto.data.category
                const category_ = new URLSearchParams({ category }).toString()
                const fotoCategory = await getData("/foto/random", `?${category_}`)
                const user = await getData("/user", `?id=${foto.data.userId}`)
                const komentar = await getData("/komentar", `?fotoId=${id}`)
                const fotoC = fotoCategory.data.filter(foto => foto.id !== id)
                const like = await getData("/like", `?userId=${cookies.get("userLoginId")}&fotoId=${id}`)
                setFoto(foto)
                setFotoCategory({ data: fotoC })
                console.log(like)
                setUser(user)
                setKomentar(komentar)
                setLike(like)
                if (like.status == 200) {
                    setLikeStatus(true)
                }
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
            <div className="w-full h-auto md:mt-5 flex items-center justify-center relative z-[32] md:z-0">
                {loading
                    ? <div className="w-full md:w-[80%] lg:w-[700px] md:h-[40vh] lg:h-[60vh] pb-5 md:-0 flex flex-col md:flex-row relative">
                        <div className="skeleton h-[70vh] md:h-full w-full md:w-[35%]"></div>
                        <div className="w-full md:w-[65%] px-4 md:px-0 md:ml-4 relative">
                            <div className="mt-2 flex items-center justify-between md:justify-start">
                                <div className="flex items-center">
                                    <div className="skeleton w-10 h-10 rounded-full relative overflow-hidden"></div>
                                    <div className="skeleton h-5 w-32 ml-2"></div>
                                </div>
                                <div className="flex md:hidden gap-x-3">
                                    <div className="skeleton h-7 w-7"></div>
                                    <div className="skeleton h-7 w-7"></div>
                                </div>
                            </div>
                            <div className="skeleton md:w-2/4 h-8 mt-3"></div>
                            <div className="skeleton md:w-2/4 h-5 mt-2 hidden md:block"></div>
                            <div className="ml-2 hidden md:block">
                                <div className="mt-5 flex items-center">
                                    <div className="skeleton w-8 h-8 rounded-full relative overflow-hidden"></div>
                                    <div className="skeleton h-4 w-32 ml-2"></div>
                                </div>
                                <div className="skeleton h-2 w-3/5 ml-10 mt-1"></div>
                                <div className="skeleton h-2 w-3/5 ml-10 mt-1"></div>
                                <div className="skeleton h-2 w-3/5 ml-10 mt-1"></div>
                            </div>
                            <div className="ml-2 hidden md:block">
                                <div className="mt-5 flex items-center">
                                    <div className="skeleton w-8 h-8 rounded-full relative overflow-hidden"></div>
                                    <div className="skeleton h-4 w-32 ml-2"></div>
                                </div>
                                <div className="skeleton h-2 w-3/5 ml-10 mt-1"></div>
                                <div className="skeleton h-2 w-3/5 ml-10 mt-1"></div>
                                <div className="skeleton h-2 w-3/5 ml-10 mt-1"></div>
                            </div>
                        </div>
                    </div>
                    : <div className="w-full md:w-[80%] lg:w-[700px] md:h-[480px] lg:h-[60vh] pb-5 flex flex-col md:flex-row relative bg-white shadow-xl">
                        <div className="w-full md:w-[35%] h-full relative overflow-hidden">
                            <Image className="w-full h-auto" src={foto.data.image} alt={`gambar ${foto.data.title}`} width={2500} height={3500} />
                            <div className="w-10 h-10 hidden md:flex items-center justify-center rounded-full bg-white absolute top-2 left-2 cursor-pointer">
                                <FaHeart onClick={handleSubmitLike} className={`text-2xl ${likeStatus ? "text-red-500" : "text-gray-400"}`} />
                            </div>
                            <div className="w-10 h-10 flex md:hidden items-center justify-center rounded-full bg-white absolute top-2 left-2 cursor-pointer">
                                <IoArrowUndo onClick={() => router.push("/beranda")} className="text-2xl opacity-40" />
                            </div>
                        </div>
                        <div className="w-full md:w-[65%] px-4 md:px-0 md:ml-4 relative">
                            <div className="mt-2 flex items-center justify-between md:justify-start">
                                <Link href={`/profile/${user.data.id}`}>
                                    <div className="flex items-center">
                                        <div className="w-14 md:w-10 h-14 md:h-10 bg-black rounded-full relative overflow-hidden">
                                            <Image className="w-full h-full object-cover" src={user.data.image} alt={`gambar user ${user.data.name}`} width={500} height={500} />
                                        </div>
                                        <h1 className={`${jetBrains.className} text-2xl md:text-xl ml-2`}>{user.data.name}</h1>
                                    </div>
                                </Link>
                                <div className="flex md:hidden gap-x-3">
                                    <FaCommentDots onClick={() => setHideKomentar(false)} className="text-3xl opacity-40 float-right" />
                                    <FaHeart onClick={handleSubmitLike} className={`text-3xl ${likeStatus ? "text-red-500" : "text-gray-400"} float-right`} />
                                </div>
                            </div>
                            <div className="w-full mt-3">
                                <h1 className={`${itim.className} text-4xl line-clamp-1`}>{foto.data.title}</h1>
                            </div>
                            <div onClick={() => setHideKomentar(true)} className={`w-full h-screen ${hideKomentar ? 'hidden' : 'block'} fixed top-0 left-0`}></div>
                            <div className={`w-full h-[420px] md:h-[56%] pr-2 mt-2 ${hideKomentar ? 'translate-y-full' : 'translate-y-0'} md:translate-y-0 md:block fixed bottom-0 left-0 z-30 md:z-0 md:relative bg-white md:bg-transparent transition duration-700`}>
                                <h6 className={`${jetBrains.className} text-lg opacity-70 hidden md:block`}>Komentar</h6>
                                <div className="w-[95%] h-auto mt-1 flex md:hidden items-center bg-white">
                                    <input onChange={(e) => setTextKomen(e.target.value)} onKeyDown={handleKomentar} value={textKomen} className="w-full py-2 pl-2 pr-5 outline-none" type="text" placeholder="Masukan Komentar" fdprocessedid="" />
                                    <IoSend onClick={handleKomentar} className="text-2xl absolute right-2 opacity-70" />
                                </div>
                                <div className="w-full h-full md:mt-2 md:bg-base-300 rounded-2xl relative hideScrollBar overflow-y-scroll overflow-x-hidden">
                                    <div className="w-full min-h-20 h-auto mx-3 py-2">
                                        {saveKomen.length == 0
                                            ? null
                                            :
                                            saveKomen.reverse().map((data, index) => {
                                                return (
                                                    <div key={index} className="w-full">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8  rounded-full bg-black relative overflow-hidden">
                                                                <Image className="w-full h-full object-cover" src={data.image} alt={`gamabar user ${data.name}`} width={500} height={500} />
                                                            </div>
                                                            <h1 className={`${jetBrains.className} ml-2 font-black`}>{data.name}</h1>
                                                        </div>
                                                        <div className="ml-10">
                                                            <p className="text-sm opacity-90">{data.text}</p>
                                                            <div className="mt-2 text-xs opacity-50">
                                                                <h6>{data.createAt}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        {komentar.status == 404
                                            ? null
                                            : komentar.data.map((data, index) => {
                                                return (
                                                    <div key={index} className="w-full">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8  rounded-full bg-black relative overflow-hidden">
                                                                <Image className="w-full h-full object-cover" src={data.user.image} alt={`gamabar user ${data.user.name}`} width={500} height={500} />
                                                            </div>
                                                            <h1 className={`${jetBrains.className} ml-2 font-black`}>{data.user.name}</h1>
                                                        </div>
                                                        <div className="ml-10">
                                                            <p className="text-sm opacity-90">{data.komentar}</p>
                                                            <div className="w-40 mt-2 flex justify-between text-xs opacity-50">
                                                                <h6>{timeAgo(data.createAt)}</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                </div>
                            </div>
                            <div className="w-[95%] h-auto mt-1 hidden md:flex items-center absolute -bottom-8 bg-white">
                                <input onChange={(e) => setTextKomen(e.target.value)} onKeyDown={handleKomentar} value={textKomen} className="w-full py-2 pl-2 pr-5 outline-none" type="text" placeholder="Masukan Komentar" fdprocessedid="" />
                                <IoSend onClick={handleKomentar} className="text-2xl absolute right-2 opacity-70" />
                            </div>
                        </div>
                    </div>}
            </div>
            <div className="w-full h-auto mt-7 md:mt-11">
                <h1 className={`${itim.className} text-3xl ml-4 md:ml-0 md:text-center`}>Lainnya</h1>
                <section>
                    {loading
                        ? null
                        : fotoCategory.data.length == 0
                            ? null
                            : <ListFoto api={fotoCategory} />}
                </section>
            </div>
        </main>
    )
}

export default Page