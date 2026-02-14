import { useEffect, useState } from "react";
import { getMenu } from "../../api/menuApi";
import { useCart } from "../../context/CardContext";
import{Link} from "react-router-dom";
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

  if (loading) return <h2>Loading menu...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Menu</h1>
         <Link to="/cart">Go to Cart</Link>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {menu.map(item => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              width: "200px"
            }}
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: "100%", height: "120px", objectFit: "cover" }}
              />
            )}

            <h3>{item.name}</h3>
            <p>₹ {item.price}</p>
            <p>{item.description}</p>

            <button
              onClick={() =>
                addToCart({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  imageUrl: item.imageUrl
                })
              }
            >
              Add To Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
