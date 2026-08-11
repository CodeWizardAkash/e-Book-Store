import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getCart } from "../services/cart.service";
import API from "../services/api.service";
import { placeOrder } from "../services/order.service";

function Checkout() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // If bookId exists -> Buy Now
  // If bookId doesn't exist -> Cart Checkout
  const bookId = searchParams.get("bookId");

  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // =========================
  // FETCH CHECKOUT DATA
  // =========================

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        setLoading(true);

        // =========================
        // BUY NOW
        // /checkout?bookId=ABC
        // =========================
        if (bookId) {
          console.log("Buy Now:", bookId);

          const res = await API.get(`/books/${bookId}`);

          console.log("Book response:", res.data);

          const book = res.data.book || res.data;

          if (!book) {
            setItems([]);
            return;
          }

          setItems([
            {
              book: book,
              quantity: 1,
            },
          ]);
        }

        // =========================
        // CART CHECKOUT
        // /checkout
        // =========================
        else {
          console.log("Cart Checkout");

          const data = await getCart();

          console.log("Cart response:", data);

          // Your backend currently returns:
          // { success: true, items: [...], cartCount }

          setItems(data.items || data.cart?.items || []);
        }
      } catch (error) {
        console.log(
          "Checkout error:",
          error.response?.data || error.message
        );

        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, [bookId]);

  // =========================
  // QUANTITY
  // =========================

  const increaseQuantity = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (index) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  };

  const handleQuantityChange = (index, value) => {
    const quantity = Number(value);

    if (!quantity || quantity < 1) {
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  // =========================
  // ADDRESS
  // =========================

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // TOTAL
  // =========================

  const total = items.reduce(
    (sum, item) =>
      sum + Number(item.book.price) * item.quantity,
    0
  );

  // =========================
  // PLACE ORDER
  // =========================

  const handlePlaceOrder = async () => {
  try {
    const requiredFields = [
      "fullname",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];

    const isAddressComplete = requiredFields.every(
      (field) => address[field]?.trim() !== ""
    );

    if (!isAddressComplete) {
      alert("Please fill complete address");
      return;
    }

    if (items.length === 0) {
      alert("Your checkout is empty");
      return;
    }

    const orderData = {
      address: {
        fullname: address.fullname,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
      },

      items: items.map((item) => ({
        book: item.book._id,
        quantity: item.quantity,
      })),
    };

    console.log("FINAL ORDER DATA:", orderData);

    const data = await placeOrder(orderData);

    console.log("ORDER RESPONSE:", data);

    if (data.success) {
      alert("Order placed successfully!");
      navigate("/orders");
    }

  } catch (error) {
    console.log(
      "Place order error:",
      error.response?.data || error.message
    );
  }
};

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-24 p-5">
        <h2 className="text-2xl font-bold">
          Loading checkout...
        </h2>
      </div>
    );
  }

  // =========================
  // EMPTY CHECKOUT
  // =========================

  if (items.length === 0) {
    return (
      <div className="max-w-5xl mx-auto mt-24 p-5 text-center">
        <h2 className="text-2xl font-bold mb-5">
          Your checkout is empty
        </h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/books")}
        >
          Browse Books
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-24 p-5">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* =========================
            LEFT SIDE
        ========================= */}

        <div className="md:col-span-2">

          {/* Order Summary */}
          <div className="border rounded-lg p-5">

            <h2 className="text-2xl font-bold mb-5">
              Order Summary
            </h2>

            {items.map((item, index) => (
              <div
                key={item.book._id}
                className="flex justify-between items-center border-b pb-5 mb-5"
              >
                <div className="flex gap-5">
                {/* Book Image */}
                <img
                  src={item.book.image}
                  alt={item.book.title}
                  className="w-24 h-32 object-cover rounded"
                />

                {/* Book Details */}
                <div className="flex-1">

                  <h3 className="font-bold text-lg">
                    {item.book.title}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    ₹{item.book.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 mt-4">

                    <span className="font-medium">
                      Quantity:
                    </span>

                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        decreaseQuantity(index)
                      }
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          e.target.value
                        )
                      }
                      className="input input-bordered w-16 text-center"
                    />

                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        increaseQuantity(index)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>
                </div>  

                {/* Item Total */}
                <div className="font-bold text-lg">
                  ₹
                  {Number(item.book.price) *
                    item.quantity}
                </div>

              </div>
            ))}

          </div>

          {/* =========================
              ADDRESS
          ========================= */}

          <div className="border rounded-lg p-5 mt-6">

            <h2 className="text-2xl font-bold mb-5">
              Delivery Address
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={address.fullname}
                onChange={handleAddressChange}
                className="input input-bordered outline-none w-full"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={address.phone}
                onChange={handleAddressChange}
                className="input input-bordered outline-none w-full"
              />

              <textarea
                name="address"
                placeholder="Address"
                value={address.address}
                onChange={handleAddressChange}
                className="textarea textarea-bordered outline-none w-full md:col-span-2"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleAddressChange}
                className="input input-bordered outline-none w-full"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleAddressChange}
                className="input input-bordered outline-none w-full"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={address.pincode}
                onChange={handleAddressChange}
                className="input input-bordered outline-none w-full"
              />

            </div>

          </div>

        </div>

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="border rounded-lg p-5 h-fit shadow">

          <h2 className="text-2xl font-bold mb-5">
            Price Details
          </h2>

          <div className="flex justify-between mb-3">
            <span>Items</span>

            <span>
              {items.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>

            <span>₹{total}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Delivery</span>

            <span className="text-green-600">
              Free
            </span>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span>₹{total}</span>
          </div>

          <button
            className="btn btn-primary w-full mt-6"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>

        </div>

      </div>
    </div>
  );
}

export default Checkout;