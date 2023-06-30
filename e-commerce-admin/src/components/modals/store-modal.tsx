'use client';

import Modal from '../ui/modal';

import { useModalStore } from '@/hooks/useModalStore';

const StoreModal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const onClose = useModalStore((state) => state.onClose);

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage product"
      isOpen={isOpen}
      onClose={onClose}
    >
      Future Create Store Form
    </Modal>
  );
};

export default StoreModal;
