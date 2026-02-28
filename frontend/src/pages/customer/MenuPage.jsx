import { useEffect, useState } from "react";
import { getMenu } from "../../api/menuApi";
import { useCart } from "../../context/CardContext";
import { Link } from "react-router-dom";

export default function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getMenu();
        setMenu(res.data);
      } catch (error) {
        console.error("Menu fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-lg font-semibold">Loading menu...</h2>
      </div>
    );

  return (
    <div className="px-4 py-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu - Aman Restaurant</h1>
        <Link
          to="/cart"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm"
        >
          Go to Cart
        </Link>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menu.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700 font-medium">₹ {item.price}</p>
              <p className="text-gray-500 text-sm line-clamp-2">
                {item.description}
              </p>

              <button
                className="mt-2 bg-black text-white py-2 rounded-lg text-sm hover:opacity-90 active:scale-95 transition"
                onClick={() =>
                  addToCart({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    imageUrl: item.imageUrl,
                  })
                }
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
