'use client';

import CellAction from './cell-action';

import { ColumnDef } from '@tanstack/react-table';

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Nome'
  },
  {
    accessorKey: 'createdAt',
    header: 'Data de criação'
  },
  { id: 'actions', cell: ({ row }) => <CellAction billboard={row.original} /> }
];
