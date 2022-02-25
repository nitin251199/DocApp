var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./routes/config/db");

db();

var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doctorRouter = require('./routes/doctor');
var adminRouter = require('./routes/admin');
var userDetailsRouter = require('./routes/userdetails')
var appointmentRouter = require('./routes/appointment')
var medicineRouter = require('./routes/medicine')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/doctor', doctorRouter);
app.use('/admin', adminRouter);
app.use('/userdetails', userDetailsRouter)
app.use('/appointment', appointmentRouter)
app.use('/medicine', medicineRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

////////////////////////////SOCKET PORTION /////////////////////////////////////////

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User Connected: ${socket.id}`);
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("send_medicines", (data) => {
    socket.to(data.room).emit("recieve_medicines", data)
  })

  socket.on("videoconnected", ()=>{
    socket.emit("videoloaded")
  })

});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});


////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////   SECOND SOCKET PORTION ///////////////////////////////////////////////


// const http = require("http");
// const socketIO = require("socket.io");

// const port = 3001 || process.env.PORT;


// const users = [{}];

// app.use(cors());

// const server = http.createServer(app);

// const io = socketIO(server);

// io.on("connection", (socket) => {
//   console.log("New Connection");

//   socket.on('joined', ({ username, room }) => {
//     socket.join(room);
//     users[socket.id] = username;
//     console.log(`${username} has joined `);
//     socket.broadcast.emit('userJoined', { username: "Admin", message: ` ${users[socket.id]} has joined` });
//     socket.emit('welcome', { username: "Admin", message: `Welcome to the chat,${users[socket.id]} ` })
//   })

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log(`User with ID: ${users[socket.id]} joined room: ${data}`);
//   });

//   socket.on('message', ({ message, id }) => {
//     io.emit('sendMessage', { username: users[id], message, id });
//   })

//   socket.on('disconnect', () => {
//     socket.broadcast.emit('leave', { username: "Admin", message: `${users[socket.id]}  has left` });
//     console.log(`user left`);
//   })
// });


// server.listen(port, () => {
//   console.log(`Working`);
// })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = app;
