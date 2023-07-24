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

  const title = initialValues ? 'Edit Billboard' : 'Create Billboard';
  const description = initialValues
    ? 'Edit a Billboard'
    : 'Add a new Billboard';
  const toastMessage = initialValues
    ? 'Billboard updated!'
    : 'Billboard created!';

  const action = initialValues ? 'Save changes' : 'Create';

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
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
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
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success('Billboard deleted!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      toast.error(
        'Make sure you removed all categories using this billboard first!'
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
