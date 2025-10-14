// Multer is a Node.js middleware for handling multipart/form-data, primarily used for file uploads in web applications
// data is converted into form-data


/*
// disk storage config
// basic code 

import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})



*/

import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})



const upload = multer({storage})

export default upload