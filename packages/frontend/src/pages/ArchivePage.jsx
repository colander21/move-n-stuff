import { useState } from "react";
import "../styles/ArchivePage.css";
import ItemsTable from "../components/ItemsTable";

function ArchivePage() {
  // const [items, setItems] = useState([
  // setItems is unused but will be added back when we begin using real data
  const [items] = useState([
    {
      _id: 0,
      name: "Toothbrush",
      quantity: 1,
    },
    {
      _id: 1,
      name: "Socks",
      quantity: 6,
    },
    {
      _id: 2,
      name: "Screwdriver",
      quantity: 1,
    },
  ]);

  return (
    <>
      <h1 className="archive-header">The Archive</h1>
      <p className="archive-welcome">
        Welcome to the archive, this is where your items that you don't want to
        store in containers can go
      </p>
      <ItemsTable itemsData={items} />
    </>
  );
}

export default ArchivePage;
