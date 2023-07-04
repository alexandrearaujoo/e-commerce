import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import axios, { AxiosError } from 'axios';

interface ActionsMessages {
  message: string;
  success: string;
}

const textMap: Record<ActionsMessages['message'], string> = {
  categories: 'Make sure you removed all products using this categories first!',
  sizes: 'Make sure you removed all prodcuts using this sizes first!',
  billboards:
    'Make sure you removed all categories using this billboard first!',
  colors: 'Make sure you removed all prodcuts using this color first!'
};

const successMessageMap: Record<ActionsMessages['success'], string> = {
  categories: 'Category deleted!',
  sizes: 'Size deleted!',
  billboards: 'Billboard deleted!',
  colors: 'Color deleted!'
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
    toast.success('ID copied to clipboard!');
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/${actionLabel.toLocaleLowerCase()}/${id}`
      );
      router.refresh();
      toast.success(successMessageMap[actionLabel]);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      toast.error(textMap[actionLabel]);
    } finally {
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
