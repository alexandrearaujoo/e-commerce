import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { CategoryRequest, categorySchema } from '@/schemas/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category } from '@prisma/client';
import axios, { AxiosError } from 'axios';

export const useCategoryForm = (initialValues: Category | null) => {
  const params = useParams();
  const router = useRouter();
  const categoryForm = useForm<CategoryRequest>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues || {
      name: '',
      billboardId: ''
    }
  });
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const title = initialValues ? 'Editar categoria' : 'Criar categoria';
  const description = initialValues
    ? 'Editar uma categoria'
    : 'Adicionar uma nova categoria';
  const toastMessage = initialValues
    ? 'Categoria atualizada!'
    : 'Categoria criada!';

  const action = initialValues ? 'Salvar mudanças' : 'Criar';

  const {
    handleSubmit,
    formState: { isSubmitting },
    control
  } = categoryForm;

  const onSubmit = async (data: CategoryRequest) => {
    try {
      if (initialValues) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }

      router.push(`/${params.storeId}/categories`);
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
        `/api/${params.storeId}/categories/${params.categoryId}`
      );

      router.push(`/${params.storeId}/categories`);
      toast.success('Categoria deletada!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error(
        'Certifique-se de remover todos os produtos usando essas categorias primeiro!'
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
    categoryForm,
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
