 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 function init_fb(){
    const firebaseConfig = {
        apiKey: "AIzaSyC4ai92_qG_9CEaWXE5zlze6o3Bynnwe98",
        authDomain: "webqbleague.firebaseapp.com",
        projectId: "webqbleague",
        storageBucket: "webqbleague.appspot.com",
        messagingSenderId: "948299149641",
        appId: "1:948299149641:web:db87c911f47a3ba870aa98",
        measurementId: "G-M1ZWXS80J3"
      };
      const app = initializeApp(firebaseConfig);

 }
 // Initialize Firebase
 
 function create_user(email,pass) {
    console.log('here')
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,email,pass).then((u_cred) => {
        console.log(u_cred)
    }).catch((error) => {
        console.log(error)
    })
 }

 function valid_input(email,pass) {
    return true;
 }

 export {init_fb,create_user,valid_input}