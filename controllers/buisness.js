const Business = require ('../models/business');

const getBusiness = (req, res, next) => {
    console.log("GET Request")  
    res.json({
        message: 'this is home route of buisness'
    })
  }

  module.exports ={
  getBusiness
}