'use client';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Button } from './button';

import { ResultImageUpload } from '@/interfaces';
import { ImagePlus, Trash } from 'lucide-react';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  onChange,
  onRemove,
  disabled,
  value
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: ResultImageUpload) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <article>
      <ul className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <li
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image src={url} alt="Image" fill className="object-cover" />
          </li>
        ))}
      </ul>
      <CldUploadWidget onUpload={onUpload} uploadPreset="sn1hbbrn">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              onClick={onClick}
              variant="secondary"
              disabled={disabled}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </article>
  );
};
export default ImageUpload;
