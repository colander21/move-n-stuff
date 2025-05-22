import "../styles/Grid.css";
import "../styles/ContainersPage.css";
import Select from "react-select";
// import "../styles/global.css";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function ContainersPage() {
  const API_PREFIX = import.meta.env.VITE_API_BASE_URL;

  const [containers, setContainers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // const [searchText, setSearchText] = useState([]);
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
        setContainers(json);
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
            onClick={() => navigate(`/boxes/${item._id}`, { state: item._id })}
          >
            {item.containerName}
          </div>
        ))}
      </div>
    );
  }

  function Header() {
    return <div className="header">Your Containers</div>;
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
            type: "item",
          })),
        ]}
        onChange={(selected) => {
          if (!selected) return;

          // ****Need to make work logically for how we navigate pages with id numbers after the slashs****

          // console.log(selected)
          // if (selected.type === "box") {
          //   navigate(`/boxes/${selected.value}`);
          // } else if (selected.type === "container") {
          //   navigate(`/containers/${selected.value}`);
          // } else if (selected.type === "item") {
          //   navigate(`/items/${selected.value}`);
          // }
        }}
      />
      <Containers />
    </div>
  );
}

export default ContainersPage;
