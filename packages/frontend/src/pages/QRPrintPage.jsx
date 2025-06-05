import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import "../styles/QRPrintPage.css";

function QRPrintPage() {
  const API_PREFIX = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { containerID } = useParams();
  const [box, setBox] = useState([]);
  const token = sessionStorage.getItem("token");

  // Grabs the containerID from URL and stores box object
  useEffect(() => {
    fetch(`${API_PREFIX}/containers/${containerID}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((boxes) => setBox(boxes));
  }, [API_PREFIX, containerID, token]);

  return (
    <>
      <div className="qr-button-wrapper">
        <button
          onClick={() => navigate(`/boxes/${containerID}`)}
          className="print-back-button"
        >
          ← Back to Boxes
        </button>
        <button className="print-button" onClick={() => window.print()}>
          Print Box QR-Codes
        </button>
      </div>

      <div className="qr-grid">
        {/* Creates a QR code for every box, with link to specific box's items */}
        {box.map((box) => {
          return (
            <div className="individual-qr">
              <label>{box.tag}</label>
              <QRCode value={`https://www.move-n-stuff.com/items/${box._id}`} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default QRPrintPage;
