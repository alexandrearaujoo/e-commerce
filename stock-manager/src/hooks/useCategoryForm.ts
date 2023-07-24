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

  const title = initialValues ? 'Edit category' : 'Create category';
  const description = initialValues ? 'Edit a category' : 'Add a new category';
  const toastMessage = initialValues
    ? 'Category updated!'
    : 'Category created!';

  const action = initialValues ? 'Save changes' : 'Create';

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
      router.refresh();
      router.push(`/${params.storeId}/categories`);
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
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success('Category deleted!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      toast.error(
        'Make sure you removed all products using this categories first!'
      );
    } finally {
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
