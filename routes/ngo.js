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
router.get('/getall',  getAllNgo);
router.get('/',  getNgoByUser);
router.get('/:ngoId',  getNgoById);
router.post('/create', createNgo);
router.put('/update/:ngoId', updateNgo);
router.delete('/deleteall', deleteAllNgo);
router.delete('/delete/:ngoId',  deleteNgoById);


module.exports = router;