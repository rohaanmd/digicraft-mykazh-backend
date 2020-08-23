const express = require('express')
const { ImgUploader, authUser } = require("../middleware/index");
const router = express.Router();
const { deleteProjectById,
     updateProject,
     deleteAllProject,
     createProject,
     getProjectByUser,
     getProjectById,
     getAllProject,
     getProject,
} = require("../controllers/projects");  


router.get('/projectapi', getProject);
router.get('/getall', authUser, getAllProject);
router.get('/', authUser, getProjectByUser);
router.get('/:projectId', authUser, getProjectById);
router.post('/create', ImgUploader, createProject);
router.put('/update/:projectId', ImgUploader, updateProject);
router.delete('/deleteall', deleteAllProject);
router.delete('/delete/:projectId', authUser, deleteProjectById);


module.exports = router;