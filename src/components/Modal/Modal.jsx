import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modale.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handelKeydown);
    return () => window.removeEventListener('keydown', handelKeydown);
  });

  const handelKeydown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handelBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handelBackdropClick}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
