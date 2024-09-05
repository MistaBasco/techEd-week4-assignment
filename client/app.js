const guestBookContainer = document.getElementById("guest-book");
// Swap between serverURLs when running locally/live
const serverURL = "Http://localhost";
// const serverURL = "insert render server url here";

const form = document.getElementById("gb-form");

async function getGuestBookData() {
  const promise = await fetch(serverURL + ":8080/messages");
  promiseData = await promise.json();
  console.log(promiseData);
  guestBookContainer.innerHTML = "";
  promiseData.forEach((message) => {
    //Declare html elements and assign classes accordingly
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    const senderNameContainer = document.createElement("div");
    senderNameContainer.classList.add("container");

    const senderNameLabel = document.createElement("h2");
    senderNameLabel.innerText = "Sender Name:       ";

    const senderName = document.createElement("h3");
    senderName.innerText = message.sendername;

    senderNameContainer.appendChild(senderNameLabel);
    senderNameContainer.appendChild(senderName);

    const senderRoomContainer = document.createElement("div");
    senderRoomContainer.classList.add("container");

    const senderRoomLabel = document.createElement("h2");
    senderRoomLabel.innerText = "Sender Room:       ";

    const senderRoom = document.createElement("h3");
    senderRoom.innerText = message.senderroom;

    senderRoomContainer.appendChild(senderRoomLabel);
    senderRoomContainer.appendChild(senderRoom);

    const receiverNameContainer = document.createElement("div");
    receiverNameContainer.classList.add("container");

    const receiverNameLabel = document.createElement("h2");
    receiverNameLabel.innerText = "Receiver Name:    ";

    const receiverName = document.createElement("h3");
    receiverName.innerText = message.receivername;

    receiverNameContainer.appendChild(receiverNameLabel);
    receiverNameContainer.appendChild(receiverName);

    const receiverRoomContainer = document.createElement("div");
    receiverRoomContainer.classList.add("container");

    const receiverRoomLabel = document.createElement("h2");
    receiverRoomLabel.innerText = "Receiver Room:    ";

    const receiverRoom = document.createElement("h3");
    receiverRoom.innerText = message.receiverroom;

    receiverRoomContainer.appendChild(receiverRoomLabel);
    receiverRoomContainer.appendChild(receiverRoom);

    const messageBodyContainer = document.createElement("div");
    messageBodyContainer.classList.add("container");

    const messageBodyLabel = document.createElement("h2");
    messageBodyLabel.innerText = "Message:                ";

    const messageBody = document.createElement("h3");
    messageBody.innerText = message.message;

    messageBodyContainer.appendChild(messageBodyLabel);
    messageBodyContainer.appendChild(messageBody);

    messageContainer.appendChild(senderNameContainer);
    messageContainer.appendChild(senderRoomContainer);
    messageContainer.appendChild(receiverNameContainer);
    messageContainer.appendChild(receiverRoomContainer);
    messageContainer.appendChild(messageBodyContainer);
    guestBookContainer.appendChild(messageContainer);
  });
}
getGuestBookData();

async function postGuestBookData(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  await fetch(serverURL + ":8080/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const inputText = document.querySelectorAll(".input-text");
  form.reset();
  getGuestBookData();
}

form.addEventListener("submit", postGuestBookData);
