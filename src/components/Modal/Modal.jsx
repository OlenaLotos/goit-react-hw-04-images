import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalSt, ModalImg } from './Modal.styled';

const modalRootRef = document.querySelector('#modal-root');

export function Modal({ onClose, src, alt }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalSt>
        <ModalImg src={src} alt={alt} />
      </ModalSt>
    </Overlay>,
    modalRootRef
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
};

export default Modal;
