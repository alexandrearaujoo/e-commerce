'use client';

import CellAction from './cell-action';

import { ColumnDef } from '@tanstack/react-table';

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nome'
  },
  {
    accessorKey: 'value',
    header: 'Valor'
  },
  {
    accessorKey: 'createdAt',
    header: 'Data de criação'
  },
  { id: 'actions', cell: ({ row }) => <CellAction size={row.original} /> }
];
