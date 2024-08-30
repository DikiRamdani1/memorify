'use client'
import Link from "next/link"
import Search from "./search"
import { AiOutlineHome } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Itim, JetBrains_Mono } from "next/font/google";
import Login from "../Login";
import { useEffect, useState } from "react";
import getData from "@/libs/api-libs/getApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Upload from "./upload";

const itim = Itim({ subsets: ['latin'], weight: '400' })
const jetBrains = JetBrains_Mono({ subsets: ['latin'], weight: '400' })
const cookies = require('js-cookie');

const Navbar = () => {
    const [hideContent, setHideContent] = useState(true)
    const [statusLogin, setStatusLogin] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [hideSearch, setHideSearch] = useState(true)
    const [uploadContent, setUploadContent] = useState(true)

    useEffect(() => {
        setStatusLogin(cookies.get("statusLogin") == "true" ? true : false)
    }, [])

    useEffect(() => {
        const fecthData = async () => {
            try {
                const user = await getData("/user", `?id=${cookies.get("userLoginId")}`)
                cookies.set("userName", user.data.name, { expires: 3 })
                cookies.set("userImage", user.data.image, { expires: 3 })
                setUser(user)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fecthData()
    }, [])

    return (
        <>
            <nav className="w-full py-2 px-6 hidden lg:flex items-center justify-around sticky top-0 z-30 bg-white shadow-md">
                <Link href={"/beranda"}>
                    <h1 className={`${itim.className} text-3xl text-pink-300`}>Mfy</h1>
                </Link>
                <div className="w-3/5">
                    <Search hideSearch={hideSearch} setHideSearch={setHideSearch} />
                </div>
                <div className="w-48 flex justify-between">
                    <Link href={"/beranda"}>
                        <h6 className={`${jetBrains.className} text-lg opacity-90 hover:opacity-70`}>Beranda</h6>
                    </Link>
                    <Link href={"/kategori"}>
                        <h6 className={`${jetBrains.className} text-lg opacity-90 hover:opacity-70`}>Kategori</h6>
                    </Link>
                </div>
                <div>
                    {statusLogin
                        ? <div className="dropdown dropdown-end">
                            {loading
                                ? <div role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full bg-black"></div>
                                </div>
                                : <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <Image src={user.data.image} alt={`gambar ${user.data.name}`} width={500} height={500} />
                                    </div>
                                </div>
                            }
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <button onClick={() => router.push(`/profile/${user.data.id}`)} className="justify-between">
                                        Profile
                                    </button>
                                </li>
                                <li><button onClick={() => setUploadContent(false)}>Unggah</button></li>
                                <li><button onClick={() => {
                                    cookies.remove("statusLogin")
                                    router.push("/")
                                }}>Logout</button></li>
                            </ul>
                        </div>
                        : <button onClick={() => setHideContent(false)} className="px-5 py-1 skeleton bg-pink-500 hover:bg-opacity-70 text-white text-opacity-90 rounded-md" fdprocessedid="">Masuk</button>
                    }
                </div>
            </nav>
            <Upload userId={loading ? null : user.data.id} hideContent={uploadContent} setHideContent={setUploadContent} />
            <div className="lg:hidden">
                <Search hideSearch={hideSearch} setHideSearch={setHideSearch} />
            </div>
            <nav className="w-full flex lg:hidden justify-center fixed bottom-0 z-30">
                <div className="w-full sm:w-96 py-2 px-5 bg-white flex items-center justify-between sm:rounded-xl">
                    <Link href={"/beranda"}>
                        <AiOutlineHome className="text-4xl cursor-pointer" />
                    </Link>
                    <BsSearch onClick={() => setHideSearch(false)} className="text-3xl cursor-pointer" />
                    <Link href={"/kategori"}>
                        <BiCategory className="text-4xl cursor-pointer" />
                    </Link>
                    <FaUserCircle onClick={() => {
                        if (statusLogin) {
                            if (loading) {
                                null
                            } else {
                                router.push(`/profile/${user.data.id}`)
                            }
                        } else {
                            setHideContent(false)
                        }
                    }} className="text-4xl cursor-pointer" />
                </div>
            </nav>
            <Login hideContent={hideContent} setHideContent={setHideContent} />
        </>
    )
}

export default Navbar