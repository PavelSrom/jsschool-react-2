import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDlMdn0WEH0xhf0mXHLvv5myDhvYQ6yxAs",
  authDomain: "fir-react-b5c47.firebaseapp.com",
  projectId: "fir-react-b5c47",
  storageBucket: "fir-react-b5c47.appspot.com",
  messagingSenderId: "946344497163",
  appId: "1:946344497163:web:62e89f25c3949679cd370e",
  measurementId: "G-267VMRT1FP",
} as const

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export const auth = firebase.auth()
// export const storage = firebase.storage()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp
