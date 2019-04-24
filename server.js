const express = require('express');
const server = express();

const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');

server.use(express.json());

server.use('/user', userRouter);
server.use('/post', postRouter);

server.get('/', async (req, res, next) => {
  res.send('Server Is Up and Running');
});

module.exports = server;