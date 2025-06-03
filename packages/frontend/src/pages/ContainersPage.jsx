import "../styles/Grid.css";
import "../styles/ContainersPage.css";
import Select from "react-select";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import plus_sign from "../images/plus_sign.png";

function ContainersPage() {
  const API_PREFIX = import.meta.env.VITE_API_BASE_URL;

  const [containers, setContainers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const fetchContainers = useCallback(() => {
    const promise = fetch(`${API_PREFIX}/containers`);
    return promise;
  }, [API_PREFIX]);

  const fetchAll = useCallback(
    (searchParameter) => {
      const promise = fetch(`${API_PREFIX}/search?name=${searchParameter}`);
      return promise;
    },
    [API_PREFIX]
  );

  useEffect(() => {
    fetchContainers()
      .then((res) => res.json())
      .then((json) => {
        console.log("Fetch Containers API Response: ", json);
        setContainers([...json, { containerName: plus_sign }]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchContainers]);

  useEffect(() => {
    fetchAll("")
      .then((res) => res.json())
      .then((json) => {
        console.log("Fetch All API Response: ", json);
        setSearchResults(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchAll]);

  function Containers() {
    return (
      <div className="grid-container-pg">
        {containers.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              item.containerName.endsWith(".png")
                ? navigate(`/new-container`, { state: item._id })
                : navigate(`/boxes/${item._id}`);
            }}
          >
            {/* {typeof item.containerName === "string" && */}
            {item.containerName.endsWith(".png") ? (
              <img
                src={item.containerName}
                alt="Add New"
                style={{ width: "125px", height: "125px" }}
              />
            ) : (
              item.containerName
            )}
          </div>
        ))}
      </div>
    );
  }

  function Header() {
    return (
      <div className="container-header-title">
        <h1 className="header-title">Your Containers</h1>
      </div>
    );
  }

  console.log("searchResults.boxes: ", searchResults.boxes);

  console.log("Containers: ", containers);
  return (
    <div>
      <Header />
      <Select
        classNamePrefix="search-bar"
        placeholder="Start typing..."
        options={[
          ...(searchResults.boxes || []).map((box) => ({
            label: `Box: ${box.tag}`,
            value: box._id,
            type: "box",
          })),
          ...(searchResults.containers || []).map((container) => ({
            label: `Container: ${container.containerName}`,
            value: container._id,
            type: "container",
          })),
          ...(searchResults.items || []).map((item) => ({
            label: `Item: ${item.itemName}`,
            value: item._id,
            boxID: item.boxID,
            type: "item",
          })),
        ]}
        styles={{
          control: (base, state) => ({
            ...base,
            backgroundColor: "#f5e6c1",
            borderColor: "#c6a16e",
            borderRadius: "6px",
            boxShadow: state.isFocused
              ? "0 0 0 2px #c6a16e"
              : "0 2px 6px rgba(0, 0, 0, 0.2)",
            fontFamily: "Courier New, monospace",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#7a5c3e",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#fff8e0",
            borderRadius: "6px",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor:
              state.isFocused || state.isSelected ? "#e7c87f" : "#fff8e0",
            color: "#3e3e3e",
            fontFamily: "Courier New, monospace",
          }),
        }}
        onChange={(selected) => {
          if (!selected) return;
          // ****Need to make work logically for how we navigate pages with id numbers after the slashs****

          console.log(selected);

          if (selected.type === "box" && selected.value) {
            navigate(`/items/${selected.value}`);
          } else if (selected.type === "container") {
            navigate(`/boxes/${selected.value}`);
          } else if (selected.type === "item") {
            navigate(`/items/${selected.boxID}`);
          }
        }}
      />
      <Containers />
    </div>
  );
}

export default ContainersPage;
