import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

class store {
    constructor (){
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
        this.db = getFirestore(app);
    }

    async get_teams() {
        const teams = collection(this.db, 'teams');
        const teams_snap = await getDocs(teams);
        const teams_list = teams_snap.docs.map(doc => doc.data());
        return teams_list;
    }

    async get_standings() {
        const standings = collection(this.db, 'standings');
        const stand_snap = await getDocs(standings);
        const stand_list = stand_snap.docs.map(doc => doc.data());
        return stand_list;
    }

    async get_cur_qbs() {
        const qbs = collection(db, 'qbs');
        const qbs_snap = await getDocs(qbs);
        const qbs_list = qbs_snap.docs.map(doc => doc.data());
        return qbs_list;
    }

}