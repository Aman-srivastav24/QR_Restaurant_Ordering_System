import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
        Admin Dashboard
      </h1>

      <div className="flex flex-col gap-5 w-full max-w-xs">
        
        <Link
          to="/admin/menu"
          className="bg-black text-white text-center py-3 rounded-xl text-lg font-medium hover:opacity-90 active:scale-95 transition"
        >
          Manage Menu
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white border border-black text-black text-center py-3 rounded-xl text-lg font-medium hover:bg-black hover:text-white transition"
        >
          View Orders
        </Link>

      </div>

    </div>
  );
}
