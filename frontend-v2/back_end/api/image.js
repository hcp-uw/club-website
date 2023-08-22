import { ref, getDownloadURL } from "firebase/storage"
import { storage } from "../utils/index.js"
import { test } from "node:test"

export const getURL = (namespace, fileName) => {
    const storageRef = ref(storage, `${namespace}/${fileName}`)
    return getDownloadURL(storageRef)
        .then((url) => {
            // console.log(url)
            return url
        }).catch((error) => {
            console.log(error)
            return error
        });
}

export const getEventImgURL = async (fileName) => {
    return await getURL("Event_Photos", fileName)
}

export const getLeadsImgURL = async (fileName) => {
    return await getURL("Leads_Photos", fileName)
}

export const getLogoImgURL = async (fileName) => {
    return await getURL("Logos", fileName)
}


const uploadImage = async (namespace, filename, file) => { 
    const storageRef = ref(storage, `${namespace}/${filename}`)
    await uploadBytes(storageRef, file)
    return await getURL(namespace, filename)
}

export const uploadEventImg = async (filename, file) => {
    return await uploadImage("Event_Photos", filename, file)
}

export const uploadLeadsImg = async (filename, file) => {
    return await uploadImage("Leads_Photos", filename, file)
}

export const uploadLogoImg = async (filename, file) => {
    return await uploadImage("Logos", filename, file)
}

