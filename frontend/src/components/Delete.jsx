import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Delete = () => {
  const[key,setKey]=useState("");
  const[msg,setMsg]=useState("");

  const submitHandler = async()=>{
    try {
      console.log(key)
      const data = await axios.post("http://15.206.45.43:5000/delete",{key:key})
      setMsg(data.data.message);
    } catch (error) {
      setMsg("Failedto delete file")
    }
  }
  return (
    <div className="delete_main_container" style={{display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'grey',minWidth:'100vw',minHeight:'100vh'}}>
      
      <div className="delete_child_container" style={{minWidth:'75vw',minHeight:'75vh',backgroundColor:'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
     <h1>Samanta Secret Box</h1> 
     <p>share secret files, by secret keys</p>
      <div className="delete_input_box" style={{margin:'2vw'}}>
        <p>Enter your Key:</p>
        <input type="text" value={key} onChange={(e)=>{(setKey(e.target.value))}}></input>
      </div>
      <div className="delete_submit_button" style={{margin:'2vw'}}>
        <button onClick={submitHandler} style={{backgroundColor:'cyan',minWidth:'15vh',minHeight:'5vh',borderRadius:'5vh'}}>Delete</button>
      </div>
      <div className="detete_message_box" style={{margin:'2vw'}}>
        <p>{msg}</p>
      </div>
      <div className="menu" style={{display:'flex'}}>
      <div className="menu_upload" style={{margin:'0 2vw'}}>
        <Link to="/upload">Upload</Link>
      </div>
      <div className="menu_show" style={{margin:'0 2vw'}}>
      <Link to="/show">Show</Link>
      </div>
      <div className="menu_delete" style={{margin:'0 2vw'}}>
      <Link to="/delete">Delete</Link>
      </div>
    </div>
      </div>
    </div>
  )
}

export default Delete
