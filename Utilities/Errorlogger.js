//Study What this content is doing.
const fs = require('fs');
const { promisify } = require('util');
const appendFile = promisify(fs.appendFile);
async function requestLogger(req, res, next) {
  try {
    const logMessage = `${new Date()} - ${req.method} - ${req.url} \n`;
    await appendFile('Errorlogger.log', logMessage);
    next();
  } catch (err) {
    next(err);s
  }
}
module.exports = Errorlogger;


/*

const fs = require('fs');

let errorLogger = (err, req, res, next) => {
  if (err) {
    fs.appendFile(
      'ErrorLogger.log',
      new Date().toDateString() + ' - ' + err.message + '\n',
      (error) => {
        if (error) {
          console.log('logging error failed');
        }
      }
    );
    if (err.status) {
      res.status(err.status);
    } else {
      res.status(500);
    }
    res.json({
      status: 'error',
      message: err.message,
    });
  }
  next();
};
module.exports = errorLogger;

*/

