// init socket.io
const socket = io();

// Get the input and button elements
const messageInput = document.querySelector("#message-input");
const button = document.querySelector("button");
const nameInput = document.querySelector("#name-input");

// Function to handle sending a message
function sendMessage() {
  // Get the message text from the input
  const message = messageInput.value;

  // TODO send message to server
  socket.emit("newMessage", {
    sender: nameInput.value,
    message: message,
  });
  console.log(message);

  // Clear the input field
  messageInput.value = "";
}

const createNewMessage = (data) => {
  // Create a new message elemt
  const { sender, message } = data;
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.textContent = sender + ": " + message;

  // Append the new message element to the chat container
  const messageContainer = document.querySelector(".message-container");
  messageContainer.appendChild(messageElement);
};

// Add event listener to the button for sending a message
button.addEventListener("click", sendMessage);

// Add event listener to the input for sending a message when Enter key is pressed
messageInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

socket.on("dispenseMessage", (data) => {
  createNewMessage(data);
});
