import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ColorRequest, colorSchema } from '@/schemas/colorsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Color } from '@prisma/client';
import axios, { AxiosError } from 'axios';

export const useColorForm = (initialValues: Color | null) => {
  const params = useParams();
  const router = useRouter();
  const colorForm = useForm<ColorRequest>({
    resolver: zodResolver(colorSchema),
    defaultValues: initialValues || {
      name: '',
      value: ''
    }
  });
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const title = initialValues ? 'Edit color' : 'Create color';
  const description = initialValues ? 'Edit a color' : 'Add a new color';
  const toastMessage = initialValues ? 'Color updated!' : 'Color created!';

  const action = initialValues ? 'Save changes' : 'Create';

  const {
    handleSubmit,
    formState: { isSubmitting },
    control
  } = colorForm;

  const onSubmit = async (data: ColorRequest) => {
    try {
      if (initialValues) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
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
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success('Color deleted!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      toast.error('Make sure you removed all products using this color first!');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    isSubmitting,
    colorForm,
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
