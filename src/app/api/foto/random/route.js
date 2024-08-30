import {
    getData,
} from "@/libs/firebase/service"
import _ from "lodash"
import {
    NextResponse as res
} from "next/server"
export const GET = async (request) => {
    const {
        searchParams
    } = new URL(request.url)
    const category = searchParams.get("category")

    if (category) {
        try {
            const categoryLowerCase = category.toLocaleLowerCase()
            const categoryHidePersen = categoryLowerCase.replace("%20", " ")
            const category_ = categoryHidePersen.split(",")
            const foto = await getData("foto")
            const fotoByCategory = foto.filter(item => category_.every(categoryFoto => item.category.includes(categoryFoto)))
            if (fotoByCategory.length !== 0) {
                const shuffleData = _.shuffle(fotoByCategory)
                return res.json({
                    status: 200,
                    message: "data berhasil ditemukan",
                    data: shuffleData
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
            const shuffleData = _.shuffle(foto)
            return res.json({
                status: 200,
                message: "data berhasil ditemukan",
                data: shuffleData
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