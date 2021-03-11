import React,{useState} from 'react';
import {Avatar} from '@material-ui/core';
import "./SidebarChat.css";
import "./Chat.css";
import axios from "./axios";
import {Link} from "react-router-dom";

function SidebarChat({addNewChat,rooms,messages}){
const[room,setRoom]=useState("");

const sendMessage= async (e)=>{
e.preventDefault();
if(room===""){
  alert("Please enter a valid Room");
}
else{
await axios.post("/rooms/new",{
  roomname:room
});
}
setRoom("");
};



  return !addNewChat ?(
     <div>
     {rooms.map((room)=>(
       <Link to={`/rooms/${room._id}`}>
       <div className="sidebarChat">
          <Avatar src="/image1.jpg"/>
        <div className="sidebarChat__info">
       <h2>{room.roomname}</h2>
       {(messages||[]).filter(message => message.roomid=== room._id).slice(0,1).map((message)=>(

        <p>{message.message}</p>

      ))}
        </div>
        </div>
      </Link>
  ))};
  </div>

  ):(
    <div className="sidebarChatAdd">
    <h2>Add New Chat</h2>
    <div className="sidebarChat__add">
    <form>
      <input value={room} onChange={(e)=>setRoom(e.target.value)} placeholder="Add New Chat" type="text"/>
      <button onClick={sendMessage} type="submit">send</button>
   </form>
   </div>
    </div>
  );
}

export default SidebarChat;
