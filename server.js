const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const express = require("express")
const PORT =5000;

const app = express();


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.put("/post",async(req,res)=>{
    try {
        const clientParams = {
            region:'ap-south-1',

            credentials:{
                accessKeyId:'',
                secretAccessKey:''
            }
        }
        const putObjectParams = {
            Bucket:'project-yoursaptarshi',
            Key:`Object+${Date.now()}+${Math.random()*1000}`,
            ContentType:'image/jpeg'
        }
        const client = new S3Client(clientParams);
        const command = new PutObjectCommand(putObjectParams);
        const url = await getSignedUrl(client,command)
        res.status(200).json({
            success:true,
            url:url
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            url:'wwww.amazon.com'
        })
    }
})

app.listen(PORT,()=>{
    console.log(`Server is listining to ${PORT}`)
})