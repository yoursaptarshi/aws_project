import axios from 'axios';
import React, { useState } from 'react'

const Delete = () => {
  const[key,setKey]=useState("");
  const[msg,setMsg]=useState("");

  const submitHandler = async()=>{
    try {
      
      const data = await axios.post("http://127.0.0.1:5000/delete",{key:key})
      setMsg(data.data.message);
    } catch (error) {
      setMsg("Failedto delete file")
    }
  }
  return (
    <div className="delete_main_container">
      <div className="delete_input_box">
        <input type="text" value={key} onChange={(e)=>{(setKey(e.target.value))}}></input>
      </div>
      <div className="delete_submit_button">
        <button onClick={submitHandler}>Delete</button>
      </div>
      <div className="detete_message_box">
        <p>{msg}</p>
      </div>
    </div>
  )
}

export default Delete