import "../styles/ItemsTable.css";

function ItemsTable({ itemsData, onDeleteItem }) {
  return (
    <table className="items-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {itemsData.map((item) => {
          return (
            <tr key={item._id} className="table-rows">
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
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
