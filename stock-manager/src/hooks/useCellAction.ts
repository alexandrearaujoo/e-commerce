import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import axios, { AxiosError } from 'axios';

interface ActionsMessages {
  message: string;
  success: string;
}

const textMap: Record<ActionsMessages['message'], string> = {
  categories:
    'Certifique-se de remover todos os produtos usando essas categorias primeiro!',
  sizes:
    'Certifique-se de remover todos os produtos usando esses tamanhos primeiro!',
  billboards:
    'Certifique-se de remover todas as categorias usando este painel!',
  colors:
    'Certifique-se de remover todos os produtos usando esta cor primeiro!',
  products: 'Algo deu errado!'
};

const successMessageMap: Record<ActionsMessages['success'], string> = {
  categories: 'Categoria deletada!',
  sizes: 'Tamanho deletado!',
  billboards: 'Painel deletado!',
  colors: 'Cor deletada!',
  products: 'Produto deletado!'
};

export const useCellAction = ({
  id,
  actionLabel
}: {
  id: string;
  actionLabel: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('ID copiado com sucesso');
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/${actionLabel.toLocaleLowerCase()}/${id}`
      );

      toast.success(successMessageMap[actionLabel]);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(textMap[actionLabel]);
    } finally {
      router.refresh();
      setLoading(false);
      setOpen(false);
    }
  };

  return {
    onDelete,
    onCopy,
    loading,
    open,
    setOpen,
    storeId: params.storeId
  };
};
