'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { ProductColumn } from './columns';

import { useCellAction } from '@/hooks/useCellAction';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';

const AlertModal = dynamic(() => import('@/components/modals/alert-modal'), {
  ssr: false
});

interface CellActionProps {
  product: ProductColumn;
}

const CellAction = ({ product }: CellActionProps) => {
  const router = useRouter();
  const { loading, onCopy, onDelete, open, storeId, setOpen } = useCellAction({
    actionLabel: 'products',
    id: product.id
  });

  return (
    <>
      {open && (
        <AlertModal
          isOpen={open}
          onConfirm={onDelete}
          loading={loading}
          onClose={() => setOpen(false)}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(product.id)}
            className="cursor-pointer"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push(`/${storeId}/products/${product.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Atualizar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <Trash className="mr-2 h-4 w-4" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
