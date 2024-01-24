import React, { useState } from 'react';
import axios from 'axios';
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
    <div className="main_upload_container">
      <div className="main_upload_input">
      <form encType="multipart/form-data">
  <input type="file"  onChange={handleFileChange} />
  </form>

      </div>
      <div className="main_upload_submit">
      <button onClick={handleUpload}>Upload</button>
      </div>
      <div className="main_upload_key_container">
        <p>Your Secret Key Will be generated Once You Upload Your file, Copy it and keep it with you</p>
       <div className="main_upload_key" style={{display:'none'}}>
        {objectId}
       </div>
      </div>
    </div>
  );
};

export default Upload;
