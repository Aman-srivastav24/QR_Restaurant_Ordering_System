import { useCart } from "../../context/CardContext";
import { useState } from "react";
import { placeOrder } from "../../api/orderApi";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [tableNo, setTableNo] = useState("");
  const [customerName, setCustomerName] = useState("");

  const navigate = useNavigate();

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    totalPrice,
    clearCart
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-lg font-semibold">Cart is empty</h2>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    try {
      const payload = {
        tableNo: Number(tableNo),
        customerName,
        items: cartItems.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity
        }))
      };

      await placeOrder(payload);

      clearCart();
      navigate("/order-success");

    } catch (error) {
      console.error("Order failed", error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="px-4 py-5 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Cart Items */}
      <div className="flex flex-col gap-4">
        {cartItems.map(item => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-700 font-medium mb-3">₹ {item.price}</p>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>

                <span className="px-4">{item.quantity}</span>

                <button
                  className="px-3 py-1 text-lg hover:bg-gray-100"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                className="text-red-500 text-sm hover:underline ml-auto sm:ml-0"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-6 text-xl font-semibold">
        Total: ₹ {totalPrice}
      </div>

      {/* Inputs */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          placeholder="Table Number"
          value={tableNo}
          onChange={(e) => setTableNo(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          placeholder="Customer Name (Optional)"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Place Order Button */}
      <button
        className="w-full sm:w-auto mt-6 bg-black text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 active:scale-95 transition"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}
