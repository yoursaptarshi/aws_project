import axios from 'axios';
import React, { useState } from 'react';

const Show = () => {
  const [key,setKey]=useState("");
  const [url,setUrl]=useState("");
  
  const submiHandler = async()=>{
    const div = document.querySelector(".show_download_button")
    try {
      
 let data = await axios.post("http://127.0.0.1:5000/get",{key:key})
 
 setUrl(data.data.message);
      div.style.display="block";
    } catch (error) {
      setUrl("Unable to get the url")
    }
  }
  return (

    <div className="show_main_container">
     
      <div className="show_input_container">
       <p>Enter your Object id: </p><input type='text' value={key} onChange={(e)=>{setKey(e.target.value)}}/>
      </div>
      <div className="show_submit_button">
        <button onClick={submiHandler}>Submit</button>
      </div>
      <div className="show_download_button" style={{display:'none'}} >
       <p>Here is your url to download the file, the url will expire in 2 minutes</p>
      <a href={url}>{url}</a> 
      </div>
    </div>
  );
}

export default Show;
