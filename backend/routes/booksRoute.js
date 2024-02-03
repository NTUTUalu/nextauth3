import express from 'express';
import {Book} from '../models/bookModel.js'
const router = express.Router()

//route to save a new book
router.post("/", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "send all required fields: title, author, publishYear",
        });
      }
      //below we create a variable for our new book
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
      };
      const book = await Book.create(newBook);
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //get all books from the database
  router.get("/", async (request, response) => {
    try {
      const books = await Book.find({});
  
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //get one book from the database by id
  router.get("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const book = await Book.findById(id);
  
      return response.status(200).json(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // the code below is for getting books in respect to the year they were published
  // app.get("/books/:publishYear", async (request, response) => {
  //     try {
  //       const { publishYear } = request.params;
  //       const book = await Book.find({publishYear:publishYear});
  
  //       return response.status(200).json(
  //         book
  //       );
  //     } catch (error) {
  //       console.log(error.message);
  //       response.status(500).send({ message: error.message });
  //     }
  //   });
  
  //route for update a book
  router.put("/:id", async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "Send all required fields: title,author, publishYear",
        });
      }
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: "book not found" });
      }
  
      return response.status(200).send({ message: "book updated successfully" });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  //now we want to delete a book
  router.delete("/:id", async (request,response) => {
      try {
          const { id } = request.params;
      
          const result = await Book.findByIdAndDelete(id);
      
          if (!result) {
            return response.status(404).json({ message: "book not found" });
          }
      
          return response.status(200).send({ message: "book deleted successfully" });
        } catch (error) {
          console.log(error.message);
          response.status(500).send({ message: error.message });
        }
  })

  export default router;