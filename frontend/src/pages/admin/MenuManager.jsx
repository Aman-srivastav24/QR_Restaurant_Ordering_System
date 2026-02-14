import { useEffect, useState } from "react";
import {
  getAdminMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from "../../api/menuApi";

export default function MenuManager() {

  const [menu, setMenu] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [available, setAvailable] = useState(true);

  const fetchMenu = async () => {
    try {
      const res = await getAdminMenu();
      setMenu(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Add Item
  const handleAdd = async () => {
    try {
      if (!name || !price) return alert("Enter name and price");

      await createMenuItem({
        name,
        price: Number(price)
        , description, imageUrl, available  
      });

      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");
      setAvailable(true);
      fetchMenu();

    } catch (err) {
      console.error(err);
    }
  };

  // Start Edit
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

  // Save Edit
  const handleSave = async () => {
    try {
      await updateMenuItem(editingId, {
        name: editData.name,
        price: Number(editData.price),
        description: editData.description,
        imageUrl: editData.imageUrl,
        available: editData.available
      });

      setEditingId(null);
      fetchMenu();

    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id);
      fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Menu Manager</h1>

      {/* Add Item */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Item Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <label style={{ marginLeft: "10px" }}>
          Available
          <input        type="checkbox"     checked={available} onChange={e => setAvailable(e.target.checked)} />
        </label>


        <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
          Add Item
        </button>
      </div>

      {/* Menu List */}
      {menu.map(item => {

        const isEditing = editingId === item.id;

        return (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px"
            }}
          >

            {isEditing ? (
              <>
                <input
                  value={editData.name || ""}
                  onChange={e => setEditData({ ...editData, name: e.target.value })}
                />

                <input
                  type="number"
                  value={editData.price || ""}
                  onChange={e => setEditData({ ...editData, price: e.target.value })}
                />

                <input
                  placeholder="Description"
                  value={editData.description || ""}
                  onChange={e => setEditData({ ...editData, description: e.target.value })}
                />

                <input
                  placeholder="Image URL"
                  value={editData.imageUrl || ""}
                  onChange={e => setEditData({ ...editData, imageUrl: e.target.value })}
                />

                <label>
                  Available
                  <input
                    type="checkbox"
                    checked={editData.available}
                    onChange={e =>
                      setEditData({ ...editData, available: e.target.checked })
                    }
                  />
                </label>

                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>

              </>
            ) : (
              <>
                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>
                <p>{item.description}</p>
                <p>Status: {item.available ? "Available" : "Disabled"}</p>

                <button onClick={() => startEdit(item)}>Edit</button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </>
            )}

          </div>
        );
      })}
    </div>
  );
}
