'use client'
import { JetBrains_Mono } from "next/font/google"
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import getData from "@/libs/api-libs/getApi";
import { useRouter } from "next/navigation";

const bcrypt = require('bcryptjs')
const cookies = require('js-cookie')
const jetBrains = JetBrains_Mono({ subsets: ['latin'], weight: '600' })
const Login = ({ hideContent, setHideContent }) => {
    const [content, setContent] = useState(true)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [conPass, setConPass] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [showConPass, setShowConPass] = useState(false)
    const [compareUsername, setCompareUsername] = useState(false)
    const [comparePass, setComparePass] = useState(true)
    const [loadingRL, setLoadingRL] = useState(false)
    const [message, setMessage] = useState(false)
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [usernameLogin, setUsernameLogin] = useState('')
    const [passLogin, setPassLogin] = useState('')
    const [messageLogin, setMessageLogin] = useState(false)
    const router = useRouter()

    const register = async () => {
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(pass, salt)
        try {
            const response = await fetch("/api/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    username: username,
                    password: hashPass,
                    image: "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2F98d6b7390de2642bfc75639dcb73ac0c.jpg?alt=media&token=0cc1c4c1-542c-47f2-b025-457b23d722eb",
                    role: "user"
                })
            })
            setMessage(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleRegister = () => {
        if (name.length >= 8 && username.length >= 8 && pass.length >= 8) {
            const userUname = user.data.find(person => person.username == username)
            if (userUname == undefined) {
                setCompareUsername(false)
                if (pass == conPass) {
                    setComparePass(true)
                    setLoadingRL(true)
                    register()
                } else {
                    setComparePass(false)
                }
            } else {
                setCompareUsername(true)
            }
        }
    }

    const handleComparePass = async (pass, passHash) => {
        const comparePassLogin = await bcrypt.compare(pass, passHash)
        return comparePassLogin
    }

    const handleLogin = () => {
        const compareUsername = user.data.find(person => person.username == usernameLogin)
        if (compareUsername != undefined) {
            handleComparePass(passLogin, compareUsername.password).then((result) => {
                if (result) {
                    setLoadingRL(true)
                    cookies.set('statusLogin', 'true', { expires: 3 })
                    cookies.set('userLoginId', compareUsername.id, { expires: 3 })
                    window.location.reload()
                } else {
                    setMessageLogin(true)
                }
            }).catch((error) => {
                console.log(error)
            })
        } else {
            setMessageLogin(true)
        }
    }

    useEffect(() => {
        const fecthData = async () => {
            try {
                const user = await getData("/user", "")
                setUser(user)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fecthData()
    }, [])

    return (
        <div className={`w-full h-screen ${hideContent ? 'hidden' : 'flex'} items-center justify-center bg-black bg-opacity-60 fixed top-0 z-40`}>
            {loading
                ? <span className="loading loading-spinner loading-lg"></span>
                : <div className="w-full h-screen px-8 md:w-96 md:h-[550px] bg-white md:rounded-3xl relative overflow-hidden">
                    <IoMdCloseCircleOutline onClick={() => {
                        setHideContent(true)
                        setContent(true)
                    }} className="text-3xl absolute top-2 right-2 z-10 cursor-pointer" />
                    <div className={`w-full h-full absolute left-0 ${content ? 'translate-y-0' : 'translate-y-full'} transition duration-600`}>
                        <div className="w-full mt-10">
                            <h1 className={`${jetBrains.className} text-center text-3xl`}>Selamat Datang di Memorify</h1>
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="w-[80%] flex mt-10 items-center relative">
                                <input onChange={(e) => setUsernameLogin(e.target.value)} value={usernameLogin} className={`w-full pl-8 py-1 ${messageLogin ? 'border-2 border-red-600' : 'border-2 border-gray-400 focus:border-gray-600'} placeholder:py-2 outline-none rounded-xl bg-gray-200`} type="text" placeholder="Username" fdprocessedid="" />
                                <FaUserAlt className="absolute left-2 text-xl opacity-70 text-gray-700" />
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="w-[80%] flex mt-10 items-center relative">
                                <input onChange={(e) => setPassLogin(e.target.value)} value={passLogin} className={`w-full pl-8 py-1 ${messageLogin ? 'border-2 border-red-600' : 'border-2 border-gray-400 focus:border-gray-600'} placeholder:py-2 outline-none rounded-xl bg-gray-200`} type={showPass ? 'text' : 'password'} placeholder="Password" fdprocessedid="" />
                                <FaLock className="absolute left-2 text-xl opacity-70 text-gray-700" />
                                <FiEyeOff onClick={() => setShowPass(true)} className={`${showPass ? 'hidden' : 'block'} absolute right-2 text-xl opacity-70 text-gray-700`} />
                                <FaEye onClick={() => setShowPass(false)} className={`${showPass ? 'block' : 'hidden'} absolute right-2 text-xl opacity-70 text-gray-700`} />
                            </div>
                        </div>
                        <div className="w-full mt-5 flex justify-center">
                            <button onClick={handleLogin} className="w-[80%] py-2 bg-black text-white text-opacity-90 rounded-xl hover:bg-opacity-70" fdprocessedid="">Masuk</button>
                        </div>
                        <div className="w-full mt-5 flex justify-center">
                            <button onClick={() => {
                                setContent(false)
                                setShowPass(false)
                            }} className="w-[80%] py-2 bg-green-600 text-white text-opacity-90 rounded-xl hover:bg-opacity-70" fdprocessedid="">Daftar</button>
                        </div>
                    </div>
                    <div className={`w-full h-full absolute left-0 ${content ? '-translate-y-full' : 'translate-y-0'} transition duration-600`}>
                        <div className="w-full mt-10">
                            <h1 className={`${jetBrains.className} text-center text-3xl`}>Selamat Datang di Memorify</h1>
                        </div>
                        <div className="w-full mt-5 mb-3 flex flex-col items-center">
                            <div className="w-[80%] flex items-center relative">
                                <input onChange={(e) => setName(e.target.value)} value={name} className="w-full pl-8 py-1 border-2 border-gray-400 outline-none focus:border-gray-600 placeholder:py-2 rounded-xl bg-gray-200" type="text" placeholder="Name" fdprocessedid="" />
                                <FaPen className="absolute left-2 text-xl opacity-70 text-gray-700" />
                            </div>
                            {name.length >= 8
                                ? null
                                : <div className="w-[80%]">
                                    <h6 className="text-red-500 text-xs ml-1 mt-1">harus lebih dari 8 huruf!</h6>
                                </div>}
                        </div>
                        <div className="w-full mb-3 flex flex-col items-center">
                            <div className="w-[80%] flex items-center relative">
                                <input onChange={(e) => setUsername(e.target.value)} value={username} className="w-full pl-8 py-1 border-2 border-gray-400 outline-none focus:border-gray-600 placeholder:py-2 rounded-xl bg-gray-200" type="text" placeholder="Username" fdprocessedid="" />
                                <FaUserAlt className="absolute left-2 text-xl opacity-70 text-gray-700" />
                            </div>
                            {username.length >= 8
                                ? null
                                : <div className="w-[80%]">
                                    <h6 className="text-red-500 text-xs ml-1 mt-1">harus lebih dari 8 huruf!</h6>
                                </div>}
                            {compareUsername
                                ? <div className="w-[80%]">
                                    <h6 className="text-red-500 text-xs ml-1 mt-1">Username tidak tersedia</h6>
                                </div>
                                : false}
                        </div>
                        <div className="w-full mb-3 flex flex-col items-center">
                            <div className="w-[80%] flex items-center relative">
                                <input onChange={(e) => setPass(e.target.value)} value={pass} className="w-full pl-8 py-1 border-2 border-gray-400 outline-none focus:border-gray-600 placeholder:py-2 rounded-xl bg-gray-200" type={showPass ? 'text' : 'password'} placeholder="Password" fdprocessedid="" />
                                <FaLock className="absolute left-2 text-xl opacity-70 text-gray-700" />
                                <FiEyeOff onClick={() => setShowPass(true)} className={`${showPass ? 'hidden' : 'block'} absolute right-2 text-xl opacity-70 text-gray-700`} />
                                <FaEye onClick={() => setShowPass(false)} className={`${showPass ? 'block' : 'hidden'} absolute right-2 text-xl opacity-70 text-gray-700`} />
                            </div>
                            {pass.length >= 8
                                ? null
                                : <div className="w-[80%]">
                                    <h6 className="text-red-500 text-xs ml-1 mt-1">harus lebih dari 8 huruf!</h6>
                                </div>}
                            {comparePass
                                ? null
                                : pass.length >= 8
                                    ? <div className="w-[80%]">
                                        <h6 className="text-red-500 text-xs ml-1 mt-1">password tidak sama</h6>
                                    </div>
                                    : null}
                        </div>
                        <div className="w-full mb-3 flex flex-col items-center">
                            <div className="w-[80%] flex items-center relative">
                                <input onChange={(e) => setConPass(e.target.value)} value={conPass} className="w-full pl-8 py-1 border-2 border-gray-400 outline-none focus:border-gray-600 placeholder:py-2 rounded-xl bg-gray-200" type={showConPass ? 'text' : 'password'} placeholder="Confirm Password" fdprocessedid="" />
                                <FaLock className="absolute left-2 text-xl opacity-70 text-gray-700" />
                                <FiEyeOff onClick={() => setShowConPass(true)} className={`${showConPass ? 'hidden' : 'block'} absolute right-2 text-xl opacity-70 text-gray-700`} />
                                <FaEye onClick={() => setShowConPass(false)} className={`${showConPass ? 'block' : 'hidden'} absolute right-2 text-xl opacity-70 text-gray-700`} />
                            </div>
                            {comparePass
                                ? null
                                : <div className="w-[80%]">
                                    <h6 className="text-red-500 text-xs ml-1 mt-1">password tidak sama</h6>
                                </div>}
                        </div>
                        <div className="w-full mt-5 flex justify-center">
                            <button onClick={handleRegister} className="w-[80%] py-2 bg-green-600 text-white text-opacity-90 rounded-xl hover:bg-opacity-70" fdprocessedid="">Simpan</button>
                        </div>
                        <div className="w-full mt-5 flex justify-center">
                            <button onClick={() => {
                                setContent(true)
                                setShowPass(false)
                                setShowConPass(false)
                            }} className="w-[80%] py-2 bg-black text-white text-opacity-90 rounded-xl hover:bg-opacity-70" fdprocessedid="">Kembali</button>
                        </div>
                    </div>
                </div>}
            {loadingRL
                ? <div className="w-full h-screen flex items-center justify-center bg-black bg-opacity-60 fixed top-0 z-20">
                    {message
                        ? <div className="w-80 h-auto px-5 py-6 flex flex-col items-center bg-white rounded-xl">
                            <h1 className="mt-4 text-2xl">Pendaftaran berhasil</h1>
                            <button onClick={() => window.location.reload()} className="px-7 py-1 mt-2 bg-black hover:bg-opacity-70 rounded-xl text-white text-opacity-90">oke</button>
                        </div>
                        : <span className="loading loading-spinner loading-lg"></span>}
                </div>
                : null}
        </div>
    )
}

export default Login