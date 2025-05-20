import "../styles/ItemsTable.css";

function ItemsTable({ itemsData }) {
  return (
    <table className="items-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {itemsData.map((item) => {
          return (
            <tr key={item._id} className="table-rows">
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ItemsTable;
