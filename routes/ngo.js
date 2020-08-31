const express = require('express')
const { ImgUploader, authUser } = require("../middleware/index");
const router = express.Router();
const {   getNgo,
    createNgo,
    updateNgo,
    deleteNgoById,
    deleteAllNgo,
    getNgoByUser,
    getNgoById,
    getAllNgo,
} = require("../controllers/ngo");


router.get('/vgoapi', getNgo);
router.get('/getall', authUser, getAllNgo);
router.get('/', authUser, getNgoByUser);
router.get('/:ngoId',  getNgoById);
router.post('/create', authUser,ImgUploader, createNgo);
router.put('/update/:ngoId',authUser,ImgUploader, updateNgo);
router.delete('/deleteall', deleteAllNgo);
router.delete('/delete/:ngoId', authUser, deleteNgoById);


module.exports = router;