 // Import the functions you need from the SDKs you need
 import { initializeApp } from "firebase/app";
 import { getAuth} from "firebase/auth";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
 class auth {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyC4ai92_qG_9CEaWXE5zlze6o3Bynnwe98",
            authDomain: "webqbleague.firebaseapp.com",
            projectId: "webqbleague",
            storageBucket: "webqbleague.appspot.com",
            messagingSenderId: "948299149641",
            appId: "1:948299149641:web:db87c911f47a3ba870aa98",
            measurementId: "G-M1ZWXS80J3"
        };
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth();

        this.user = this.auth.onAuthStateChanged((user) => {
            if(user){
                return user.email;
            }
        })
    }

    create_user(email,pass) {
        console.log('here')
        const promise = this.auth.createUserWithEmailAndPassword(email,pass).then((u_cred) => {
        console.log(u_cred)}).catch((error) => {
            console.log(error)
        })
    }

    sign_in(email,pass) {
        const promise = this.auth.signInWithEmailAndPassword(email,pass);
        promise.then((d)=> {

    }).catch((err)=> {alert(err)})
    }

    sign_out() {
        this.auth.signOut();
    }


 }


 function valid_input(email,pass) {
    return true;
 }

 export {auth}