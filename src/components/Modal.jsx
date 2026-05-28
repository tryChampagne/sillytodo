import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

function Modal({ isOpen, onClose, children }) {

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === `Escape`) onClose();
    };
    document.addEventListener(`keydown`, handleKey);
    
    // Cleanup
    return () => document.removeEventListener(`keydown`, handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById(`modal-root`),
  );

}

export default Modal;
