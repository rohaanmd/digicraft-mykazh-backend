const express = require('express')
const { ImgUploader, authUser } = require("../middleware/index");
const router = express.Router();
const {  deleteCharityById,
     updateCharity,
     deleteAllCharity,
     createCharity,
     getCharityByUser,
     getCharityById,
     getAllCharity,
     getCharity
} = require("../controllers/medical")


router.get('/charityapi', getCharity);
router.get('/getall', authUser, getAllCharity);
router.get('/', authUser, getCharityByUser);
router.get('/:charityId', authUser, getCharityById);
router.post('/create', ImgUploader, createCharity);
router.put('/update/charityId', ImgUploader, updateCharity);
router.delete('/deleteall', deleteAllCharity);
router.delete('/delete/charityId', authUser, deleteCharityById);


module.exports = router;