const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const app = express()
const errorController = require('./controllers/errors');
const mongoose = require('mongoose');
const cors = require("cors");
const compression = require("compression");
const port = 3000
require('dotenv').config();
const router = express.Router({ mergeParams: true });
// const cloudinaryConfig = require('./config/cloudinary');
const cloudinary = require("cloudinary");
/* ENGINES */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  });


//mongoose setup
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
  if (err) throw err;
  console.log("DB Connected Successfully");
});
// multer Storage setup
app.use(express.static(__dirname + "./TEMP/"));


/* Routers */
const userRouter = require("./routes/user");
const businessRouter = require('./routes/business');
const projectRouter=require('./routes/projects');
const medicalRouter=require('./routes/medical');
const adminRouter = require("./routes/admin");
const ngoRouter = require("./routes/ngo");
const othersRouter = require("./routes/others");
const fileRouter = require("./routes/fileUpload");
/*  links */
// app.use("/", function (req, res,next ){
//   res.send("<h1> Welcome to mykazh-backend </h1>");
//   next();
// })
router.use('/business', businessRouter);
router.use('/project',projectRouter)
router.use('/medical',medicalRouter)
router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/ngo',ngoRouter);
router.use('/others',othersRouter);
router.use('/file',fileRouter);
app.use("/api", router);

/* ERROR HANDLERS */
// app.use(errorController.get404);
app.use(express.static(path.join(__dirname, '../')));

app.listen(process.env.PORT || port)
