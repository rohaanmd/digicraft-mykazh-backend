const Info = require("../models/info");

const getTerms = async (req, res , next) =>{
    const terms = await Info.find({
      type:"terms"
    })
    if(!terms)
    return res.send({
        success:false,
        message:"terms not found",
    })
    return res.send({
        success:true,
        responseData:terms,
                      
    })
}

const getRisk = async (req, res , next) =>{
    const risk = await Info.find({
        type:"risk"
    })
    if(!risk)
    return res.send({
        success:false,
        message:"risk not found",
    })
    return res.send({
        success:true,
        responseData:risk,

    })
}

const getPrivacy = async (req, res , next) =>{
    const privacy = await Info.find({
      type:"privacy"
    })
    if(!privacy)
    return res.send({
        success:false,
        message:"privacy not found",
    })
    return res.send({
        success:true,
        responseData:privacy,

    })
}


const postInfo = async (req,res, next) =>{
    try {
        
        const info = new Info({
            type:req.body.type,
           InfoHtml: req.body.info,
          },
          (err) => {
            if (err)
              return res.send({
                success: false,
                message: err.message,
              });
          });
          await info.save();
          return res.send({
            success: true,
            message: "Info created successfully",
            responsedata: {
              info,
            },
          });
    } catch (error) {
        console.log(error);
    return res.send({
      success: false,
      message: error.message,
    });
        
    };
}

const updateTerms = async (req, res, next) => {
    try {
      const terms = await Info.findOne({
          type: "terms"
      })
      if (!terms || !req.body)
        return res.send({
          success: false,
          message: "Unauthorized",
        });

      terms.InfoHtml = req.body.info;

      const updatedterms = await terms.save();
      return res.send({
        success: true,
        message: "terms updated succefully",
        responsedata: {
          updatedterms,
        },
      });
    } catch (error) {
      console.log(error);
      return res.send({
        success: false,
        message: "Invalid request",
      });
    }
  };  
  

  const updatePrivacy = async (req, res, next) => {
    try {
      const privacy = await Info.findOne({
          type: "privacy"
      });
      if (!privacy || !req.body)
        return res.send({
          success: false,
          message: "Unauthorized",
        });

      privacy.InfoHtml = req.body.info;

      const updatedprivacy = await privacy.save();
      return res.send({
        success: true,
        message: "privacy updated succefully",
        responsedata: {
          updatedprivacy,
        },
      });
    } catch (error) {
      console.log(error);
      return res.send({
        success: false,
        message: "Invalid request",
      });
    }
  };
  

  
const updateRisk = async (req, res, next) => {
    try {
      const risk = await Info.findOne({
          type: "risk"
      })
      if (!risk || !req.body)
        return res.send({
          success: false,
          message: "Unauthorized",
        });

      risk.InfoHtml = req.body.info;

      const updatedrisk = await risk.save();
      return res.send({
        success: true,
        message: "risk updated succefully",
        responsedata: {
          updatedrisk,
        },
      });
    } catch (error) {
      console.log(error);
      return res.send({
        success: false,
        message: "Invalid request",
      });
    }
  };
  


  module.exports={
      getTerms,
      updateTerms,
    postInfo,
      getRisk,
      updateRisk,
      getPrivacy,
      updatePrivacy,
     
  }
  