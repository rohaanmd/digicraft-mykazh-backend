const Press = require('../models/press');


const getAllPress = async (req, res, next) => {
    const press = await Press.find({})
        .populate("createdBy")
    if (!press)
        return res.send({
            success: false,
            message: "press not found",
        });

    return res.send({
        success: true,
        message: " press Found successfull",
        responseData: press,
    });
};

const createPress = async (req, res, next) => {
    try {
        const pressDetails = req.body
        const press = new Press(pressDetails, (err) => {
            if (err)
                return res.send({
                    success: false,
                    message: "Request not found",
                    responseData: err,
                });
        });
        
  
        await press.save();
        
        return res.send({
            success: true,
            message: "press successfully created",
            responseData: {
                press,
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
const deletePressById = async (req, res, next) => {
    const press = await Press.findByIdAndDelete(req.params.pressId)
    if (press)
        return res.send({
            success: true,
            message: "press Delete Successfully",
            responseData: press,
        });
    else
        return res.send({
            success: false,
            message: "press not found",
        });
};

const updatePress = async (req, res, next) => {
    try {
        const press = await Press.findById(req.params.pressId)
       
        
            if (!press) {
                return res.send({
                    success: false,
                    message: "press not found",
                });
            }


            const pressDetails = req.body

            const Getpress = await Press.findOneAndUpdate({
                _id: req.params.pressId
            }, pressDetails,{new: true})
if(Getpress)
            return res.send({
                success: true,
                message: "press Updated Successfull",
                responseData: Getpress,
            });
else{
    return res.send({
        success: true,
        message: "press Update fail",
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
    deletePressById,
    createPress,
    updatePress,
    getAllPress
}