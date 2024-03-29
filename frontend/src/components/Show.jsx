import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Show = () => {
  const [key,setKey]=useState("");
  const [url,setUrl]=useState("");
  
  const submiHandler = async()=>{
    const div = document.querySelector(".show_download_button")
    try {
      
 let data = await axios.post("http://15.206.45.43:5000/get",{key:key})
 
 setUrl(data.data.message);
      div.style.display="block";
    } catch (error) {
      setUrl("Unable to get the url")
    }
   
  }
  return (

    <div className="show_main_container" style={{display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'grey',minWidth:'100vw',minHeight:'100vh'}}>
    <div className="show_child_container"  style={{minWidth:'75vw',minHeight:'75vh',backgroundColor:'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
    <h1>Samanta Secret Box</h1> 
     <p>share secret files, by secret keys</p>
    <div className="show_input_container" style={{margin:'2vw'}} >
       <p>Enter your Object id: </p><input type='text' value={key} onChange={(e)=>{setKey(e.target.value)}}/>
      </div>
      <div className="show_submit_button" style={{margin:'2vw'}}>
        <button onClick={submiHandler} style={{backgroundColor:'cyan',minWidth:'15vh',minHeight:'5vh',borderRadius:'5vh'}}>Submit</button>
      </div>
      <div className="show_download_button" style={{display:'none',margin:'2vw'}} >
       <p>Here is your url to download the file, the url will expire in 2 minutes</p>
      <a href={url}>{url}</a> 
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
  );
}

export default Show;
