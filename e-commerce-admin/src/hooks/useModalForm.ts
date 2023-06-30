import { useForm } from 'react-hook-form';

import { FormValues, formSchema } from '@/schemas/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export const useModalForm = () => {
  const modalForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' }
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return { modalForm, onSubmit };
};
