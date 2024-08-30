import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore, orderBy, query, updateDoc, where} from "firebase/firestore"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import app from "./db"

const db = getFirestore(app)
const storage = getStorage(app)

export const getData = async (collectionName) => {
    const snapshot = await getDocs(collection(db, collectionName))
    const data = []
    snapshot.forEach((doc) => {
        data.push(doc.data())
    })
    return data
}

export const getDataByUserId= async (collectionName, userId) => {
        const q = query(collection(db, collectionName), where("id", "==", userId))
    const snapshot = await getDocs(q)
    const data = []
    snapshot.forEach((doc) => {
        data.push(doc.data())
    })
    return data
}

export const getDataByFotoId = async (collectionName, fotoId) => {
        const q = query(collection(db, collectionName), where("id", "==", fotoId))
    const snapshot = await getDocs(q)
    const data = []
    snapshot.forEach((doc) => {
        data.push(doc.data())
    })
    return data
}

export const getDataNew = async (collectionName) => {
    const q = query(collection(db, collectionName), orderBy("createAt", "desc"))
    const snapshot = await getDocs(q)
    const data = []
    snapshot.forEach((doc) => {
        data.push(doc.data())
    })
    return data
}

export const addData = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), data)
        await updateDoc(docRef, {
            id: docRef.id
        })
        return docRef.id
    } catch (error) {
        return res.json({status: 500, message: "data gagal ditambahkan"})
    }
}

export const updateData = async (collectionName, id, data) => {
    try {
        const docRef = doc(db, collectionName, id)
        await updateDoc(docRef, data)
        return docRef
    } catch (error) {
        return res.json({status: 500, message: "data gagal diperbarui", data: null})
    }
}

export const deleteData = async (collectionName, id) => {
    try {
        const docRef = doc(db, collectionName, id)
        await deleteDoc(docRef)
    
        return docRef
    } catch (error) {
        return res.json({status: 500, message: "data gagal dihapus", data: null})
    }
}

export const saveImage = async (image) => {
    const storageRef = ref(storage, `images/${image.name}`)
    const snapshot = await uploadBytes(storageRef, image)
    const imageUrl = await getDownloadURL(snapshot.ref)
    return imageUrl
}