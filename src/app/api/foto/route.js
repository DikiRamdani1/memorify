import {
    addData,
    getData,
    saveImage
} from "@/libs/firebase/service"
import {
    Timestamp
} from "firebase/firestore"
import {
    NextResponse as res
} from "next/server"
export const GET = async (request) => {
    const {
        searchParams
    } = new URL(request.url)
    const id = searchParams.get("id")
    const userId = searchParams.get("userId")
    const title = searchParams.get("title")
    const category = searchParams.get("category")

    if (id) {
        try {
            const foto = await getData("foto")
            const fotoById = foto.find(item => item.id == id)
            if (fotoById.length !== 0) {
                return res.json({
                    status: 200,
                    message: "data berhasil ditemukan",
                    data: fotoById
                })
            }
            return res.json({
                status: 404,
                message: "error data tidak ditemukan",
                data: null
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: "error data tidak ditemukan",
                data: null
            })
        }
    } else if (userId) {
        console.log(userId)
        try {
            const foto = await getData("foto")
            const fotoByUserId = foto.filter(item => item.userId.includes(userId))
            if (fotoByUserId.length !== 0) {
                return res.json({
                    status: 200,
                    message: "data berhasil ditemukan",
                    data: fotoByUserId
                })
            }
            return res.json({
                status: 404,
                message: "error data tidak ditemukan",
                data: null
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: "error data tidak ditemukan",
                data: null
            })
        }
    } else if (title) {
        try {
            const foto = await getData("foto")
            const fotoByTitle = foto.filter(item => item.title.toLowerCase().includes(title.toLowerCase()))
            if (fotoByTitle.length !== 0) {
                return res.json({
                    status: 200,
                    message: "data berhasil ditemukan",
                    data: fotoByTitle
                })
            }
            return res.json({
                status: 404,
                message: "error data tidak ditemukan",
                data: null
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: "error data tidak ditemukan",
                data: null
            })
        }
    } else if (category) {
        try {
            const foto = await getData("foto")
            const fotoByCategory = foto.filter(item => item.category.toLowerCase().includes(category.toLowerCase()))
            if (fotoByCategory.length !== 0) {
                return res.json({
                    status: 200,
                    message: "data berhasil ditemukan",
                    data: fotoByCategory
                })
            }
            return res.json({
                status: 404,
                message: "error data tidak ditemukan",
                data: null
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: "error data tidak ditemukan",
                data: null
            })
        }
    } else {
        try {
            const foto = await getData("foto")
            return res.json({
                status: 200,
                message: "data berhasil ditemukan",
                data: foto
            })
        } catch (error) {
            return res.json({
                status: 200,
                message: "error data tidak ditemukan",
                data: null
            })
        }
    }
}

export const POST = async (request) => {
    const formData = await request.formData()
    const title = formData.get("title")
    const image = formData.get("image")
    const kategori = formData.get("category")
    const userId = formData.get("userId")
    const kategoriLowerCase = kategori.toLowerCase()
    const category = kategoriLowerCase.split(",")

    try {
        const imageUrl = await saveImage(image)
        const data = {
            title: title,
            image: imageUrl,
            category: category,
            userId: userId,
            createAt: Timestamp.now()
        }
        const id = await addData("foto", data)
        return res.json({
            status: 200,
            message: `data berhasil ditambahkan dengan id ${id}`
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: `error data tidak berhasil ditambahkan`
        })
    }
}
