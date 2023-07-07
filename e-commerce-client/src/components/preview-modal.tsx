'use client';

import Gallery from './gallery';
import Info from './info';
import Modal from './modal';

import { usePreviewModal } from '@/hooks/usePreviewModal';

const PreviewModal = () => {
  const { isOpen, onClose, data } = usePreviewModal();

  if (!data) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="grid w-full grid-cols-2 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="lg:cols-span-5 sm:col-span-4">
          <Gallery images={data.images} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={data} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
