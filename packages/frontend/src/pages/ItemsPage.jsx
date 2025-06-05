import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ItemsPage.css";
import ItemsTable from "../components/ItemsTable.jsx";
import "../styles/global.css";

function ItemsPage() {
  const { boxID } = useParams();
  const [boxName, setBoxName] = useState("");
  const [items, setItems] = useState([]);
  const [containerID, setContainerID] = useState("");
  const API_PREFIX = import.meta.env.VITE_API_BASE_URL;
  const token = sessionStorage.getItem("token");

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const url = boxID
      ? `${API_PREFIX}/items?boxID=${boxID}`
      : `${API_PREFIX}/items`;

    fetch(url, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Failed to fetch items:", err));
  }, [boxID, API_PREFIX, token]);

  useEffect(() => {
    if (!boxID) return;

    fetch(`${API_PREFIX}/boxes/${boxID}/info`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setContainerID(data.containerID);
        if (data.tag) setBoxName(data.tag);
      })
      .catch((err) => {
        console.log("Failed to fetch box name:", err);
      });
  }, [boxID, API_PREFIX, token]);

  function addItem(newItem) {
    fetch(`${API_PREFIX}/items`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
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

        return fetch(url, {
          headers: {
            Authorization: token,
          },
        })
          .then((res) => res.json())
          .then((data) => setItems(data));
      })
      .catch((err) => console.error(err));
  }

  function deleteItem(itemId) {
    fetch(`${API_PREFIX}/items/${itemId}`, {
      headers: {
        Authorization: token,
      },
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

  function updateItemQuantity(itemId, newQuantity) {
    if (newQuantity < 1) return;

    fetch(`${API_PREFIX}/items/${itemId}`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update quantity");
        return res.json();
      })
      .then((updatedItem) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === itemId
              ? { ...item, quantity: updatedItem.quantity }
              : item
          )
        );
      })
      .catch((err) => console.error(err));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      boxID,
      itemName,
      quantity: Number(quantity),
      category,
    };
    addItem(newItem);

    setItemName("");
    setQuantity(1);
    setCategory("");
  }

  const navigate = useNavigate();

  const handleBackClick = () => {
    if (containerID) {
      navigate(`/boxes/${containerID}`);
    } else {
      console.warn("No containerID available to navigate back to BoxesPage");
    }
  };

  return (
    <div className="items-page">
      <h1 className="header">{boxName}</h1>
      <button className="back-button" onClick={handleBackClick}>
        ← Back to Boxes
      </button>
      <ItemsTable
        itemsData={items}
        onDeleteItem={deleteItem}
        onUpdateQuantity={updateItemQuantity}
      />
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
          min={0}
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
        <button type="submit" aria-label="Add Item" className="add-item-button">
          <span className="material-icons">add</span>
        </button>
      </form>
    </div>
  );
}

export default ItemsPage;
