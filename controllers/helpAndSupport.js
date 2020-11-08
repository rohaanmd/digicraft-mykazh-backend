const HelpSupport = require('../models/helpAndSupport');


const getAllHelpSupport = async (req, res, next) => {
    const helpSupport = await HelpSupport.find({})
    if (!helpSupport)
        return res.send({
            success: false,
            message: "helpSupport not found",
        });

    return res.send({
        success: true,
        message: " helpSupport Found successfull",
        responseData: helpSupport,
    });
};

const createHelpSupport = async (req, res, next) => {
    try {
        const pressDetails = req.body
        const helpSupport = new HelpSupport(pressDetails, (err) => {
            if (err)
                return res.send({
                    success: false,
                    message: "Request not found",
                    responseData: err,
                });
        });
        
  
        await helpSupport.save();
        
        return res.send({
            success: true,
            message: "helpSupport successfully created",
            responseData: {
                helpSupport,
            }
        });
    } catch (err) {
        return res.send({
            success: false,
            message: "something wrong happend",
            responseData: err,
        });
    }
}
const deleteHelpSupportById = async (req, res, next) => {
    const helpSupport = await HelpSupport.findByIdAndDelete(req.params.helpId)
    if (helpSupport)
        return res.send({
            success: true,
            message: "helpSupport Delete Successfully",
            responseData: helpSupport,
        });
    else
        return res.send({
            success: false,
            message: "helpSupport not found",
        });
};

const updateHelpSupport = async (req, res, next) => {
    try {
        const helpSupport = await HelpSupport.findById(req.params.helpId)
       
        
            if (!helpSupport) {
                return res.send({
                    success: false,
                    message: "helpSupport not found",
                });
            }


            const pressDetails = req.body

            const Getpress = await HelpSupport.findOneAndUpdate({
                _id: req.params.helpId
            }, pressDetails,{new: true})
if(Getpress)
            return res.send({
                success: true,
                message: "helpSupport Updated Successfull",
                responseData: Getpress,
            });
else{
    return res.send({
        success: true,
        message: "helpSupport Update fail",
        responseData: Getpress,
    });
}
     

    } catch (error) {
        console.log(error);
        return res.send({
            success: false,
            message: "something wrong happened",
            responseData: error,
        });
    }
};


module.exports = {
    deleteHelpSupportById,
    createHelpSupport,
    updateHelpSupport,
    getAllHelpSupport
}