import React,{useState,useEffect} from 'react';
import  "./Chat.css";
import {Avatar,IconButton} from '@material-ui/core';
import {SearchOutlined,AttachFile,MoreVert} from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import axios from "./axios";
import {useParams} from "react-router-dom";
import {useStateValue} from "./StateProvider";


function Chat({messages}){
    const [{user},dispatch]=useStateValue();
  const[input,setInput]=useState("");
  const {roomId}=useParams();
  const[roomName,setRoomName]=useState("");
  const[file,setFile]=useState("");
  const[filename,setFileName]=useState("");


const onChange= e =>{
  setFile(e.target.files[0]);
  setFileName(e.target.files[0].name);
}

const onSubmit= async (e) =>{
  e.preventDefault();
console.log("hello");
  const formData=new FormData();
  formData.append('file',file);

  try{
    const res=await axios.post('/upload',formData,{
       headers: {
         'Content-Type':'multipart/form-data'
       }
    });
    await axios.post("/messages/new",{
      message:input,
     name:`${user.name}`,
     timestamp: new Date().toUTCString(),
     received:"false",
     roomid:`${roomId}`,
     imgName:filename
   });

  } catch(err){
    if(err.response.status=== 500){
      console.log('Server Problem');
    }else{
      console.log(err.response.data.msg);
    }
  }
setFileName("");
e.preventDefault();
}

 useEffect(()=>{
   if(roomId){
     axios.get(`/rooms/${roomId}`)
     .then(response=>{
       setRoomName(response.data.roomname);
     }).catch(()=> console.log("Promise rejected"));
   }
 },[roomId]);

const sendMessage= async (e)=>{
  e.preventDefault();
if(input==="" && filename===""){
  alert("Enter a valid message");
}
else{
  await axios.post("/messages/new",{
    message:input,
   name:`${user.name}`,
   timestamp: new Date().toUTCString(),
   received:"false",
   roomid:`${roomId}`,
   imgName:filename
  });
}
  setInput("");
};

  return(
    <div className="chat">
     <div className='chat__header'>
       <Avatar/>
       <div className="chat__headerInfo">
         <h3>{roomName}</h3>
         <p>{new Date().toUTCString()}</p>
       </div>
       <div className="chat__headerRight">
         <IconButton>
            <SearchOutlined/>
         </IconButton>
         <IconButton>
            <AttachFile/>
         </IconButton>
         <IconButton>
            <MoreVert/>
         </IconButton>
       </div>
     </div>

     <div className="chat__body">
     {messages.filter(message=>message.roomid===roomId).map((message)=>(
       <div>
      {message.message!==""?(
       <p className={`chat__message ${message.name===user.name && "chat__reciever"}`}>
         <span className="chat__name">
         {message.name}
         </span>
       {message.message}
         <span className="chat__timestamp">
           {message.timestamp}
         </span>
       </p>
       ):(
         <img src={process.env.PUBLIC_URL + `/uploads/${message.imgName}`}  className={`chat__image ${message.name===user.name && "chat__reciever__image"}`}  />

     )}
       </div>

     ))}

        <p className="chat__message chat__reciever">
          <span className="chat__name">
          Arpit
          </span>

        Message

          <span className="chat__timestamp">
            {new Date().toUTCString()}
          </span>
        </p>
     </div>

     <div className="chat__footer">
       <IconButton>
         <InsertEmoticonIcon/>
       </IconButton>
       <form>
         <input value={input}  onChange={ e => setInput(e.target.value)} placeholder="Type a message" type="text"/>

         <button onClick={sendMessage} className="chat__footer__btn__none" type="submit">send</button>
       </form>
       <form onSubmit={onSubmit}>
       <label class="custom-file-upload">
           <input  type='file' onChange={onChange}/>
            Attach File
       </label>

        <button className="chat__footer__button" type="submit" value='Upload'>Upload</button>
       </form>
       <MicIcon/>
     </div>
    </div>
  )
}

export default Chat;
