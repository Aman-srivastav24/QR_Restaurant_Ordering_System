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
    return <h2 style={{ padding: "20px" }}>Cart is empty</h2>;
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
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {cartItems.map(item => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px"
          }}
        >

          <h3>{item.name}</h3>
          <p>₹ {item.price}</p>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>

            <button
              style={{ marginLeft: "20px" }}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>

          </div>

        </div>
      ))}

      <h2>Total: ₹ {totalPrice}</h2>

      <div style={{ marginTop: "20px" }}>
  <input
    type="number"
    placeholder="Table Number"
    value={tableNo}
    onChange={(e) => setTableNo(e.target.value)}
  />

  <input
    placeholder="Customer Name (Optional)"
    value={customerName}
    onChange={(e) => setCustomerName(e.target.value)}
    style={{ marginLeft: "10px" }}
  />
</div>

    <button
  style={{ padding: "10px 20px", marginTop: "20px" }}
  onClick={handlePlaceOrder}
>
  Place Order
</button>


    </div>
  );
}
