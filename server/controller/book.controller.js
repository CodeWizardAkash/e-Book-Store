import Book from "../models/book.model.js";

// GET /api/books
export const getAllBooks = async (req, res) =>{
    try{
        const books = await Book.find();

        res.status(200).json({
            success: true,
            count: books.length,
            books,
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

// GET /api/books/:id
export const getBookById = async (req, res)=>{
    try{
        const book = await Book.findById(req.params.id);

        if(!book){
            return res.status(404).json({
                success: false,
                message: "Book not found",
            })
        }

        res.status(200).json({
            success: true,
            book,
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

// GET /api/books/free
export const getFreeBooks = async (req, res) => {
  try {
    const books = await Book.find({ price: 0 });

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/books/category/:category
export const getBooksByCategory = async (req, res)=>{
    try{
        const books = await Book.find({
            category: req.param.category,
        })

        res.status(200).json({
            success: true,
            books,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// POST /api/books
export const createBook = async(req, res)=>{
    try{
      const book = await Book.create(req.body);

      res.status(201).json({
          success: true,
          message: "Book created successfully",
          book,
      });
    }catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
}

// PUT /api/books/:id
export const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/books/:id
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};