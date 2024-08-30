import {
    NextResponse as res
} from "next/server"
import {
    addData,
    deleteData,
    getData,
    getDataByFotoId
} from "@/libs/firebase/service"

const getFoto = async (fotoIds) => {
    const fotos = []
    const foto = fotoIds.map(async (id) => {
        const foto = await getDataByFotoId("foto", id)
        fotos.push(foto[0])
    })

    await Promise.all(foto)

    return fotos
}

export const GET = async (request) => {
    const {
        searchParams
    } = new URL(request.url)
    const fotoId = searchParams.get("fotoId")
    const userId = searchParams.get("userId")

    try {
        const like = await getData("like")

        if (userId && fotoId) {
            const likeFoto = like.find(item => item.fotoId == fotoId && item.userId == userId)
            if (likeFoto.length !== 0) {
                return res.json({
                    status: 200,
                    message: "data berhasil ditemukan",
                    data: likeFoto
                })
            }
        } else if (userId) {
            const likeFoto = like.filter(item => item.userId.includes(userId))
            if (likeFoto.length !== 0) {
                const fotoIds = likeFoto.map(foto => foto.fotoId)
                const foto = await getFoto(fotoIds)
                return res.json({
                    status: 200,
                    message: "data berhasil ditemukan",
                    data: foto
                })
            }
            return res.json({status: 404, message: "data tidak ditemukan", data: null})
        } else {
            return res.json({
                status: 200,
                message: "data berhasil ditemukan",
                data: like
            })
        }
    } catch (error) {
        return res.json({
            status: 500,
            message: "data tidak ditemukan",
            data: null
        })
    }
}

export const POST = async (request) => {
    const data = await request.json()
    const fotoId = data.fotoId
    const userId = data.userId

    try {
        const data = {
            fotoId: fotoId,
            userId: userId
        }

        const id = await addData("like", data)
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

export const DELETE = async (request) => {
    const data = await request.json()
    const idLike = data.id

    try {
        const id = await deleteData("like", idLike)
        return res.json({
            status: 200,
            message: `data berhasil dihapus`
        })
    } catch (error) {
        return res.json({
            status: 500,
            message: "data gagal dihapus"
        })
    }
}