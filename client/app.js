//Declarations & Pulls
const guestBookContainer = document.getElementById("guest-book");

// Swap between serverURLs when running locally/live
// const serverURL = "http://localhost:8080";
const serverURL = "https://teched-week4-assignment.onrender.com";

const form = document.getElementById("gb-form");

const snWarning = document.getElementById("sn-warning");
const srWarning = document.getElementById("sr-warning");
const rnWarning = document.getElementById("rn-warning");
const rrWarning = document.getElementById("rr-warning");
const mbWarning = document.getElementById("mb-warning");
const sendernameData = document.getElementById("sendername");
const senderroomData = document.getElementById("senderroom");
const receivernameData = document.getElementById("receivername");
const receiverroomData = document.getElementById("receiverroom");
const messagebodyData = document.getElementById("messagebody");

//Functions
async function getGuestBookData() {
  const promise = await fetch(serverURL + "/messages");
  const promiseData = await promise.json();
  // console.log(promiseData);
  guestBookContainer.innerHTML = "";
  promiseData.forEach((message) => {
    //Declare html elements ,assign classes and append to container divs accordingly
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
    messageBodyLabel.innerText = "Message:               ";

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

  if (
    data.sendername == "" ||
    data.senderroom == "" ||
    data.receivername == "" ||
    data.receiverroom == "" ||
    data.messagebody == ""
  ) {
    alert("Please fill in all fields before posting");
    return;
  }

  await fetch(serverURL + "/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  form.reset();
  getGuestBookData();
}

function validateField(
  field,
  warningElement,
  minValue = null,
  maxValue = null
) {
  const value = field.value.trim(); // Trim to avoid whitespace issues
  if (value === "") {
    warningElement.innerText = "This field is required";
    return false;
  }
  // Check for number field constraints
  if (minValue !== null && maxValue !== null) {
    const numericValue = Number(value);
    if (
      isNaN(numericValue) ||
      numericValue < minValue ||
      numericValue > maxValue
    ) {
      warningElement.innerText = `Value must be between ${minValue} and ${maxValue}`;
      return false;
    }
  }
  warningElement.innerText = ""; // Clear warning if valid
  return true;
}

//Event Listeners
// console.log(form);
console.log(sendernameData);
sendernameData.addEventListener("input", () =>
  validateField(sendernameData, snWarning)
);
senderroomData.addEventListener("input", () =>
  validateField(senderroomData, srWarning, 0, 470)
);
receivernameData.addEventListener("input", () =>
  validateField(receivernameData, rnWarning)
);
receiverroomData.addEventListener("input", () =>
  validateField(receiverroomData, rrWarning, 0, 470)
);
messagebodyData.addEventListener("input", () =>
  validateField(messagebodyData, mbWarning)
);

console.log(form);
form.addEventListener("submit", () => {
  const isSenderNameValid = validateField(sendernameData, snWarning);
  const isSenderRoomValid = validateField(senderroomData, srWarning, 0, 470);
  const isReceiverNameValid = validateField(receivernameData, rnWarning);
  const isReceiverRoomValid = validateField(
    receiverroomData,
    rrWarning,
    0,
    470
  );
  const isMessageBodyValid = validateField(messagebodyData, mbWarning);

  // If all fields are valid, post the data
  if (
    isSenderNameValid &&
    isSenderRoomValid &&
    isReceiverNameValid &&
    isReceiverRoomValid &&
    isMessageBodyValid
  ) {
    postGuestBookData(); // Only post data if validation passes
  } else {
    alert("Please correct the errors in the form before submitting.");
  }
});
