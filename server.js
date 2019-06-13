const express = require('express');
const server = express();
const helmet = require('helmet')
const os = require ('os');
const winston = require('winston');

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

server.use(express.json());
server.use(helmet());

server.use('/user', userRouter);
server.use('/post', postRouter);

const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'results.log');

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    new transports.File({ filename })
  ]
});


logger.info("Architecture: " + os.arch());
logger.info("Platform: " + os.platform());
logger.info("Total Memory: " + os.totalmem()/1e+9);

let result = Object.keys(os.networkInterfaces())
  .map(add => [add, os.networkInterfaces()[add].filter(add => add.family === 'IPv4')[0]])
  
  console.log('Network Adderess:', result)

server.get('/', async (req, res, next) => {
  res.send('Server Is Up and Running');
});

module.exports = server;