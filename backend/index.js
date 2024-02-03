import express from "express";
import { PORT, MONGO_URL } from "./config.js"; //the file system has to be explicitly stated with ending ".js", otherwise it wont work
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
const app = express();

//middleware for parsing request body
//ensuring that your Express application can handle incoming JSON data from client requests, which you can then use as needed, including passing it to Mongoose for database operations if that's part of your application logic.
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to the channel");
});

app.use('/books', booksRoute);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("App connected successfully to database");

    //we want  the server to run only when connected to the database hence we put the code after we establish connection
    //below is part of our express server
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
