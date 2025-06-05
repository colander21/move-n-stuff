import { useState } from "react";
import "../styles/ItemsTable.css";

function ItemsTable({ itemsData, onDeleteItem, onUpdateQuantity }) {
  const [steps, setSteps] = useState({});

  const handleStepChange = (itemId, value) => {
    const intValue = Math.max(1, Number(value));
    setSteps((prev) => ({ ...prev, [itemId]: intValue }));
  };

  const increment = (item) => {
    const step = steps[item._id] || 1;
    onUpdateQuantity(item._id, item.quantity + step);
  };

  const decrement = (item) => {
    const step = steps[item._id] || 1;
    const newQuantity = Math.max(0, item.quantity - step);
    onUpdateQuantity(item._id, newQuantity);
  };

  return (
    <table className="items-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Adjust Quantity</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {itemsData.map((item) => {
          const stepValue = steps[item._id] || 1;
          return (
            <tr key={item._id} className="table-rows">
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => decrement(item)}>-</button>
                <input
                  type="number"
                  min="1"
                  value={stepValue}
                  onChange={(e) => handleStepChange(item._id, e.target.value)}
                  style={{ width: "50px", margin: "0 5px" }}
                />
                <button onClick={() => increment(item)}>+</button>
              </td>
              <td>
                <button
                  className="delete-icon"
                  onClick={() => onDeleteItem(item._id)}
                  aria-label="Delete item"
                >
                  <span className="material-icons">delete</span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ItemsTable;
