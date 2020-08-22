const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const app = express()
const errorController = require('./controllers/errors');
const mongoose = require('mongoose');
const cors = require("cors");
const port = 3000
require('dotenv').config();
const router = express.Router({ mergeParams: true });

/* ENGINES */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

//mongoose setup
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
  if (err) throw err;
  console.log("DB Connected Successfully");
});


/* Routers */
const userRouter = require("./routes/user");
const businessRouter = require('./routes/business');
const adminRouter = require("./routes/admin");


/*  links */
// app.use("/", function (req, res,next ){
//   res.send("<h1> Welcome to mykazh-backend </h1>");
//   next();
// })
router.use('/business', businessRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);
app.use("/api", router);

/* ERROR HANDLERS */
app.use(errorController.get404);

app.listen(process.env.PORT || port)
