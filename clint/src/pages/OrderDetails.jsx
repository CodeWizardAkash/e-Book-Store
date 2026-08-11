import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderById } from "../services/order.service.js";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data.order);
      } catch (error) {
        console.log(
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl font-bold">
          Order not found
        </h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/orders")}
        >
          My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-24 p-5">

      {/* Heading */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Order Details
          </h1>

          <p className="text-gray-500 mt-1">
            Order ID: {order._id}
          </p>
        </div>

        <button
          className="btn btn-outline"
          onClick={() => navigate("/orders")}
        >
          My Orders
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="md:col-span-2">

          {/* Order Status */}
          <div className="border rounded-lg p-5 mb-6">

            <h2 className="text-xl font-bold mb-4">
              Order Status
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div>
                <p className="text-gray-500">
                  Order Status
                </p>

                <span className="badge badge-warning mt-1">
                  {order.status}
                </span>
              </div>

              <div>
                <p className="text-gray-500">
                  Payment Status
                </p>

                <span className="badge badge-info mt-1">
                  {order.paymentStatus}
                </span>
              </div>

            </div>

          </div>


          {/* Ordered Items */}
          <div className="border rounded-lg p-5">

            <h2 className="text-2xl font-bold mb-5">
              Ordered Items
            </h2>

            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex gap-5 items-center border-b pb-5 mb-5 last:border-b-0"
              >

                {/* Book Image */}
                {item.book?.image && (
                  <img
                    src={item.book.image}
                    alt={item.title}
                    className="w-24 h-32 object-cover rounded"
                  />
                )}

                {/* Book Information */}
                <div className="flex-1">

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Price: ₹{item.price}
                  </p>

                  <p className="text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                </div>

                {/* Item Total */}
                <div className="font-bold">
                  ₹{item.price * item.quantity}
                </div>

              </div>
            ))}

          </div>


          {/* Delivery Address */}
          <div className="border rounded-lg p-5 mt-6">

            <h2 className="text-2xl font-bold mb-5">
              Delivery Address
            </h2>

            <div className="space-y-2">

              <p>
                <span className="font-semibold">
                  Name:
                </span>{" "}
                {order.address.fullname}
              </p>

              <p>
                <span className="font-semibold">
                  Phone:
                </span>{" "}
                {order.address.phone}
              </p>

              <p>
                <span className="font-semibold">
                  Address:
                </span>{" "}
                {order.address.address}
              </p>

              <p>
                <span className="font-semibold">
                  City:
                </span>{" "}
                {order.address.city}
              </p>

              <p>
                <span className="font-semibold">
                  State:
                </span>{" "}
                {order.address.state}
              </p>

              <p>
                <span className="font-semibold">
                  Pincode:
                </span>{" "}
                {order.address.pincode}
              </p>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}
        <div className="border rounded-lg p-5 h-fit shadow">

          <h2 className="text-2xl font-bold mb-5">
            Order Summary
          </h2>

          <div className="flex justify-between mb-3">
            <span>Items</span>

            <span>
              {order.items.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>

            <span>
              ₹{order.totalAmount}
            </span>
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

            <span>
              ₹{order.totalAmount}
            </span>
          </div>

          {order.createdAt && (
            <p className="text-sm text-gray-500 mt-5">
              Ordered on:{" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default OrderDetails;