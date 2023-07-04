'use client';

import dynamic from 'next/dynamic';

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

import { useColorForm } from '@/hooks/useColorForm';
import { Color } from '@prisma/client';
import { Trash } from 'lucide-react';

const AlertModal = dynamic(() => import('@/components/modals/alert-modal'), {
  ssr: false
});

interface ColorFormProps {
  initialValues: Color | null;
}

const ColorForm = ({ initialValues }: ColorFormProps) => {
  const {
    handleSubmit,
    onSubmit,
    setOpen,
    isSubmitting,
    colorForm,
    control,
    open,
    loading,
    onDelete,
    action,
    description,
    title
  } = useColorForm(initialValues);

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
        <Heading title={title} description={description} />
        {initialValues && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={isSubmitting}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </article>
      <Separator />
      <Form {...colorForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <section className="grid grid-cols-3 gap-8">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Color name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={isSubmitting}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="rounded-full border p-4"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <Button disabled={isSubmitting} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ColorForm;
