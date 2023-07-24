'use client';

import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import Heading from '@/components/ui/heading';
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { useProductForm } from '@/hooks/useProductForm';
import { Category, Color, Image, Product, Size } from '@prisma/client';
import { Trash } from 'lucide-react';

const AlertModal = dynamic(() => import('@/components/modals/alert-modal'), {
  ssr: false
});

interface ProductFormProps {
  initialValues: (Product & { images: Image[] }) | null;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
}

const ProductForm = ({
  initialValues,
  categories,
  colors,
  sizes
}: ProductFormProps) => {
  const {
    handleSubmit,
    onSubmit,
    setOpen,
    isSubmitting,
    productForm,
    control,
    open,
    loading,
    onDelete,
    action,
    description,
    title
  } = useProductForm(initialValues);

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
      <Form {...productForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <FormField
            control={control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagens</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url)
                      ])
                    }
                    value={field.value.map((image) => image.url)}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      placeholder="Nome do produto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Selecione uma categoria..."
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((categories) => (
                          <SelectItem key={categories.id} value={categories.id}>
                            {categories.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tamanho</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Selecione um tamanho..."
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sizes.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Selecione uma cor..."
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color.id} value={color.id}>
                            {color.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      //@ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Disponivel</FormLabel>
                    <FormDescription>
                      Este produto aparecerá na página inicial
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      //@ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Arquivado</FormLabel>
                    <FormDescription>
                      Este produto será arquivo após acabar o estoque
                    </FormDescription>
                  </div>
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

export default ProductForm;
