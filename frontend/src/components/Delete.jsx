import axios from 'axios';
import React, { useState } from 'react'

const Delete = () => {
  const[key,setKey]=useState("");
  const[msg,setMsg]=useState("");

  const submitHandler = async()=>{
    try {
      console.log(key)
      const data = await axios.post("http://127.0.0.1:5000/delete",{key:key})
      setMsg(data.data.message);
    } catch (error) {
      setMsg("Failedto delete file")
    }
  }
  return (
    <div className="delete_main_container" style={{display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'grey',minWidth:'100vw',minHeight:'100vh'}}>
      <div className="delete_child_container" style={{minWidth:'75vw',minHeight:'75vh',backgroundColor:'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
      <div className="delete_input_box" style={{margin:'2vw'}}>
        <input type="text" value={key} onChange={(e)=>{(setKey(e.target.value))}}></input>
      </div>
      <div className="delete_submit_button" style={{margin:'2vw'}}>
        <button onClick={submitHandler} style={{backgroundColor:'cyan',minWidth:'15vh',minHeight:'5vh',borderRadius:'5vh'}}>Delete</button>
      </div>
      <div className="detete_message_box" style={{margin:'2vw'}}>
        <p>{msg}</p>
      </div>
      </div>
    </div>
  )
}

export default Delete