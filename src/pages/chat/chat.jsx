import React from 'react'
import './chat.css'
import LeftsideBar from '../../components/leftSideBar/LeftsideBar'
import ChatBox from '../../components/chatBox/chatBox'
import RightSideBar from '../../components/rightSideBar/RightSideBar'

const Chat = () => {
  return (
    <div className='chat'>
      <div className='chat-container'>
        <LeftsideBar/>
        <ChatBox/>
        <RightSideBar/>
      </div>
    </div>
  )
}

export default Chat