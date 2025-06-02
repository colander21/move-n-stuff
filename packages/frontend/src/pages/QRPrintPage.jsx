import { useState } from "react";
import QRCode from "react-qr-code";
import "../styles/QRPrintPage.css";

function QRPrintPage() {
  const [boxLinks, setBoxLinks] = useState([
    "https://example.com",
    "https://www.wikipedia.org",
    "https://www.nasa.gov",
    "https://www.bbc.co.uk",
    "https://www.mozilla.org",
    "https://www.gnu.org",
    "https://www.khanacademy.org",
    "https://www.archlinux.org",
    "https://www.nationalgeographic.com",
    "https://developer.mozilla.org",
    "https://www.openstreetmap.org",
    "https://www.worldwildlife.org",
    "https://www.python.org",
    "https://www.coursera.org",
    "https://www.unicef.org",
  ]);

  return (
    <>
      <button className="print-button" onClick={() => window.print()}>
        Print Box QR-Codes
      </button>
      <div className="qr-grid">
        {boxLinks.map((box) => (
          <div className="individual-qr">
            <label>Label Name Here</label>
            <QRCode value={box} />
          </div>
        ))}
      </div>
    </>
  );
}

export default QRPrintPage;
