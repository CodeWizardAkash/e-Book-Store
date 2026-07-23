import Cart from "../models/cart.model.js";
import Book from "../models/book.model.js";

// POST /api/cart/add
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log(req.user);

    const { bookId, quantity } = req.body;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.book.toString() === bookId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({
        book: bookId,
        quantity: quantity || 1,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Book added to cart",
      cart,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// GET /api/cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("items.book");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: [],
        cartCount: 0,
      });
    }

    const cartCount = cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    res.status(200).json({
      success: true,
      cart,
      cartCount,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// PUT /api/cart/update/:bookId
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { bookId } = req.params;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.book.toString() === bookId
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Book not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// DELETE /api/cart/remove/:bookId
export const removeFromCart = async (req, res) => {
  try {
    const { bookId } = req.params;

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.book.toString() !== bookId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Book removed from cart",
      cart,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



// DELETE /api/cart/clear
export const clearCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user.id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};