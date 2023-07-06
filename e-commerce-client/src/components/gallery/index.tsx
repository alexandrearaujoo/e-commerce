'use client';

import Image from 'next/image';

import GalleryTab from './gallery-tab';

import { Image as ImageInterface } from '@/interfaces';
import { Tab } from '@headlessui/react';

interface GalleryProps {
  images: ImageInterface[];
}

const Gallery = ({ images }: GalleryProps) => {
  return (
    <Tab.Group as="section" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <figure className="relative aspect-square h-full w-full overflow-hidden sm:rounded-lg">
              <Image
                src={image.url}
                fill
                alt="Image"
                className="object-cover object-center"
              />
            </figure>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
