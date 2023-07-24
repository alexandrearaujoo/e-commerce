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

  const title = initialValues ? 'Editar cor' : 'Criar cor';
  const description = initialValues
    ? 'Editar uma cor'
    : 'Adicionar uma nova cor';
  const toastMessage = initialValues ? 'Cor atualizada!' : 'Cor criada!';

  const action = initialValues ? 'Salvar mudanças' : 'Criar';

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

      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error('Algo deu errado!');
    } finally {
      router.refresh();
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);

      router.push(`/${params.storeId}/colors`);
      toast.success('Color deleted!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(
        'Certifique-se de remover todos os produtos usando esta cor primeiro!'
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
