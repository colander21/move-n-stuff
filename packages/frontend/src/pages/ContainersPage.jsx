import "../styles/Grid.css";
// import "../styles/global.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ContainersPage() {
  const API_PREFIX =
    "move-n-stuff-api-afbzdkabbyb7czb9.westus-01.azurewebsites.net";

  const [containers, setContainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContainers()
      .then((res) => res.json())
      .then((json) => {
        console.log("API Response: ", json);
        setContainers(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function fetchContainers() {
    const promise = fetch(`${API_PREFIX}/containers`);
    return promise;
  }

  console.log("Containers: ", containers);
  // console.log("Containers.id: ", containers[0]._id)
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

// return (
//   <div>
//     <div>
//       <h1>Move-N-Stuff</h1>
//     </div>
//     <div class="grid-container-pg">
//       <div>1</div>
//       <div>2</div>
//       <div>3</div>
//       <div>4</div>
//       <div>5</div>
//       <div>6</div>
//       <div>7</div>
//       <div>8</div>
//     </div>
//   </div>
// );

export default ContainersPage;
