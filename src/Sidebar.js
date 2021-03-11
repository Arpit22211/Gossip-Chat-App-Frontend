import React,{useEffect,useState} from 'react';
import "./Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Avatar,IconButton} from '@material-ui/core';
import {SearchOutlined} from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import Pusher from "pusher-js";
import axios from "./axios";
import {useStateValue} from "./StateProvider";

function Sidebar({messages}){
const [{user},dispatch]=useStateValue();
const[rooms,setRooms]= useState([]);
useEffect(()=>{
   axios.get('/rooms/sync')
   .then(response=>{
     console.log(response);
     setRooms(response.data);
   }).catch(()=> console.log("Promise rejected"));
},[]);

useEffect(()=>{
  const pusher = new Pusher('a1020590fce419779207', {
   cluster: 'eu',
 });

 const channel = pusher.subscribe('rooms');
 channel.bind('inserted', function(newRoom) {

   setRooms([...rooms,newRoom]);
 });

 return ()=>{
   channel.unbind_all();
   channel.unsubscribe();
 };
},[rooms]);


  return(
    <div className="sidebar">
      <div className="sidebar__header">
      <Avatar src={user?.imageUrl} />
       <div className="sidebar__headerRight">
       <IconButton>
          <DonutLargeIcon/>
       </IconButton>
       <IconButton>
          <ChatIcon/>
       </IconButton>
       <IconButton>
          <MoreVertIcon/>
       </IconButton>
       </div>
      </div>

    <div className="sidebar__search">
      <div className="sidebar__searchContainer">
       <SearchOutlined/>
       <input placeholder="satrt or search a new chat" type="text" />
      </div>
    </div>

    <div className="sidebar__chats">
      <SidebarChat addNewChat />
      <SidebarChat rooms={rooms} messages={messages}/>
    </div>
  </div>
  )
}

export default Sidebar;
