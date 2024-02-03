import express from "express";
import { PORT, MONGO_URL } from "./config.js"; //the file system has to be explicitly stated with ending ".js", otherwise it wont work
import mongoose from "mongoose";
const app = express();

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to the channel");
});

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
