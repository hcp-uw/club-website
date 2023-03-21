//  connect to the firebase thing here brother

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// I think we need to import the data base that we are actually going to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDg_d3B6Yplw_M2qMoZQ6Jtymd_dW5k79Q",
    authDomain: "husky-coding-project.firebaseapp.com",
    databaseURL: "https://husky-coding-project-default-rtdb.firebaseio.com",
    projectId: "husky-coding-project",
    storageBucket: "husky-coding-project.appspot.com",
    messagingSenderId: "123708771040",
    appId: "1:123708771040:web:2e76f3762cef2eba669e85",
    measurementId: "G-NDX314ZCVW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
