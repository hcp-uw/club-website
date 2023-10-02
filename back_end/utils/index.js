//  connect to the firebase thing here brother

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// I think we need to import the data base that we are actually going to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFvOVD36DfTacwfUEyrxuyVJ9_tf9bex0",
    authDomain: "hcp-uw.firebaseapp.com",
    databaseURL: "https://hcp-uw-default-rtdb.firebaseio.com",
    projectId: "hcp-uw",
    storageBucket: "hcp-uw.appspot.com",
    messagingSenderId: "1012987895192",
    appId: "1:1012987895192:web:6284c3d1c6ac5b2cba1fed",
    measurementId: "G-CQH2DNFB1T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const database = getDatabase(app);
export const auth = getAuth(app);