// consconst fs = require("fs");t {dataUri} =require( "../middleware/index");
const fs = require("fs");
const cloudinary = require("cloudinary");
exports.fileController = async (req,res) =>{
    try {
        if (req.file) {
        console.log(req.file);    
       
        var fileResponse = await cloudinary.uploader.upload(req.file.path);
        var reqObj = {
            secure_url:fileResponse.secure_url,
            public_id:fileResponse.public_id,
            
        }
        await fs.unlinkSync(req.file.path);
        return res.send({
            success: true,
            message: "File Uploaded",
            responseData: reqObj,
          });

    }} catch (error) {
        console.log(error);
        return res.send({
            success: false,
            message: "File not Uploaded",
            responseData: error,
          });
    }
}
exports.fileDeleteController = async (req,res) =>{
    try {
        var public_id = req.params.id
        var fileResponse = await cloudinary.uploader.destroy(public_id,options={});
        return res.send({
            success: true,
            message: "File STATUS",
            responseData: fileResponse,
          });
    } catch (error) {
        return res.send({
            success: false,
            message: "File not Deleted",
            responseData: error,
          });
    }
}