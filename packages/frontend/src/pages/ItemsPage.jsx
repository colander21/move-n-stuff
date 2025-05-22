import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ItemsPage.css";
import ItemsTable from "../components/ItemsTable.jsx";
import "../styles/global.css";

function ItemsPage() {
  const { boxID } = useParams();
  const [items, setItems] = useState([]);
  const API_PREFIX = import.meta.env.VITE_API_BASE_URL;

  const [isEditing, setIsEditing] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const url = boxID
      ? `${API_PREFIX}/items?boxID=${boxID}`
      : `${API_PREFIX}/items`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Failed to fetch items:", err));
  }, [boxID]);

  function addItem(newItem) {
    fetch(`${API_PREFIX}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add item");
        return res.json();
      })
      .then(() => {
        const url = boxID
          ? `${API_PREFIX}/items?boxID=${boxID}`
          : `${API_PREFIX}/items`;

        return fetch(url)
          .then((res) => res.json())
          .then((data) => setItems(data));
      })
      .catch((err) => console.error(err));
  }

  function deleteItem(itemId) {
    fetch(`${API_PREFIX}/items/${itemId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete item");
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
      })
      .catch((err) => console.error(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      boxID,
      itemName,
      quantity,
      category,
    };
    addItem(newItem);

    setItemName("");
    setQuantity(1);
    setCategory("");
  }
  return (
    <div className="items-page">
      <h1 className="header">Box Name</h1>
      <div className="input-bar-container">
        <div
          className="textInput-bar"
          style={{ cursor: "pointer" }}
          onClick={() => setIsEditing(!isEditing)}
        >
          <span className="material-icons">edit</span> {/* Edit icon */}
        </div>
        <div className="add-bar">
          <span className="material-icons">add_box</span> {/* Add Box icon */}
        </div>
        <div className="mic-bar">
          <span className="material-icons">mic</span> {/* Mic icon */}
        </div>
        <div className="photo-bar">
          <span className="material-icons">camera_alt</span> {/* Camera icon */}
        </div>
      </div>
      {isEditing && (
        <form onSubmit={handleSubmit} className="add-item-form">
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <button type="submit">Add Item</button>
        </form>
      )}
      <ItemsTable itemsData={items} onDeleteItem={deleteItem} />
    </div>
  );
}

export default ItemsPage;
