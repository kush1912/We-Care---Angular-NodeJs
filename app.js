const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes/router');


// const myReqLogger = require('./Utilities/requestLogger');
// const Errorlogger = require('./Utilities/Errorlogger');

var path  = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
// const logger = async(req,res,next) => {
//   console.log(new Date(), req.method, req.url);
// }

// Using Middlewares
app.use(bodyParser.json());
// app.use(myReqLogger);
// app.use(Errorlogger);
app.use('/', router);

app.use(express.static(path.join(__dirname,'public')));

app.get('*',(req,res)=>{
  // console.log(req);
  console.log(path.join(__dirname,'public/index.html'));
  res.sendFile(path.join(__dirname,'public/index.html'));
});

// Server Creation
app.listen(port,function(){
  console.log("Sever running at port number: " + port);
})
