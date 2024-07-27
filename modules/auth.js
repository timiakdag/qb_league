 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries
 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js';
 import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from 'https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js';
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
        this.app = initializeApp(this.firebaseConfig);
        this.auth = getAuth();

        this.user = this.auth.onAuthStateChanged((user) => {
            if(user){
                return user.email;
            }
        })
    }

    create_user(email,pass) {
        const promise = createUserWithEmailAndPassword(this.auth,email,pass).then((u_cred) => {
        return u_cred;}
        ).catch((error) => {return "ERR: Unable to register."});
    }

    sign_in(email,pass) {
        const promise = signInWithEmailAndPassword(this.auth,email,pass);
        promise.then((d)=> {
            return d;
        }).catch((err)=> {return "ERR: Unable to signin."})}

    sign_out() {
        signOut(this.auth);
    }
 }

 export {auth}