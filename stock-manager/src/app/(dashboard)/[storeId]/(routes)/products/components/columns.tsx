'use client';

import CellAction from './cell-action';

import { ColumnDef } from '@tanstack/react-table';

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nome'
  },
  {
    accessorKey: 'isArchived',
    header: 'Arquivado'
  },
  {
    accessorKey: 'isFeatured',
    header: 'Disponível'
  },
  {
    accessorKey: 'price',
    header: 'Preço'
  },
  {
    accessorKey: 'category',
    header: 'Categoria'
  },
  {
    accessorKey: 'size',
    header: 'Tamanho'
  },
  {
    accessorKey: 'color',
    header: 'Cor',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Data de criação'
  },
  { id: 'actions', cell: ({ row }) => <CellAction product={row.original} /> }
];
