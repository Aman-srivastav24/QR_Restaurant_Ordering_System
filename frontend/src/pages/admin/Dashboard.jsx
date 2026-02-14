import { Link } from "react-router-dom";
export default function Dashboard() {
  return <>
  <h1>Admin Dashboard</h1>
  <Link to="/admin/menu">Manage Menu</Link>
    <br/>
    <Link to="/admin/orders">View Orders</Link>
  </> 
}
