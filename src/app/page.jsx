'use client'
import Footer from "@/components/Footer"
import Login from "@/components/Login"
import Navbar from "@/components/Navbar/navbar"
import { Itim, JetBrains_Mono } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const itim = Itim({ subsets: ['latin'], weight: '400' })
const jetBrains = JetBrains_Mono({ subsets: ['latin'], weight: '400' })
const cookies = require("js-cookie")
const Page = () => {
  const content = [
    ["https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-brett-sayles-992734.jpg?alt=media&token=153ffcc7-7088-4132-9aa3-87664f2be00f", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-iriser-1408221.jpg?alt=media&token=ce30e881-d8df-43c5-8c84-25cfbb8b702d", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-picjumbo-com-55570-196664.jpg?alt=media&token=04c4a7cc-9a62-459e-afd1-7b373533a122", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-pixabay-39517.jpg?alt=media&token=65d7d24e-41f2-44c3-8392-16cbef6e383a", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-pixabay-53135.jpg?alt=media&token=2aa38f90-d110-4979-89b2-f58f8cc5da40", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-pixabay-56866.jpg?alt=media&token=7c527307-ece4-4a0f-bb34-a8656e443ca4"],
    ["https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fanime-girl-Eromanga-Sensei-1431299-wallhere.com.png?alt=media&token=e56b7034-d408-4c19-be35-35473f536875", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fanime-anime-girls-fate-apocrypha-fate-grand-order-wallpaper-preview.jpg?alt=media&token=cebd3f3a-820b-4915-aba3-d171b50eeac7", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fanime-anime-girls-fate-grand-order-sakura-saber-wallpaper-preview.jpg?alt=media&token=5a01b6ed-ad7b-4369-abb4-60ea577f8199", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fanime-demon-slayer-kimetsu-no-yaiba-zenitsu-agatsuma-hd-wallpaper-preview.jpg?alt=media&token=626db24d-6d0e-443e-8904-4c77e996c951", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fanime-girls-gun-school-uniform-houkai-gakuen-wallpaper-preview.jpg?alt=media&token=3d42e84d-a88e-4135-b1e0-4ff61e5256b5", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fuchiha-madara-naruto-shippuuden-wallpaper-preview.jpg?alt=media&token=a87cff59-a911-4b84-b996-f39f2b5e3744"],
    ["https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-barfisch-pix-115740.jpg?alt=media&token=cff83a35-4131-473b-bb1d-5914d21b4ce1", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-janetrangdoan-793785.jpg?alt=media&token=fb771ade-d7bb-47eb-8a1f-ec8d9c43ad59", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-pascal-claivaz-66964-410648.jpg?alt=media&token=56f5a13d-3cf0-43e6-ab24-8d437a6ab11d", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-pixabay-361184.jpg?alt=media&token=da24da09-2837-4d1f-837e-bc85b98867f8", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-valeriya-1860208.jpg?alt=media&token=c1d3acc6-49fe-4396-82bb-ba3cc645d72f", "https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fpexels-xmtnguyen-1001773.jpg?alt=media&token=3d0afef5-d7e3-4c4c-a337-74e2c6aac018"]
  ];
  const [count, setCount] = useState(0)
  const [imageContent, setImageContent] = useState(content[0])
  const imageRefs = useRef([])
  const router = useRouter()
  const image1 = useRef(null)
  const image2 = useRef(null)
  const container1 = useRef(null)
  const container2 = useRef(null)
  const [hideContent, setHideContent] = useState(true)

  useEffect(() => {
    if (cookies.get("statusLogin") == "true") {
      router.push("/beranda")
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      imageRefs.current.forEach((img) => {
        if (img) img.classList.add("imageContent");
      });

      if (count >= content.length - 1) {
        setCount(0)
      } else {
        setCount((prevCount) => prevCount + 1)
      }

      setTimeout(() => {
        imageRefs.current.forEach((img) => {
          if (img) img.classList.remove("imageContent");
        });
      }, 1000);

    }, 5000);

    setImageContent(content[count])

    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    const windowScrollY = () => {
      const y = window.scrollY

      imageRefs.current.forEach((img, index) => {
        if (index % 2 === 0) {
          img.style.transform = `translateX(${-y / 5}px)`
        } else {
          img.style.transform = `translateX(${y / 5}px)`
        }
      })
      if (container1.current) {
        container1.current.style.transform = `translateX(${-y / 5}px)`
      }

      if (container2.current) {
        container2.current.style.transform = `translateX(${y / 5}px)`
      }

      if (image1.current) {
        if (y / 7 <= 82.9) {
          image1.current.style.transform = `translate(${-y / 7}px, ${-y / 7}px)`
        } else {
          image1.current.style.transform = `translate(-82.9px, -82.9px)`
        }
      }

      if (image2.current) {
        if (y / 7 <= 82.9) {
          image2.current.style.transform = `translate(${y / 7}px, ${y / 7}px)`
        } else {
          image2.current.style.transform = `translate(82.9px, 82.9px)`
        }
      }
    }

    window.addEventListener("scroll", windowScrollY)

    return () => {
      window.removeEventListener("scroll", windowScrollY)
    }
  }, [])

  return (
    <main>
      <nav className="w-full py-3 px-2 md:px-0 flex items-center justify-evenly bg-white fixed top-0 z-30">
        <Link href={"/"}>
          <h1 className={`${itim.className} text-3xl`}><span className="hidden md:block">Memorify</span><span className="md:hidden">Mfy</span></h1>
        </Link>
        <div className="w-48 md:w-[410px] flex items-center justify-between">
          <Link href={"/beranda"}>
            <h6 className={`${jetBrains.className} text-lg opacity-90 hover:opacity-70`}>Beranda</h6>
          </Link>
          <Link className="hidden md:block" href={"/kategori"}>
            <h6 className={`${jetBrains.className} text-lg opacity-90 hover:opacity-70`}>Kategori</h6>
          </Link>
          <button onClick={() => setHideContent(false)} className="px-5 py-1 skeleton bg-pink-500 hover:bg-opacity-70 text-white text-opacity-90 rounded-md" fdprocessedid="">Masuk</button>
        </div>
      </nav>
      <div className="w-full h-auto md:h-[77vh] lg:h-screen py-5 md:py-0 flex items-center justify-center relative">
        <div className="w-full h-full absolute top-0 hidden md:block">
          <div className="w-full h-5 bg-pink-300 absolute bottom-0"></div>
          <div ref={container1} className="md:w-[40%] lg:w-[25%] h-32 hidden md:block absolute md:left-[10%] lg:left-[25%] -bottom-12 bg-pink-300">
            <div className="w-14 h-14 absolute -top-2 -left-2 bg-white rounded-full"></div>
            <div className="w-14 h-14 absolute -top-2 -right-2 bg-white">
              <div className="w-24 h-10 bg-white absolute -left-10 -top-2 rounded-full"></div>
            </div>
            <div className="w-14 h-14 bg-pink-300 absolute -top-5 left-[20%]"></div>
          </div>
          <div ref={container2} className="md:w-[40%] lg:w-[25%] h-32 hidden md:block absolute right-[10%] lg:right-[25%] -bottom-12 bg-pink-300">
            <div className="w-14 h-14 absolute -top-2 -right-2 bg-white rounded-full"></div>
            <div className="w-14 h-14 absolute -top-2 -left-2 bg-white">
              <div className="w-24 h-10 bg-white absolute -right-10 -top-2 rounded-full"></div>
            </div>
            <div className="w-14 h-14 bg-pink-300 absolute -top-5 right-[20%]"></div>
          </div>
          {imageContent.map((src, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className={`h-40 absolute ${index % 2 === 0 ? 'rounded-e-2xl' : 'rounded-s-2xl'} rounded-e-2xl overflow-hidden ${index === 0 ? 'md:w-80 lg:w-[440px] top-[10%] left-0' : index === 1 ? 'md:w-80 lg:w-[440px] top-[10%] right-0' : index === 2 ? 'md:w-[340px] lg:w-96 md:top-[35%] lg:top-[40%] left-0' : index === 3 ? 'md:w-[340px] lg:w-96 md:top-[35%] lg:top-[40%] right-0' : index === 4 ? 'w-80 md:top-[60%] lg:top-[70%] left-0' : 'w-80 md:top-[60%] lg:top-[70%] right-0'}`}
            >
              <Image className="w-full h-full object-cover" src={src} alt={`Anime ${index}`} width={500} height={500} />
              <div className={`w-full h-full ${index % 2 === 0 ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-white from-20% absolute top-0`}></div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-3/4 lg:w-2/4 px-3 mt-10 md:mt-0 flex flex-col items-center relative">
          <h1 className={`text-center text-5xl tracking-wide opacity-90 text-pink-300 ${itim.className} animateTextScreen1`}>Memorify</h1>
          <h1 className={`text-center text-4xl md:text-5xl tracking-wide opacity-90 ${itim.className} animateTextScreen1 text-shadow`}>Bersiaplah untuk Memanjakan Mata Anda dengan Galeri Kami yang Menggugah Nafsu.</h1>
          <button onClick={() => router.push("/beranda")} className="px-5 md:px-9 py-1 mt-12 bg-pink-500 hover:bg-opacity-70 text-white text-opacity-90 rounded-md" fdprocessedid="">Jelajahi</button>
        </div>
      </div>
      <div className="w-full h-auto min-h-[60vh] md:h-[60vh] lg:h-screen py-5 md:py-0 flex relative bg-pink-300 overflow-hidden">
        <div className="w-2/4 h-44 hidden md:block bg-white absolute -bottom-3 left-0 clipth"></div>
        <div className="w-full md:w-2/4 h-full px-1 flex items-center justify-center absolute md:relative z-10">
          <h1 className={`mb-5 text-center text-4xl md:text-5xl tracking-wide opacity-90 text-white ${itim.className}`}>Jangan Simpan Sendiri, Bagikan Kecantikan Karyamu dengan Mengunggah Foto!</h1>
        </div>
        <div className="w-full md:w-2/4 flex md:block h-full py-10 md:py-10 relative left-0">
          <div className="w-60 h-auto absolute top-[10%] left-[35%] hidden lg:block">
            <Image className="w-full rounded-2xl" src={"https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2F11abe9eb-09f1-426f-a3a9-a1406e0e488e.jpg?alt=media&token=488bcd70-91e3-4cd2-8694-2c8b86f059d0"} alt="image" width={500} height={500} />
          </div>
          <div ref={image1} className="w-32 md:w-44 h-auto relative md:absolute top-16 md:top-[40%] lg:top-[50%] left-[60%] md:left-[65%] lg:left-[76%]">
            <Image className="w-full rounded-2xl brightness-50 md:brightness-100" src={"https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fa771e4fa-d7e7-4123-84fa-4c0d3bdde780.jpg?alt=media&token=eafdb529-3927-491f-a470-0a15851cc801"} alt="image" width={500} height={500} />
          </div>
          <div ref={image2} className="w-40 md:w-56 h-auto relative md:absolute -top-[85%] lg:top-[5%] -left-[40%] md:left-0">
            <Image className="w-full rounded-2xl brightness-50 md:brightness-100" src={"https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2Fb83d4da7-1911-49bc-bb52-94b403efebf4.jpg?alt=media&token=c6c193b4-c9e6-4343-98ff-bcb955d7f180"} alt="image" width={500} height={500} />
          </div>
        </div>
      </div>
      <div className="w-full h-auto md:h-[60vh] lg:h-screen py-5 md:py-0 flex flex-col md:flex-row">
        <div className="w-full md:w-2/4 h-auto md:h-full px-3 md:px-0 mt-5 md:mt-0 hidden md:block gap-x-3 relative">
          <Link href={"/kategori/Pantai"}>
            <div className="group w-full md:w-44 h-20 md:h-auto flex items-center justify-center md:absolute bottom-[10%] md:left-5 lg:left-10">
              <Image className="w-full rounded-2xl brightness-50 group-hover:brightness-100" src={"https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2F80ad41b4-94c1-4968-b274-81f23d4a6488.jpg?alt=media&token=6f7be523-cda7-4d17-a9d2-006964e71b5d"} alt="image" width={500} height={500} />
              <div className="absolute">
                <h1 className={`${jetBrains.className} text-2xl text-white opacity-90`}>Pantai</h1>
              </div>
            </div>
          </Link>
          <Link className="hidden lg:block" href={"/kategori/Air Terjun"}>
            <div className="group w-52 h-auto flex items-center justify-center md:absolute top-[23%] right-16">
              <Image className="w-full rounded-2xl brightness-50 group-hover:brightness-100" src={"https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2FAir-Terjun-Dua-Warna.jpg?alt=media&token=3012a49a-496a-4265-9820-0b66d7e96993"} alt="image" width={500} height={500} />
              <div className="absolute">
                <h1 className={`${jetBrains.className} text-2xl text-white opacity-90`}>Air Terjun</h1>
              </div>
            </div>
          </Link>
          <Link href={"/kategori/Anime"}>
            <div className="group w-full md:w-52 h-20 md:h-auto flex items-center justify-center absolute top-[15%] md:left-[45%] lg:left-[30%]">
              <Image className="w-full rounded-2xl brightness-50 group-hover:brightness-100" src={"https://firebasestorage.googleapis.com/v0/b/galery-foto.appspot.com/o/images%2F47d50ae4d1b3b5b17c2c7349c84c2c72.jpg?alt=media&token=a395573c-4d1a-4df2-8e69-869a0bdacd02"} alt="image" width={500} height={500} />
              <div className="absolute">
                <h1 className={`${jetBrains.className} text-2xl text-white opacity-90`}>Anime</h1>
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full md:w-2/4 h-full flex items-center justify-center">
          <h1 className={`text-center text-4xl md:text-5xl tracking-wide opacity-90 ${itim.className}`}>Hati-Hati Setiap Saat Anda Mengklik Photo Akan Menggungah Nafsu.</h1>
        </div>
      </div>
      <Login hideContent={hideContent} setHideContent={setHideContent} />
      <Footer />
    </main>
  )
}

export default Page