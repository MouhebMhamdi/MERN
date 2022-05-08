var createError = require('http-errors');
var express = require('express');
var path = require('path');
require("dotenv").config();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
var indexRouter = require('./routes');
const bodyparser = require("body-parser")
var cors = require('cors');
const Grid = require("gridfs-stream");
const UserWeb=require('./Routes/UserWebRoutes')
const ImageMarket=require('./Routes/ImageMarket')
var imageMarketRouter = require('./repositories/ImageMaketRepository');
var app = express();
const server = http.createServer(app);
const mongoose = require("./databases/db.js")
const io=require('socket.io')(server)

var mongooses=require('mongoose');

// view engine setup
let gfs;

mongoose.connect();
let online=0;
io.on('connection',(socket)=>{
  online++;
  io.emit('online',online)

  console.log('User connected');

  socket.on('disconnect',()=>{
    online--;
    io.emit('online',online)
    console.log("user disconnected");
  })
})


const conn = mongooses.connection;
conn.once("open", function () {
    gfs = Grid(conn.db, mongooses.mongo);
    gfs.collection("photos");
});
app.use(cors());
app.use(cors({origin: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyparser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json({limit:'200mb'}));
app.use('/', indexRouter);
app.use('/user',UserWeb);
app.use('/market',ImageMarket);
app.use('/imageMarket', imageMarketRouter);
app.get("/file/:filename", async (req, res) => {
  try {
      const file = await gfs.files.findOne({ filename: req.params.filename });
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
  } catch (error) {
      res.send("not found");
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
      await gfs.files.deleteOne({ filename: req.params.filename });
      res.send("success");
  } catch (error) {
      console.log(error);
      res.send("An error occured.");
  }
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(500).json('verify your route');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${3000}`);
});