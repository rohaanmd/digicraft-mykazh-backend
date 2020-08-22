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
router.get('/:businessId', authUser, getBusinessById);
router.post('/create', ImgUploader, createBusiness);
router.put('/update', ImgUploader, updateBusiness);
router.delete('/deleteall', deleteAllBusiness);
router.delete('/delete/:businessId', authUser, deleteBusinessById);


module.exports = router;