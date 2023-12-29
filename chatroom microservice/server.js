// Chatroom backend
const express = require("express");
const app = express();

// making server for socket.io connection on express app
const server = require("http").Server(app);

// including socket.io and connecting to express
const io = require("socket.io")(server);

app.set("views", "./views");

// create view engine
app.set("view engine", "ejs");

// sccess to javascript file in folder
app.use(express.static("public"));

// accept URL's
app.use(express.urlencoded({ extended: true }));

const chatroom = {};

// load index.ejs
app.get("/", (req, res) => {
  res.render("index", { chatroom: chatroom });
});

// load chatrooms
app.post("/room", (req, res) => {
  if (chatroom[req.body.room] != null) {
    return res.redirect("/");
  }
  // add user to chat
  chatroom[req.body.room] = { users: {} };
  res.redirect(req.body.room);
  // send msg that new room was created
  io.emit("room-created", req.body.room);
});

app.get("/:room", (req, res) => {
  if (chatroom[req.params.room] == null) {
    return res.redirect("/");
  }
  res.render("room", { roomName: req.params.room });
});

// activate server on port 7000
server.listen(7000);

// user joins and add their name
io.on("connection", (socket) => {
  socket.on("new-user", (room, name) => {
    socket.join(room);
    chatroom[room].users[socket.id] = name;
    socket.to(room).emit("user-connected", name);
  });
  // show msg
  socket.on("send-chat-message", (room, message) => {
    socket.to(room).emit("chat-message", {
      message: message,
      name: chatroom[room].users[socket.id],
    });
  });
  // when user leaves, show they left
  socket.on("disconnect", () => {
    getUserchatroom(socket).forEach((room) => {
      socket
        .to(room)
        .emit("user-disconnected", chatroom[room].users[socket.id]);
      delete chatroom[room].users[socket.id];
    });
  });
});

// retreive room's on current port (7000)
function getUserchatroom(socket) {
  return Object.entries(chatroom).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}
