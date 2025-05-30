function ErrorMessage({ message, onClose }) {
  return (
    <div className="error-modal">
      <button onClick={onClose}>X</button>
      <div>{message}</div>
    </div>
  );
}

export default ErrorMessage;
