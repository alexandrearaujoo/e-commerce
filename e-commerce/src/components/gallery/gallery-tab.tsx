'use client';

import Image from 'next/image';

import { Image as ImageInterface } from '@/interfaces';
import { cn } from '@/lib/utils';
import { Tab } from '@headlessui/react';

const GalleryTab = ({ image }: { image: ImageInterface }) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
      {({ selected }) => (
        <div>
          <figure className="absolute inset-0 aspect-square h-full w-full overflow-hidden rounded-md">
            <Image
              src={image.url}
              fill
              alt="Image"
              className="object-cover object-center"
            />
          </figure>
          <span
            className={cn(
              'absolute inset-0 rounded-md ring-2 ring-offset-2',
              selected ? 'ring-black' : 'ring-transparent'
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
