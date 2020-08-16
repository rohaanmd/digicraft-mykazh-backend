const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const app = express()
const errorController = require('./controllers/errors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require("cors");
const port = 3000
require('dotenv').config();
const router = express.Router({ mergeParams: true });
const User = require('./models/user')

const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: 'sessions'
  });
/* ENGINES */
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

//sessions setup
app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
  
  app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });


//mongoose setup
mongoose.connect(process.env.DB_URI,  { useNewUrlParser: true ,useUnifiedTopology: true},  (err) => {
        if (err) throw err; 
        console.log("DB Connected Successfully");
        });


/* Routers */
const userRouter = require("./routes/user");
const businessRouter = require('./routes/business'); 


/*  links */
// app.use("/", function (req, res,next ){
//   res.send("<h1> Welcome to mykazh-backend </h1>");
//   next();
// })
router.use('/business', businessRouter);
router.use('/user',userRouter);
app.use("/api", router); 

/* ERROR HANDLERS */
app.use(errorController.get404);

app .listen(process.env.PORT || port)
