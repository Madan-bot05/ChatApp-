// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCW8rNWUx7wfLSTl61T20u-jZee1o1t314",
  authDomain: "chat-app-7f512.firebaseapp.com",
  projectId: "chat-app-7f512",
  storageBucket: "chat-app-7f512.appspot.com",
  messagingSenderId: "849449284234",
  appId: "1:849449284234:web:0347953d09ff21d4447373"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const db=getFirestore(app)

const signUp=async(username,email,password)=>{
    try {
        const response=await createUserWithEmailAndPassword(auth,email,password)
        const user=response.user
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Helllo new User",
            lastSeen:Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatData:[]
        })
        toast.success
    } catch (error) {
        console.log(error)
        toast.error(error.code);
    }
}

const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
        toast.success("Login sucessfull")
    } catch (error) {
        console.log(error);
        toast.error(error.code)
    }
}

const logout=async()=>{
    try {
        await signOut(auth)
        toast.success("Logged Out")
    } catch (error) {
        // toast.error(error.code)
    }
    
}

export {signUp,login,logout,auth,db}