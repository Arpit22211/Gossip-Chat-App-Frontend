import React,{useEffect,useState} from 'react';
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import Pusher from "pusher-js";
import axios from "./axios";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {useStateValue} from "./StateProvider";


function App() {

const [{user},dispatch]=useStateValue();

  const[messages,setMessages]= useState([]);
  useEffect(()=>{
     axios.get('/messages/sync')
     .then(response=>{
       console.log(response);
       setMessages(response.data);
     }).catch(()=> console.log("Promise rejected"));
  },[]);

  useEffect(()=>{
    const pusher = new Pusher('a1020590fce419779207', {
     cluster: 'eu',
   });

   const channel = pusher.subscribe('messages');
   channel.bind('inserted', function(newMessage) {
     alert(JSON.stringify(newMessage));
     setMessages([...messages,newMessage]);
   });

   return ()=>{
     channel.unbind_all();
     channel.unsubscribe();
   };
 },[messages]);
 console.log(messages);
  return (
    <div className="app">
    {!user ?(
      <Login/>
    ):(
      <div className="app__body">
      <Router>
       <Switch>

       <Route path="/rooms/:roomId">
       <Sidebar messages={messages}/>
        <Chat messages={messages}/>
        </Route>
        <Route path="/">
        <Sidebar/>
        <chat/>
        </Route>
       </Switch>
      </Router>
        </div>

    )}
      </div>
  );
}

export default App;
