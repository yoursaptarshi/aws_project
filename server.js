const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const express = require("express");
const axios = require('axios');
const fileUpload = require('express-fileupload')
const cors =require('cors')
const PORT =5000;

const app = express();


//middlewares
require("dotenv").config({ path: "./config.env" });
app.use(express.json());
app.use(express.urlencoded({extended:true,limit: '50mb'}))
app.use(fileUpload());
app.use(cors());



//controllers
const postObject  = async(req,res)=>{
    try {
        
        const file = req.files
       console.log(file)
        if(!file){
            
            return res.status(400).json({
                success:false,
                message:'no files uploaded!'
            })
        }
       
        const clientParams = {
            region:'ap-south-1',

            credentials:{
                accessKeyId:'AKIA3YFZ73OKNS2V6ZDS',
            secretAccessKey:'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'
            }
        }
        
        const key = `Object${Math.floor(Math.random() * 1000)}${file.file.name}`;
        
        const putObjectParams = {
            Bucket:'project-yoursaptarshi',
            Key:key,
            ContentType:file.mimetype,
                    
        }
       
        const client = new S3Client(clientParams);
        const command = new PutObjectCommand(putObjectParams);
        const url = await getSignedUrl(client,command)
        
        await axios.put(url,file.file.data, {
            headers: {
                'Content-Type': file.mimetype,
            },
        });
        
        res.status(200).json({
            success:true,
            message:'file uploaded',
            key:key
        })
    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

const getObject =async(req,res)=>{
  try {
    
    const {key} = req.body;
    
    if(!key){
        
        return res.status(400).json({
            success:false,
            message:'Give a key first'
        })
    }
    
    const clientParams = {
        region:'ap-south-1',

        credentials:{
            accessKeyId:'AKIA3YFZ73OKNS2V6ZDS',
        secretAccessKey:'KqamKmGZupdBcLwdrfMQdfpik1WJxCOSSiDJc5Zb'
        }
    }
    const getObjectParams = {
        Bucket:'project-yoursaptarshi',
        Key:key,          
    }
    const client = new S3Client(clientParams);
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(client,command,{expiresIn:120})
    res.status(200).json({
        success:true,
        message:url
    })
  } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message
    })
  }
}

const deleteObject = async(req,res)=>{
    try {
        
        const {key} = req.body;
        
        if(!key){
            console.log(2)
            return res.status(400).json({
                success:false,
                message:'Give a key first'
            })
        }
      
        const clientParams = {
            region:'ap-south-1',

            credentials:{
                accessKeyId:'AKIA3YFZ73OKNS2V6ZDS',
            secretAccessKey:'KqamKmGZupdBcLwdrfMQdfpik1WJxCOSSiDJc5Zb'
            }
        }
       
        const deleteObjectParams = {
            Bucket:'project-yoursaptarshi',
            Key:key,          
        }
        
        const client = new S3Client(clientParams);
        const command = new DeleteObjectCommand(deleteObjectParams);
       
        try {
            await client.send(command);
        } catch (error) {
            console.log(error)
        }
        
        res.status(200).json({
            success:true,
            message:'File Deleted Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//routes
app.post("/post",postObject);
app.post("/get",getObject);
app.post("/delete",deleteObject)

app.listen(PORT,()=>{
    console.log(`Server is listining to ${PORT}`)
})
