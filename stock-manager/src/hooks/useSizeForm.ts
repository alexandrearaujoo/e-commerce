import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { SizeRequest, sizeSchema } from '@/schemas/sizeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Size } from '@prisma/client';
import axios, { AxiosError } from 'axios';

export const useSizeForm = (initialValues: Size | null) => {
  const params = useParams();
  const router = useRouter();
  const sizeForm = useForm<SizeRequest>({
    resolver: zodResolver(sizeSchema),
    defaultValues: initialValues || {
      name: '',
      value: ''
    }
  });
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const title = initialValues ? 'Edit size' : 'Create size';
  const description = initialValues ? 'Edit a size' : 'Add a new size';
  const toastMessage = initialValues ? 'Size updated!' : 'Size created!';

  const action = initialValues ? 'Save changes' : 'Create';

  const {
    handleSubmit,
    formState: { isSubmitting },
    control
  } = sizeForm;

  const onSubmit = async (data: SizeRequest) => {
    try {
      if (initialValues) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success(toastMessage);
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
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success('Size deleted!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      toast.error('Make sure you removed all products using this sizes first!');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    isSubmitting,
    sizeForm,
    open,
    setOpen,
    control,
    loading,
    onDelete,
    storeId: params.storeId,
    title,
    action,
    description
  };
};
