import React from "react";
import "../styles/ItemsPage.css";
import "../styles/global.css";

function ItemsPage() {
  return (
    <div className="items-page">
      <h1 className="header">Box Name</h1>
      <div className="textInput-bar">
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
  );
}

export default ItemsPage;
