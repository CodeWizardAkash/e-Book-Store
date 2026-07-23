import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateCart,
  clearCart,
} from "../services/cart.service";

function Cart() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data.cart.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrease = async (item) => {
    await updateCart(item.book._id, item.quantity + 1);
    fetchCart();
  };

  const handleDecrease = async (item) => {
    if (item.quantity === 1) return;

    await updateCart(item.book._id, item.quantity - 1);
    fetchCart();
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    fetchCart();
  };

  const handleClear = async () => {
    await clearCart();
    fetchCart();
  };

  const total = cart.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto mt-24 p-5">

      <h1 className="text-3xl font-bold mb-6">
        My Cart
      </h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.book._id}
              className="flex justify-between items-center border p-4 rounded-lg mb-4"
            >
              <div className="flex gap-4">

                <img
                  src={item.book.image}
                  alt=""
                  className="w-24 h-32 object-cover rounded"
                />

                <div>
                  <h2 className="font-bold">
                    {item.book.title}
                  </h2>

                  <p>₹{item.book.price}</p>

                  <div className="flex gap-3 mt-3">

                    <button
                      className="btn"
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="btn"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>

                  </div>
                </div>
              </div>

              <button
                className="btn btn-error"
                onClick={() => handleRemove(item.book._id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-8 flex justify-between items-center">

            <h2 className="text-2xl font-bold">
              Total: ₹{total}
            </h2>

            <button
              className="btn btn-warning"
              onClick={handleClear}
            >
              Clear Cart
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;