import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [objectId,setObjectId]=useState('test')
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
let data;
  const handleUpload = async() => {
    const div = document.querySelector(".main_upload_key");
    
    if (selectedFile) {
        const formData = new FormData();
      formData.append('file', selectedFile);
    try {
        console.log({formData})
        data = await axios.post("http://127.0.0.1:5000/post",formData)
        console.log(data.data.key)
        setObjectId("Your File Key is:"+data.data.key)
    } catch (error) {
        console.log(error)
    }
    
   // console.log(selectedFile)
    div.style.display="block"
    } else {
      alert("No file uploaded")
    }
  };
  

  return (
    <div className="main_upload_container" style={{display:'flex',alignItems:'center',justifyContent:'center',backgroundColor:'grey',minWidth:'100vw',minHeight:'100vh'}}>
    <div className="main_upload_child_container" style={{minWidth:'75vw',minHeight:'75vh',backgroundColor:'white',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
    <h1>Samanta Secret Box</h1> 
     <p>share secret files, by secret keys</p>
    <div className="main_upload_input" style={{margin:'2vw'}}>
      <form encType="multipart/form-data">
  <input type="file"  onChange={handleFileChange} />
  </form>

      </div>
      <div className="main_upload_submit" style={{margin:'2vw'}}>
      <button onClick={handleUpload} style={{backgroundColor:'cyan',minWidth:'15vh',minHeight:'5vh',borderRadius:'5vh'}}>Upload</button>
      </div>
      <div className="main_upload_key_container" style={{margin:'2vw'}}>
        <p>Your Secret Key Will be generated Once You Upload Your file, Copy it and keep it with you</p>
       <div className="main_upload_key" style={{display:'none'}}>
        {objectId}
       </div>
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
};

export default Upload;
