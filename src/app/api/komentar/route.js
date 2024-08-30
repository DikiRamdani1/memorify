import {
    addData,
    getDataByUserId,
    getDataNew
} from "@/libs/firebase/service";
import { Timestamp } from "firebase/firestore";
import {
    NextResponse as res
} from "next/server";

const getUser = async (userIds) => {
    const users = []
    const user = userIds.map(async (id) => {
        const user = await getDataByUserId("user", id)
        users.push(user[0])
    })

    await Promise.all(user)

    return users
}

export const GET = async (request) => {
    const {
        searchParams
    } = new URL(request.url)
    const fotoId = searchParams.get("fotoId")

    if (fotoId) {
        try {
            const komentar = await getDataNew("komentar")
            const komentarByFotoId = komentar.filter(item => item.fotoId.includes(fotoId))
            if (komentarByFotoId.length !== 0) {
                const userIds = komentar.map(komen => komen.userId)
                const users = await getUser(userIds)

                const resultKomen = komentar.map(komen => {
                    const user = users.find(person => person.id == komen.userId)
                    return {
                        id: komen.id,
                        fotoId: komen.fotoId,
                        komentar: komen.text,
                        createAt: komen.createAt,
                        user: {
                            userId: user.id,
                            name: user.name,
                            image: user.image
                        }
                    }
                })

                const result = resultKomen.filter(komen => komen.fotoId == fotoId)
                return res.json({
                    status: 200,
                    message: "data berhasil ditemukan",
                    data: result
                })
            }
            return res.json({status: 404, message: "error data tidak ditemukan", data: komentarByFotoId})

        } catch (error) {
            return res.json({
                status: 404,
                message: "error data tidak ditemukan",
                data: null
            })
        }
    }
}

export const POST = async (request) => {
    const data = await request.json()
    const userId = data.userId
    const fotoId = data.fotoId
    const text = data.text

    try {
        const data = {
            userId: userId,
            fotoId: fotoId,
            text: text,
            createAt: Timestamp.now()
        }

        const id = await addData("komentar", data)

        return res.json({status: 200, message: `data berhasil ditambahkan dengan id ${id}`})
    } catch (error) {
        return res.json({status: 500, message: "error data tidak berhasil ditambahkan"})
    }
}