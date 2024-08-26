import React, { useEffect, useState } from 'react'
import './ProfileUpdate.css'
import assets from "../../assets/assets";
import { onAuthStateChanged } from 'firebase/auth';
import { auth ,db} from '../../config/fireBase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileUpdate = () => {

  const navigate=useNavigate();


  const [image ,setImage]=useState(false)
  const [name,setName]=useState("")
  const [bio,setBio]=useState("")
  const [uid,setUid]=useState("")
  const [prevImage,setPrevImage]=useState("")

  const profileUpdate=async(event)=>{
    event.preventDefault();
    try {
      if(!prevImage && !image){ toast.error("Please select an image") }
      const docRef=doc(db,"users",uid)

      if(image){}
      else{}

    } catch (error) {
      
    }
  }

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        setUid(user.uid)
        const docRef=doc(db,"users",user.uid)
        const docSnap=getDoc(docRef)
        if((await docSnap).data().name){
          setName((await docSnap).data().name)
        }
        if((await docSnap).data().bio){
          setName((await docSnap).data().bio)
      }
        if((await docSnap).data().avatar){
          setPrevImage((await docSnap).data().avatar)
      }
    }
    else{
      navigate('/')
    }
  })
  })



  return (
    <div className='profile'>
      <div className="profile-container">
        <form action="" onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" name="" id="avatar" accept='.png,.jpg,.jpeg' hidden/>
            <img src={image?URL.createObjectURL(image):assets.avatar_icon} alt="" />
            upload profile image
          </label>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Your Name' required />
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} placeholder='Write Profile Bio'></textarea>
          <button type='submit'>save</button>
        </form>
        <img className='profile-pic' src={image?URL.createObjectURL(image):assets.logo_icon} alt="" />
      </div>

    </div>
  )
}

export default ProfileUpdate