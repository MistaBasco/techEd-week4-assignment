// IMPORTS
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

//SERVER SETUP
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
// ROUTES

app.get("/", (request, response) => {
  response.json("This is the home route. Wow. So Amaze. So Incredulous");
});

app.get("/messages", async (request, response) => {
  const promise = await db.query("SELECT * FROM guestbook");
  response.json(promise.rows);
});
app.post("/messages", async (request, response) => {
  //console.log(request.body);
  const newMessage = await db.query(
    "INSERT INTO guestbook (sendername, senderroom, receivername, receiverroom, message) VALUES ($1, $2, $3, $4, $5)",
    [
      request.body.sendername,
      request.body.senderroom,
      request.body.receivername,
      request.body.receiverroom,
      request.body.messagebody,
    ]
  );
  response.json(newMessage);
});

app.listen(8080, () => console.log("Server is listening on port 8080..."));
