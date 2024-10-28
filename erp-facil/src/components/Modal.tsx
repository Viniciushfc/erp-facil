// Modal.tsx
import React from 'react';
import { Button } from './ui/button'; // Certifique-se de que o caminho esteja correto

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Certifique-se de que esta linha esteja presente
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/2">
        <Button onClick={onClose} className="mb-4">
          Fechar
        </Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
