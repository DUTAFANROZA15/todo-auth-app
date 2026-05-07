import React, { useEffect } from 'react';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}

export default Toast;