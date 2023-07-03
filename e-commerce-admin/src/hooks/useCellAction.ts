import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

import axios, { AxiosError } from 'axios';

export const useCellAction = (billboardId: string) => {
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
      await axios.delete(`/api/${params.storeId}/billboards/${billboardId}`);
      router.refresh();
      toast.success('Billboard deleted!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      toast.error(
        'Make sure you removed all categories using this billboard first!'
      );
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
