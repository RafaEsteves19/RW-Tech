import React, { useEffect, useState } from 'react';
import './Toast.css';

function Toast({ type = 'success', title, description, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 200);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type} ${visible ? 'show' : ''}`}>
      <div className="toast-content">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      <button onClick={() => setVisible(false)}>×</button>
    </div>
  );
}

export default Toast;