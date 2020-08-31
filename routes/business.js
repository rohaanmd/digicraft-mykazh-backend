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
router.get('/getall',  getAllBusiness);
router.get('/', getBusinessByUser);
router.get('/:businessId', getBusinessById);
router.post('/create', createBusiness);
router.put('/update/:businessId', updateBusiness);
router.delete('/deleteall', deleteAllBusiness);
router.delete('/delete/:businessId', deleteBusinessById);


module.exports = router;