'use client';

import CellAction from './cell-action';

import { ColumnDef } from '@tanstack/react-table';

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nome'
  },
  {
    accessorKey: 'billboard',
    header: 'Painel',
    cell: ({ row }) => row.original.billboardLabel
  },
  {
    accessorKey: 'createdAt',
    header: 'Data de criação'
  },
  { id: 'actions', cell: ({ row }) => <CellAction category={row.original} /> }
];
