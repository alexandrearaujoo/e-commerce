'use client';

import { ComponentPropsWithoutRef } from 'react';

import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

import { useStoreSwitcher } from '@/hooks/useStoreSwitcher';
import { cn } from '@/lib/utils';
import { Store } from '@prisma/client';
import {
  CheckIcon,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon
} from 'lucide-react';

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwithcerProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwithcer = ({ items = [], className }: StoreSwithcerProps) => {
  const { currentStore, onOpen, onStoreSelect, setOpen, open, formattedItems } =
    useStoreSwitcher(items);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn('w-[200px] justify-between', className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map(({ label, value }) => (
                <CommandItem
                  key={value}
                  onSelect={() => onStoreSelect({ value, label })}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentStore?.value === value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onOpen();
                }}
                className="cursor-pointer"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwithcer;
