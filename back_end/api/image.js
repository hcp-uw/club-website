import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../utils/index.js";

export async function getURL(namespace, fileName) {
    const storageRef = ref(storage, `${namespace}/${fileName}`);
    return getDownloadURL(storageRef)
        .then((url) => {
            // console.log(url)
            return url;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
}

export async function getEventImgURL(fileName) {
    return await getURL("Event_Photos", fileName);
}

export async function getLeadsImgURL(fileName) {
    return await getURL("Leads_Photos", fileName);
}

export async function getLogoImgURL(fileName) {
    return await getURL("Logos", fileName);
}

async function uploadImage(namespace, filename, file) {
    console.log(`uploading ${filename} to ${namespace}`);
    const storageRef = ref(storage, `${namespace}/${filename}`);
    await uploadBytes(storageRef, file);
    return await getURL(namespace, filename);
}

export async function uploadEventImg(filename, file) {
    return await uploadImage("Event_Photos", filename, file);
}

export async function uploadLeadsImg(filename, file) {
    return await uploadImage("Leads_Photos", filename, file);
}

export async function uploadLogoImg(filename, file) {
    return await uploadImage("Logos", filename, file);
}
