const express = require('express')
const { ImgUploader, authUser } = require("../middleware/index");
const router = express.Router();
const { getBusiness,
    createBusiness,
    updateBusiness,
    deleteBusinessById,
    deleteAllBusiness,
    getBusinessByUser,
    getBusinessById,
    getAllBusiness,
} = require("../controllers/buisness")


router.get('/businessapi', getBusiness);
router.get('/getall', authUser, getAllBusiness);
router.get('/', authUser, getBusinessByUser);
router.get('/:businessId',  getBusinessById);
router.post('/create', authUser,ImgUploader, createBusiness);
router.put('/update/:businessId',authUser,ImgUploader, updateBusiness);
router.delete('/deleteall', deleteAllBusiness);
router.delete('/delete/:businessId', authUser, deleteBusinessById);


module.exports = router;