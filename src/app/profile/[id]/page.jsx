"use client"
import ListFoto from "@/components/ListFoto"
import getData from "@/libs/api-libs/getApi"
import { JetBrains_Mono } from "next/font/google"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { BiEdit } from "react-icons/bi";
import { IoArrowUndo } from "react-icons/io5";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri"
import { CgMenuGridR } from "react-icons/cg";
import Upload from "@/components/Navbar/upload"


const jetBrains = JetBrains_Mono({ subsets: ["latin"], weight: "400" })
const cookies = require("js-cookie")
const Page = ({ params }) => {
    const { id } = params
    const [foto, setFoto] = useState([])
    const [like, setLike] = useState([])
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState(true)
    const router = useRouter()
    const [inputFoto, setInputFoto] = useState(null)
    const [inputName, setInputName] = useState('')
    const [hideEdit, setHideEdit] = useState(true)
    const [loadingEdit, setLoadingEdit] = useState(false)
    const [uploadContent, setUploadContent] = useState(true)


    const handleEdit = async () => {
        const formData = new FormData()
        const idUser = formData.append("id", id)
        const name = formData.append("name", inputName)
        const image = formData.append("image", inputFoto)
        try {
            const response = await fetch("/api/user", {
                method: 'PUT',
                body: formData
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        console.log(inputFoto)
        console.log("a")
        if (e.key == "Enter" || e.type == "click") {
            if (inputFoto !== null && inputName !== "") {
                setLoadingEdit(true)
                handleEdit()
            } else if (inputName !== "" && inputName !== user.data.name) {
                setLoadingEdit(true)
                handleEdit()
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const foto = await getData("/foto", `?userId=${id}`)
                const like = await getData("/like", `?userId=${id}`)
                const user = await getData("/user", `?id=${id}`)
                setFoto(foto)
                setLike(like)
                setUser(user)
                setInputName(user.data.name)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <div className={`w-full h-screen bg-opacity-60 flex items-center justify-center fixed top-0 left-0 z-40`}>
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    return (
        <main>
            <div className="p-3 flex justify-between">
                <IoArrowUndo onClick={() => router.back()} className="text-4xl opacity-40 cursor-pointer" />
                {cookies.get("userLoginId") == id
                    ? <div className="dropdown dropdown-end">
                        <CgMenuGridR tabIndex={0} className="text-4xl opacity-40  cursor-pointer" />
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li><button onClick={() => setUploadContent(false)}>Unggah</button></li>
                            <li><button onClick={() => {
                                cookies.remove("statusLogin")
                                router.push("/")
                            }}>Logout</button></li>
                        </ul>
                    </div>
                    : null}
            </div>
            <Upload userId={id} hideContent={uploadContent} setHideContent={setUploadContent} />
            <div className={`w-full h-screen bg-black bg-opacity-60 ${loadingEdit ? 'flex' : 'hidden'} items-center justify-center fixed top-0 left-0 z-40`}>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
            <div className={`w-full h-screen ${hideEdit ? 'hidden' : 'flex'} items-center justify-center bg-black bg-opacity-60 fixed top-0 z-30`}>
                <div className="w-full md:w-96 h-full md:h-auto px-8 py-6 bg-white md:rounded-3xl relative">
                    <IoMdCloseCircleOutline onClick={() => setHideEdit(true)} className="text-3xl absolute top-2 right-3 cursor-pointer" />
                    <h1 className={`${jetBrains} text-3xl text-center`}>Edit Profil</h1>
                    <div className="w-full mt-5 flex justify-center">
                        <label className="w-3/5 h-40 flex flex-col items-center justify-center bg-gray-200 rounded-3xl cursor-pointer" htmlFor="imageProfile">
                            <RiImageAddFill className={`text-7xl ${inputFoto !== null ? 'text-green-500' : 'text-black'}`} />
                            <h1 className="text-black text-opacity-70">Pilih Foto</h1>
                        </label>
                        <input onChange={(e) => setInputFoto(e.target.files[0])} className="hidden" id="imageProfile" type="file" accept=".png, .jpg, .jpeg" />
                    </div>
                    <div className="w-full mt-4 flex justify-center">
                        <div className="w-3/4">
                            <input onChange={(e) => setInputName(e.target.value)} onKeyDown={handleSubmit} value={inputName} className="w-full py-2 px-2 bg-gray-200 border-2 border-gray-400 focus:border-gray-600 outline-none rounded" type="text" placeholder="Nama" />
                        </div>
                    </div>
                    <div className="w-full mt-4 flex justify-center">
                        <button onClick={handleSubmit} className="w-3/4 py-2 bg-pink-500 hover:bg-opacity-90 text-white text-opacity-90">Unggah</button>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto mt-4 md:mt-20 flex flex-col items-center">
                <div className="w-60 h-60 relative rounded-full ring-2 ring-black">
                    <Image className="w-full h-full object-cover rounded-full" src={user.data.image} alt="image user" width={500} height={500} />
                    {cookies.get("userLoginId") == id
                        ? <div onClick={() => setHideEdit(false)} className="w-10 h-10 flex items-center justify-center bg-black rounded-full absolute right-3 top-[10%] cursor-pointer">
                            <BiEdit className="text-3xl text-white opacity-90" />
                        </div>
                        : null}
                </div>
                <div>
                    <h1 className={`${jetBrains.className} mt-5 text-3xl text-center`}>{user.data.name}</h1>
                </div>
                <div className="w-auto h-8 mt-7 flex items-center text-center border-b-2 border-pink-300 relative">
                    {cookies.get("userLoginId") == id ?
                        <>
                            <div className={`w-32 h-full bg-pink-300 absolute left-0 ${tab ? "translate-x-0" : "translate-x-full"} transition`}></div>
                            <button onClick={() => {
                                setTab(true)
                            }} className="w-32 relative">Foto</button>
                            <button onClick={() => {
                                setTab(false)
                            }} className="w-32 relative">Suka</button>
                        </>
                        : <h1 className="text-xl">Foto</h1>
                    }
                </div>
            </div>
            {tab
                ? foto.status == 404
                    ? null
                    : <section>
                        <ListFoto api={foto} />
                    </section>
                : like.status == 404
                    ? null
                    : <section>
                        <ListFoto api={like} />
                    </section>}
        </main>
    )
}

export default Page