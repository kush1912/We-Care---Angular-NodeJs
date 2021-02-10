const express = require('express');
// const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes/router');
// const myReqLogger = require('./Utilities/requestLogger');
// const Errorlogger = require('./Utilities/Errorlogger');

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
// const logger = async(req,res,next) => {
//   console.log(new Date(), req.method, req.url);
// }

// Using Middlewares
app.use(bodyParser.json());
// app.use(myReqLogger);
// app.use(Errorlogger);
app.use('/', router);


// Server Creation
app.listen(port,function(){
  console.log("Sever running at port number: " + port);
})
