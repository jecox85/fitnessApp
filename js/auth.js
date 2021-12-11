import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signOut, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
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
    const auth = getAuth(app);

    //listen for auth status changes
    onAuthStateChanged(auth, (user) =>{
        if(user){
            console.log("User logged in: ", user.email);
            setupUI(user);
            const form = document.querySelector("form");
            form.addEventListener('submit', (event) => {
                event.preventDefault();
            })
        }
        else {
            console.log("User logged out")
            setupUI();
        }
    })

    //signup
    const signupForm = document.querySelector("#signup-form");
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        //get user info
        const email = signupForm["signup-email"].value;
        const password = signupForm["signup-password"].value;
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) =>{
            //signed in
            const user = userCredential.user;
            console.log(user);
            const modal = document.querySelector("#modal-signup");
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

        });
    });


    //logout
    const logout = document.querySelector("#logout");
    logout.addEventListener("click", (e) =>{
        e.preventDefault();
        signOut(auth).then(() =>{
            console.log("User has signed out.");
        }).catch((error) =>{
            //error handler
            console.log("An error happened logging out.")
        })
    })

    //login
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();        
        const email = loginForm["login-email"].value;
        const password = loginForm["login-password"].value;
        signInWithEmailAndPassword(auth, email, password).then((userCredential) =>{
            //signed in
            const user = userCredential.user;
            console.log(user);
            const modal = document.querySelector("#modal-signup");
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

        });
    })