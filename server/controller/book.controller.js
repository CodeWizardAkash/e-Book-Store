import Book from "../models/book.model.js";
import Order from "../models/order.model.js";

// GET /api/books
export const getAllBooks = async (req, res) =>{
    try{
        const {search} = req.query;
        let filter ={};

        if(search){
          filter ={
            $or: [
              { 
                title: {
                  $regex: search,
                  $options: "i",
                }
              },
              {
                author: {
                  $regex: search,
                  $options: "i",
                },
              },
            ]
          }
        }

        const books = await Book.find(filter);

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


// GET /api/books/popular
export const getPopularBooks = async (req, res) => {
  try {
    const popularBooks = await Order.aggregate([
      {
        $unwind: "$items",
      },

      {
        $group: {
          _id: "$items.book",
          totalSold: {
            $sum: "$items.quantity",
          },
        },
      },

      {
        $sort: {
          totalSold: -1,
        },
      },

      {
        $limit: 8,
      },
    ]);

    const bookIds = popularBooks.map((item) => item._id);

    const books = await Book.find({
      _id: { $in: bookIds },
    });

    const result = popularBooks
      .map((popular) => {
        const book = books.find(
          (book) =>
            book._id.toString() === popular._id.toString()
        );

        if (!book) return null;

        return {
          ...book.toObject(),
          totalSold: popular.totalSold,
        };
      })
      .filter(Boolean);

    res.status(200).json({
      success: true,
      books: result,
    });
  } catch (error) {
    console.error("POPULAR BOOKS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const createManyBooks = async (req, res) => {
  try {
    const books = req.body;

    if (!Array.isArray(books)) {
      return res.status(400).json({
        success: false,
        message: "Request body must be an array of books",
      });
    }

    const insertedBooks = await Book.insertMany(books);

    res.status(201).json({
      success: true,
      message: `${insertedBooks.length} books inserted successfully`,
      books: insertedBooks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};