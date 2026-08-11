import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/order.service";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();

      console.log("Orders:", data);

      setOrders(data.orders || []);

    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-24 p-5">
        <h2 className="text-2xl font-bold">
          Loading orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-24 p-5">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {/* No Orders */}
      {orders.length === 0 ? (
        <div className="text-center py-16">

          <h2 className="text-2xl font-bold mb-3">
            No orders yet
          </h2>

          <p className="text-gray-500 mb-5">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/books"
            className="btn btn-primary"
          >
            Browse Books
          </Link>

        </div>
      ) : (

        <div className="space-y-5">

          {orders.map((order) => (

            <div
              key={order._id}
              className="border rounded-lg p-5 shadow-sm"
            >

              {/* Order Header */}

              <div className="flex justify-between items-start mb-5">

                <div>

                  <h2 className="font-bold text-lg">
                    Order #{order._id.slice(-8)}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>


                {/* Status */}

                <span
                  className={`badge ${
                    order.status === "delivered"
                      ? "badge-success"
                      : order.status === "cancelled"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {order.status}
                </span>

              </div>


              {/* Order Items */}

              <div className="space-y-4">

                {order.items.map((item) => (

                  <div
                    key={item._id}
                    className="flex gap-4 items-center"
                  >

                    {/* Book Image */}

                    <img
                      src={
                        item.book?.image ||
                        "/default-book.png"
                      }
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded"
                    />


                    {/* Book Details */}

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm">
                        ₹{item.price} ×{" "}
                        {item.quantity}
                      </p>

                    </div>


                    {/* Item Total */}

                    <div className="font-bold">

                      ₹
                      {item.price *
                        item.quantity}

                    </div>

                  </div>

                ))}

              </div>


              {/* Bottom */}

              <div className="border-t mt-5 pt-5 flex justify-between items-center">

                <div>

                  <span className="text-gray-500">
                    Total
                  </span>

                  <p className="text-xl font-bold">
                    ₹{order.totalAmount}
                  </p>

                </div>


                <Link
                  to={`/orders/${order._id}`}
                  className="btn btn-primary btn-sm"
                >
                  View Details
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyOrders;