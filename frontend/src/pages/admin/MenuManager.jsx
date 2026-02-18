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

  const handleAdd = async () => {
    try {
      if (!name || !price) return alert("Enter name and price");

      await createMenuItem({
        name,
        price: Number(price),
        description,
        imageUrl,
        available
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

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

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

  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id);
      fetchMenu();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Menu Manager
      </h1>

      {/* Add Item */}
      <div className="bg-white border rounded-xl p-4 shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Item Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Price"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Image URL"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={available}
              onChange={e => setAvailable(e.target.checked)}
            />
            Available
          </label>

        </div>

        <button
          onClick={handleAdd}
          className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:opacity-90 active:scale-95 transition"
        >
          Add Item
        </button>
      </div>

      {/* Menu List */}
      <div className="flex flex-col gap-4">
        {menu.map(item => {

          const isEditing = editingId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >

              {isEditing ? (
                <div className="flex flex-col gap-3">

                  <input
                    className="border rounded-lg px-3 py-2"
                    value={editData.name || ""}
                    onChange={e => setEditData({ ...editData, name: e.target.value })}
                  />

                  <input
                    className="border rounded-lg px-3 py-2"
                    type="number"
                    value={editData.price || ""}
                    onChange={e => setEditData({ ...editData, price: e.target.value })}
                  />

                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder="Description"
                    value={editData.description || ""}
                    onChange={e => setEditData({ ...editData, description: e.target.value })}
                  />

                  <input
                    className="border rounded-lg px-3 py-2"
                    placeholder="Image URL"
                    value={editData.imageUrl || ""}
                    onChange={e => setEditData({ ...editData, imageUrl: e.target.value })}
                  />

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={editData.available}
                      onChange={e =>
                        setEditData({ ...editData, available: e.target.checked })
                      }
                    />
                    Available
                  </label>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="border px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col gap-2">

                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-700">₹ {item.price}</p>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <p className="text-sm">
                    Status:{" "}
                    <span className={item.available ? "text-green-600" : "text-red-500"}>
                      {item.available ? "Available" : "Disabled"}
                    </span>
                  </p>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="bg-black text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="border border-red-400 text-red-500 px-4 py-2 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
