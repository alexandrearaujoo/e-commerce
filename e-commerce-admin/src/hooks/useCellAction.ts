import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import axios, { AxiosError } from 'axios';

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

  const messageError =
    actionLabel === 'Category'
      ? 'Make sure you removed all products using this categories first!'
      : 'Make sure you removed all categories using this billboard first!';

  const messageSuccess =
    actionLabel === 'categories' ? 'Category deleted!' : 'Billboard deleted!';

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/${actionLabel.toLocaleLowerCase()}/${id}`
      );
      router.refresh();
      toast.success(messageSuccess);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      toast.error(messageError);
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
