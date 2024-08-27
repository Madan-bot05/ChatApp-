import React, { useContext, useEffect, useState } from 'react'
import './ProfileUpdate.css'
import assets from "../../assets/assets";
import { onAuthStateChanged } from 'firebase/auth';
import { auth ,db} from '../../config/fireBase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {

  const navigate=useNavigate();


  const [image ,setImage]=useState(false)
  const [name,setName]=useState("")
  const [bio,setBio]=useState("")
  const [uid,setUid]=useState("")
  const [prevImage,setPrevImage]=useState("")
  const {setUserData}=useContext(AppContext)

  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (!prevImage && !image) {
        toast.error("Please select an image");
        return; // Prevent further execution
      }
  
      const docRef = doc(db, "users", uid);
  
      if (image) {
        const imgUrl = await upload(image);
        setPrevImage(imgUrl);
        await updateDoc(docRef, {
          avatar: imgUrl,
          bio: bio,
          name: name,
        });
      } else {
        await updateDoc(docRef, {
          bio: bio,
          name: name,
        });
      }
      const snap=await getDoc(docRef)
      setUserData(snap.data());
      navigate('/chat')
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.name) {
            setName(data.name);
          }
          if (data.bio) {
            setBio(data.bio);  // Set bio instead of name
          }
          if (data.avatar) {
            setPrevImage(data.avatar);
          }
        }
      } else {
        navigate('/');
      }
    });
  
    return () => unsubscribe();
  }, [auth, navigate]);
  



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
        <img className='profile-pic' src={image?URL.createObjectURL(image):prevImage? prevImage:assets.logo_icon} alt="" />
      </div>

    </div>
  )
}

export default ProfileUpdate