import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import {
  UpdateStoreRequest,
  updateStoreSchema
} from '@/schemas/updateStoreSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';
import axios, { AxiosError } from 'axios';

export const useUpdateStore = (initialValues: Store) => {
  const params = useParams();
  const router = useRouter();
  const updateForm = useForm<UpdateStoreRequest>({
    resolver: zodResolver(updateStoreSchema),
    defaultValues: initialValues
  });
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    formState: { isSubmitting },
    control
  } = updateForm;

  const onSubmit = async (data: UpdateStoreRequest) => {
    try {
      await axios.patch(`/api/stores/${params.storeId}`, data);

      toast.success('Loja atualizada com sucesso!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error('Algo deu errado');
    } finally {
      router.refresh();
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);

      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(
        'Certifique-se de remover todos os produtos e categorias primeiro!'
      );
    } finally {
      router.refresh();
      setLoading(false);
      setOpen(false);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    isSubmitting,
    updateForm,
    open,
    setOpen,
    control,
    loading,
    onDelete,
    storeId: params.storeId
  };
};
