'use client';

import { useEffect, useState } from 'react';

import { Button } from '../ui/button';
import Modal from '../ui/modal';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal = ({
  isOpen,
  loading,
  onClose,
  onConfirm
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Tem certeza ?"
      description="Essa ação não pode ser desfeita!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <article className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} onClick={onClose} variant="outline">
          Cancelar
        </Button>
        <Button disabled={loading} onClick={onConfirm} variant="destructive">
          Continuar
        </Button>
      </article>
    </Modal>
  );
};

export default AlertModal;
