import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>✅ Order Placed Successfully</h1>
      <p>Your food will be served soon.</p>

      <Link to="/">Back To Menu</Link>
    </div>
  );
}
