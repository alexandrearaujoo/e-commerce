'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Button from '@/components/ui/button';

import { Color, Size } from '@/interfaces';
import { cn } from '@/lib/utils';
import qs from 'query-string';

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

const Filter = ({ data, name, valueKey }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = { ...current, [valueKey]: id };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold">{name}</h3>
      <hr className="my-4" />
      <ul className="flex flex-wrap gap-2">
        {data.map((item) => (
          <li key={item.id} className="flex items-center">
            <Button
              onClick={() => onClick(item.id)}
              className={cn(
                'rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-800',
                selectedValue === item.id && 'bg-black text-white'
              )}
            >
              {item.name}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Filter;
