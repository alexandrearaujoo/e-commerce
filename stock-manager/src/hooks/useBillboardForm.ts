import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { BillboardRequest, billboardSchema } from '@/schemas/billboardSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
import axios, { AxiosError } from 'axios';

export const useBillboardForm = (initialValues: Billboard | null) => {
  const params = useParams();
  const router = useRouter();
  const billboardForm = useForm<BillboardRequest>({
    resolver: zodResolver(billboardSchema),
    defaultValues: initialValues || {
      label: '',
      imgUrl: ''
    }
  });
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const title = initialValues ? 'Editar Painel' : 'Criar Painel';
  const description = initialValues
    ? 'Editar um Painel'
    : 'Adicionar um novo Painel';
  const toastMessage = initialValues ? 'Painel atualizado!' : 'Painel criado!';

  const action = initialValues ? 'Salvar mudanças' : 'Criar';

  const {
    handleSubmit,
    formState: { isSubmitting },
    control
  } = billboardForm;

  const onSubmit = async (data: BillboardRequest) => {
    try {
      if (initialValues) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }

      router.push(`/${params.storeId}/billboards`);
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
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );

      router.push(`/${params.storeId}/billboards`);
      toast.success('Painel deletado!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(
        'Certifique-se de remover todas as categorias usando este quadro de avisos primeiro!'
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
    billboardForm,
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
