import React from "react";
import "./LeftSideBar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../config/fireBase";
const LeftsideBar = () => {


  const navigate=useNavigate()
  const inputHandler=async(e)=>{
    try {
      const input=e.target.value;
      const userref=collection(db,'users');
      const q=query(userref,where("username","==",input.toLowerCase()));
      const querySnapshot=await getDocs(q);
      if(!querySnapshot.empty){
        console.log(querySnapshot.docs[0].data())
      }else console.log("NOt found")
    } catch (error) {
      
    }
  }

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={()=>navigate('/profile')}>Edit profile</p>
              <hr />
              <p>LogOut</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
            <img src={assets.search_icon} alt="" />
            <input onChange={inputHandler} type="text" placeholder="Search Here" />
        </div>
      </div>
      <div className="ls-list">
        {Array(12).fill("").map((item,index)=>(
                  <div key={index} className="friends">
                  <img src={assets.profile_img} alt="" />
                  <div>
                      <p>Madan Mohan</p>
                      <span>Hello How are you</span>
                  </div>
              </div>
        ))}
      </div>
    </div>
  );
};

export default LeftsideBar;
