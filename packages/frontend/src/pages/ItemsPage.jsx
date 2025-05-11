import React from "react";
import "../styles/ItemsPage.css";
import "../styles/global.css";

function ItemsPage() {
  return (
    <div className="items-page">
      <h1 className="header">Box Name</h1>

      <div className="textInput-bar">Text Input</div>
      <div className="add-bar">+</div>
      <div className="mic-bar">mic</div>
      <div className="photo-bar">photo</div>
    </div>
  );
}

export default ItemsPage;
