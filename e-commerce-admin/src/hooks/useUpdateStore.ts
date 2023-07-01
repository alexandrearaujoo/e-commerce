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
      router.refresh();
      toast.success('Store updated successfully!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      toast.error('Something went wrong');
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      toast.error('Make sure you removed all products and categories first!');
    } finally {
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
