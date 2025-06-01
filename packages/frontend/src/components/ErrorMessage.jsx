import "../styles/ErrorMessage.css";

function ErrorMessage({ message, onClose }) {
  return (
    <div className="error-modal-container">
      <span className="error-close" onClick={onClose}>
        &times;
      </span>
      <div className="error-msg">{message}</div>
    </div>
  );
}

export default ErrorMessage;
