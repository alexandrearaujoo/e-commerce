import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { FormValues, formSchema } from '@/schemas/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { Axios, AxiosError } from 'axios';

export const useModalForm = () => {
  const modalForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = modalForm;

  const onSubmit = async (data: FormValues) => {
    try {
      await axios.post('/api/stores', data);
      toast.success('Store created successfully!');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      toast.error('Something went wrong');
    }
  };

  return { modalForm, onSubmit, handleSubmit, isSubmitting };
};
