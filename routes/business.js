const express =  require('express')

const router = express.Router();
const { getBusiness} = require("../controllers/buisness")


router.get('/', getBusiness)  

module.exports = router;