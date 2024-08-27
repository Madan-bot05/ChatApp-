import React from "react";
import "./LeftSideBar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
const LeftsideBar = () => {


  const navigate=useNavigate()

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
            <input type="text" placeholder="Search Here" />
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
