// adds functionality

// connects to port 7000
const socket = io("http://localhost:7000");

const messageContainer = document.getElementById("message-container");
const roomContainer = document.getElementById("room-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

// asking user for name and makes a new user and the room name
if (messageForm != null) {
  const name = prompt("Enter Name Please");
  appendMessage("You joined!");
  socket.emit("new-user", roomName, name);
  // send users msg to the room & clears msg input field
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit("send-chat-message", roomName, message);
    messageInput.value = "";
  });
}

// when room's made, it makes a div showing room name and a link to join
socket.on("room-created", (room) => {
  const roomElement = document.createElement("div");
  roomElement.innerText = room;
  const roomLink = document.createElement("a");
  roomLink.href = `/${room}`;
  roomLink.innerText = "join";
  roomContainer.append(roomElement);
  roomContainer.append(roomLink);
});

// when user connects, it shows their name
socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

// main function for sending user msg
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

// add's msg to chat room
socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

// when user disconnects, it shows they left
socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});
