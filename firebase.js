import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyAfLnqnWfd2aLmmKmHC2VfXGOTpATM6FQo",
	authDomain: "estiam-e5.firebaseapp.com",
	projectId: "estiam-e5",
	storageBucket: "estiam-e5.appspot.com",
	messagingSenderId: "649242832061",
	appId: "1:649242832061:web:7b1e6023ea85d343fb1bd4",
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const fireDB = app.firestore()
const auth = app.auth()
firebase.firestore().settings({ experimentalForceLongPolling: true })
export { app, fireDB, auth }
