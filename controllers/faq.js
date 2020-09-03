const Faq = require("../models/faq");

const getInvestor = async (req, res , next) =>{
    const investor = await Faq.find({
      type:"investor"
    })
    if(!investor)
    return res.send({
        success:false,
        message:"investor not found",
    })
    return res.send({
        success:true,
        responseData:investor,
                      
    })
}

const getKnowledge = async (req, res , next) =>{
    const knowledge = await Faq.find({
      type:"knowledge"
    })
    if(!knowledge)
    return res.send({
        success:false,
        message:"knowledge not found",
    })
    return res.send({
        success:true,
        responseData:knowledge,
                      
    })
}

const getEntrepreneur = async (req, res , next) =>{
    const entrepreneur = await Faq.find({
      type:"entrepreneur"
    })
    if(!entrepreneur)
    return res.send({
        success:false,
        message:"entrepreneur not found",
    })
    return res.send({
        success:true,
        responseData:entrepreneur,
                      
    })
}


const postFaq = async (req,res, next) =>{
    try {
        
        const faq = new Faq({
            type:req.body.type,
            faq:req.body.faq
          },
          (err) => {
            if (err)
              return res.send({
                success: false,
                message: err.message,
              });
          });
          await faq.save();
          return res.send({
            success: true,
            message: "faq created successfully",
            responsedata: {
              faq,
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

const updateKnowledge = async (req, res, next) => {
    try {
      const knowledge = await Faq.findOne({
          type: "knowledge"
      })
      if (!knowledge || !req.body)
        return res.send({
          success: false,
          message: "Unauthorized",
        });

        
            knowledge.faq.question= req.body.question;
            knowledge.faq.answer= req.body.answer;
        

      const updatedknowledge = await knowledge.save();
      return res.send({
        success: true,
        message: "knowledge updated succefully",
        responsedata: {
          updatedKnowledge,
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
  

  const updateInvestor = async (req, res, next) => {
    try {
      const investor = await Faq.findOne({
          type: "investor"
      });
      if (!investor || !req.body)
        return res.send({
          success: false,
          message: "Unauthorized",
        });

      investor.faq.question = req.body.question;
        investor.faq.answer= req.body.answer;
      const updatedinvestor = await investor.save();
      return res.send({
        success: true,
        message: "investor updated succefully",
        responsedata: {
          updatedinvestor,
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
  

  
const updateEntrepreneur = async (req, res, next) => {
    try {
      const entrepreneur = await Info.findOne({
          type: "entrepreneur"
      })
      if (!entrepreneur || !req.body)
        return res.send({
          success: false,
          message: "Unauthorized",
        });

      
        entrepreneur.faq.question= req.body.question;
        entrepreneur.faq.answer= req.body.answer;

      const updatedentrepreneur = await entrepreneur.save();
      return res.send({
        success: true,
        message: "entrepreneur updated succefully",
        responsedata: {
          updatedentrepreneur,
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
  postFaq,
  getInvestor ,
  getKnowledge,
  getEntrepreneur,
  updateKnowledge,
  updateEntrepreneur,
  updateInvestor



     
  }
  