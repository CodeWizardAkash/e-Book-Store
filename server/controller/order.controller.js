import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import Book from "../models/book.model.js";

export const placeOrder = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);
    console.log("ADDRESS RECEIVED:", req.body.address);

    const userId = req.user.id;

    const { address, items } = req.body;

    console.log("Address received:", address);
    console.log("Items received:", items);
    
    // 1. Validate Address
    if (
      !address ||
      !address.fullname?.trim() ||
      !address.phone?.trim() ||
      !address.address?.trim() ||
      !address.city?.trim() ||
      !address.state?.trim() ||
      !address.pincode?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete address",
      });
    }

    // 2. Validate Items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items to order",
      });
    }
   
    // 3. Get Books
    const bookIds = items.map((item) => item.book);

    const books = await Book.find({
      _id: { $in: bookIds },
    });
    
    // 4. Create Order Items
    const orderItems = items.map((item) => {
      const book = books.find(
        (book) => book._id.toString() === item.book.toString()
      );

      if (!book) {
        throw new Error("Book not found");
      }

      return {
        book: book._id,
        title: book.title,
        price: book.price,
        quantity: item.quantity,
      };
    });
    
    // 5. Calculate Total
    const totalAmount = orderItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
    
    // 6. Create Order
    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      address,
      status: "pending",
      paymentStatus: "pending",
    });

    // 7. Clear Cart ONLY for
    // Cart Checkout
    const cart = await Cart.findOne({
      user: userId,
    });

    if (cart) {
      cart.items = cart.items.filter(
        (cartItem) =>
          !items.some(
            (orderItem) =>
              orderItem.book.toString() ===
              cartItem.book.toString()
          )
      );

      await cart.save();
    }
    
    // 8. Response
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("Place order error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET /api/orders
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({
      user: userId,
    })
      .populate("items.book")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      user: userId,
    }).populate("items.book");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("Get order error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};