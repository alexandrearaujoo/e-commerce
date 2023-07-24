'use client';

import CellAction from './cell-action';

import { ColumnDef } from '@tanstack/react-table';

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nome'
  },
  {
    accessorKey: 'value',
    header: 'Valor',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
        />
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Data de criação'
  },
  { id: 'actions', cell: ({ row }) => <CellAction color={row.original} /> }
];
