import { addData, getData, saveImage, updateData } from "@/libs/firebase/service";
import { Timestamp } from "firebase/firestore";
import { NextResponse as res } from "next/server";

export const GET = async (request) => {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
        try {
            const user = await getData("user")
            const userById = user.find(person => person.id == id)
            if (userById.length !== 0) {
                return res.json({status: 200, message: "data berhasil ditemukan", data: userById})
            }
        } catch (error) {
            return res.json({status: 404, message: "error data tidak ditemukan", data: null})
        }
    } else {
        try {
            const user = await getData("user")
            return res.json({status: 200, message: "data berhasil ditemukan", data: user})
        } catch (error) {
            return res.json({status: 200, message: "error data tidak ditemukan", data: null})
        }
    }
}

export const POST = async (request) => {
    const data = await request.json()
    const name = data.name
    const username = data.username
    const password = data.password
    const image = data.image
    const role = data.role

    try {
        const dataUser = {
            name: name,
            username: username,
            password: password,
            image: image,
            role: role,
            createAt: Timestamp.now()
        }
        const id = await addData("user", dataUser)
        return res.json({status: 200, message: `data berhasil ditambahkan dengan id ${id}`})
    } catch (error) {
        return res.json({status: 500, message: "error data tidak berhasil ditambahkan"})
    }
}


export const PUT = async (request) => {
    const formData = await request.formData()
    const idUser = formData.get("id")
    const name = formData.get("name")
    const image = formData.get("image")

    if (typeof image == 'object') {
        try {
            const imageUrl = await saveImage(image)
            const data = {
                name: name,
                image: imageUrl
            }
            const id = await updateData("user", idUser, data)
            return res.json({
                status: 200,
                message: `data berhasil diperbarui`
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: `error data tidak perbarui`
            })
        }
    } else {
        try {
            const data = {
                name: name
                        }
            const id = await updateData("user", idUser, data)
            return res.json({
                status: 200,
                message: `data berhasil diperbarui`
            })
        } catch (error) {
            return res.json({
                status: 500,
                message: `error data tidak perbarui`
            })
        }
    }
}