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

  const title = initialValues ? 'Editar tamanho' : 'Criar tamanho';
  const description = initialValues
    ? 'Editar um tamanho'
    : 'Adicionar um novo tamanho';
  const toastMessage = initialValues
    ? 'Tamanho atualizado!'
    : 'Tamanho criado!';

  const action = initialValues ? 'Salvar mudanças' : 'Criar';

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

      router.push(`/${params.storeId}/sizes`);
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
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success('Tamanho deletado!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(
        'Certifique-se de remover todos os produtos usando esses tamanhos primeiro!'
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
