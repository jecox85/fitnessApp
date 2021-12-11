// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, query, where, updateDoc, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyC7R_aMW6FCYxcWOmU_1RNaWB5aqJwAyPM",
authDomain: "fitness-app-35745.firebaseapp.com",
projectId: "fitness-app-35745",
storageBucket: "fitness-app-35745.appspot.com",
messagingSenderId: "111468032003",
appId: "1:111468032003:web:1acf8f1fb184231f5f5e36",
measurementId: "${config.measurementId}"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

enableIndexedDbPersistence (db).catch((err)=>{
    if(err.code == 'failed-precondition'){
        //multiple tabs open, persistence can only be enabled 
        //in one tab at a time
        console.log('Persistence failed.');
    }
    else if(err.code == 'unimplemented'){
        // The current browser does not support all fo the
        // features required to oenable persistence
        console.log('Persistence is not valid.')
    }
});