import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ProductRequest, productSchema } from '@/schemas/productSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image, Product } from '@prisma/client';
import axios, { AxiosError } from 'axios';

export const useProductForm = (
  initialValues: (Product & { images: Image[] }) | null
) => {
  const params = useParams();
  const router = useRouter();
  const productForm = useForm<ProductRequest>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues
      ? { ...initialValues, price: parseFloat(initialValues.price.toString()) }
      : {
          name: '',
          images: [],
          price: 0,
          quantity: 0,
          categoryId: '',
          colorId: '',
          sizeId: '',
          isFeatured: false,
          isArchived: false
        }
  });
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const title = initialValues ? 'Editar produto' : 'Criar produto';
  const description = initialValues
    ? 'Editar um produto'
    : 'Adicionar um novo produto';
  const toastMessage = initialValues
    ? 'Produto atualizado!'
    : 'Produto criado!';

  const action = initialValues ? 'Salvar mudanças' : 'Criar';

  const {
    handleSubmit,
    formState: { isSubmitting },
    control
  } = productForm;

  const onSubmit = async (data: ProductRequest) => {
    try {
      if (initialValues) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }

      router.push(`/${params.storeId}/products`);
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
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);

      router.push(`/${params.storeId}/products`);
      toast.success('Produto deletado!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }
      toast.error('Algo deu errado!');
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
    productForm,
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
