'use client';

import dynamic from 'next/dynamic';

import ApiAlert from '@/components/ui/api-alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { useOrigin } from '@/hooks/useOrigin';
import { useUpdateStore } from '@/hooks/useUpdateStore';
import { Store } from '@prisma/client';
import { Trash } from 'lucide-react';

const AlertModal = dynamic(() => import('@/components/modals/alert-modal'), {
  ssr: false
});

interface SettingsFormProps {
  initialValues: Store;
}

const SettingsForm = ({ initialValues }: SettingsFormProps) => {
  const {
    handleSubmit,
    onSubmit,
    setOpen,
    isSubmitting,
    updateForm,
    control,
    open,
    loading,
    onDelete,
    storeId
  } = useUpdateStore(initialValues);

  const origin = useOrigin();

  return (
    <>
      {open && (
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
      )}
      <article className="flex items-center justify-between">
        <Heading
          title="Configurações"
          description="Gerencie as preferências da loja"
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          disabled={isSubmitting}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </article>
      <Separator />
      <Form {...updateForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <section className="grid grid-cols-3 gap-8">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Nome da loja"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <Button disabled={isSubmitting} type="submit" className="ml-auto">
            Salvar mudanças
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
