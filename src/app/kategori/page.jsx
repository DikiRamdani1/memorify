'use client'
import Navbar from "@/components/Navbar/navbar"
import { Itim, JetBrains_Mono } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
const itim = Itim({ subsets: ['latin'], weight: '400' })
const jetBrains = JetBrains_Mono({ subsets: ['latin'], weight: '400' })
const Page = () => {
    const [pemandangan, setPemandangan] = useState([ { text: 'Pantai', image: "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-asadphoto-457882.jpg?alt=media&token=5b1f0089-dcb0-4769-9128-224df422cc03" }, { text: 'Gunung', image: "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-chiecharon-913215.jpg?alt=media&token=9e5add7a-7e01-4414-a994-3c873d40a2b5" }, { text: "Hutan", image: "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-pille-kirsi-222198-1093184.jpg?alt=media&token=e1de4561-fed5-4a5b-a922-3b84b4324101" }])
    const [anime, setAnime] = useState([{ text: 'One Piece', image: "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fsatoru-gojo-one-piece-hd-wallpaper-preview.jpg?alt=media&token=0d0995c0-9492-4854-acc3-947602bb71cc" }, { text: 'Demon Slayer', image: "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fanime-demon-slayer-kimetsu-no-yaiba-genya-shinazugawa-giyuu-tomioka-inosuke-hashibira-hd-wallpaper-preview.jpg?alt=media&token=52cc8495-2118-4439-9f22-47926230440d" }, {text: "Jujutsu Kaisen", image: "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fjujutsu-kaisen-yuji-itadori-kugisaki-nobara-megumi-fushiguro-hd-wallpaper-preview.jpg?alt=media&token=7008c3dc-b9be-47bf-9b54-6a5adb5ecbbd"}])
    const [hewan, setHewan] = useState([ { text: 'Kucing', image: "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-photo-2558605.jpeg?alt=media&token=885d78d2-181a-4ed2-813c-4fe170a85e09" }])
    const [makanan, setMakanan] = useState([{ text: 'Daging Babi', image: "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-vanmalidate-769289.jpg?alt=media&token=49f11eb6-e6c1-41ca-a822-b167fe75009f" }])
    return (
        <main className="pb-10">
            <Navbar />
            <div className="w-full h-auto px-3 md:px-20 flex flex-col">
                <section className="mt-10">
                    <h1 className={`text-3xl ml-3 ${itim.className}`}>Pemandangan</h1>
                    <div className="w-full h-auto mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {pemandangan.map((category, index) => {
                            return (
                                <Link key={index} href={`/kategori/${category.text}`}>
                                    <div className="group w-full h-60 rounded-3xl relative overflow-hidden cursor-pointer">
                                        <Image className="w-full h-full object-cover brightness-[0.2] group-hover:brightness-50" src={category.image} alt={`gambar ${category.text}`} width={500} height={500} />
                                        <div className="w-full h-full px-2 flex items-center justify-center absolute top-0 text-center">
                                            <h1 className={`${jetBrains.className} text-2xl text-white`}>{category.text}</h1>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>
                <section className="mt-28">
                    <h1 className={`text-3xl ml-3 ${itim.className}`}>Anime</h1>
                    <div className="w-full h-auto mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {anime.map((category, index) => {
                            return (
                                <Link key={index} href={`/kategori/${category.text}`}>
                                    <div className="group w-full h-60 rounded-3xl relative overflow-hidden cursor-pointer">
                                        <Image className="w-full h-full object-cover brightness-[0.2] group-hover:brightness-50" src={category.image} alt={`gambar ${category.text}`} width={500} height={500} />
                                        <div className="w-full h-full px-2 flex items-center justify-center absolute top-0 text-center">
                                            <h1 className={`${jetBrains.className} text-2xl text-white`}>{category.text}</h1>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>
                <section className="mt-28">
                    <h1 className={`text-3xl ml-3 ${itim.className}`}>Hewan</h1>
                    <div className="w-full h-auto mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {hewan.map((category, index) => {
                            return (
                                <Link key={index} href={`/kategori/${category.text}`}>
                                    <div className="group w-full h-60 rounded-3xl relative overflow-hidden cursor-pointer">
                                        <Image className="w-full h-full object-cover brightness-[0.2] group-hover:brightness-50" src={category.image} alt={`gambar ${category.text}`} width={500} height={500} />
                                        <div className="w-full h-full px-2 flex items-center justify-center absolute top-0 text-center">
                                            <h1 className={`${jetBrains.className} text-2xl text-white`}>{category.text}</h1>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>
                <section className="mt-28">
                    <h1 className={`text-3xl ml-3 ${itim.className}`}>Makanan</h1>
                    <div className="w-full h-auto mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {makanan.map((category, index) => {
                            return (
                                <Link key={index} href={`/kategori/${category.text}`}>
                                    <div className="group w-full h-60 rounded-3xl relative overflow-hidden cursor-pointer">
                                        <Image className="w-full h-full object-cover brightness-[0.2] group-hover:brightness-50" src={category.image} alt={`gambar ${category.text}`} width={500} height={500} />
                                        <div className="w-full h-full px-2 flex items-center justify-center absolute top-0 text-center">
                                            <h1 className={`${jetBrains.className} text-2xl text-white`}>{category.text}</h1>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Page