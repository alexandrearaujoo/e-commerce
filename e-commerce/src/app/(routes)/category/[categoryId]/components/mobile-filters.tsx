'use client';

import { useState } from 'react';

import Button from '@/components/ui/button';
import IconButton from '@/components/ui/icon-button';

import Filter from './filter';

import { Color, Size } from '@/interfaces';
import { Dialog } from '@headlessui/react';
import { Plus, X } from 'lucide-react';

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters = ({ colors, sizes }: MobileFiltersProps) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <>
      <Button className="flex items-center gap-x-2 lg:hidden" onClick={toggle}>
        Filters
        <Plus size={20} />
      </Button>

      <Dialog open={open} onClose={toggle} className="relative z-40 lg:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={toggle} />
            </div>
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
