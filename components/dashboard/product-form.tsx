"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileImage } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { getCategories } from "@/actions/category";
import { createCollection, updateCollection } from "@/actions/collections";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useProduct } from "@/context/product-context";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";

const createFormSchema = (hasInitialData: boolean) =>
  z.object({
    name: z.string().min(1, "This field is required"),
    category: z.string().min(1, "This field is required"),
    description: z.string().min(1, "This field is required"),
    price: z.coerce.number<number>().gte(1, { message: "Price must be greater than zero" }),
    featured: z.boolean().catch(false),
    image: hasInitialData
      ? z
          .file()
          .max(1_000_000, "Maximium file size is 10MB")
          .mime(["image/png", "image/jpeg"], "Invalid file type. Only images are allowed.")
          .optional()
      : z
          .file("Image is required")
          .max(1_000_000, "Maximium file size is 10MB")
          .mime(["image/png", "image/jpeg"], "Invalid file type. Only images are allowed."),
  });


export default function ProductForm() {
  const router = useRouter();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const { setOpen, currentRow } = useProduct();

  const [isPending, startTransition] = useTransition();
  const formSchema = useMemo(() => createFormSchema(!!currentRow), [currentRow]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          ...currentRow,
          category: currentRow.category.id.toString(),
          image: undefined,
        }
      : {
          name: "",
          category: "",
          description: "",
          price: 0,
          featured: false,
          image: undefined,
        },
  });

  const image = form.watch("image");

  function handleClose() {
    setOpen(null);
    form.reset();
    router.refresh();
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === undefined || value === null) return;

      if (value instanceof File) {
        if (value.size === 0) return;

        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    if (currentRow) {
      startTransition(async () => {
        try {
          await updateCollection({ id: currentRow.id, formData });

          handleClose();
        } catch {
          toast.error("Failed to delete collection");
        }
      });
    } else {
      startTransition(async () => {
        try {
          await createCollection(formData);

          handleClose();
        } catch {
          toast.error("Failed to create collection");
        }
      });
    }
  }

  useEffect(() => {
    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof image === "string") {
      setPreview(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  useEffect(() => {
    if (currentRow?.image && typeof currentRow.image === "string") {
      setPreview(process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + currentRow.image);
    } else {
      setPreview(null);
    }
  }, [currentRow]);

  if (isLoading) return <Skeleton className="h-full" />;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item.label} value={item.id.toString()}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="price">Price</FieldLabel>
                  <Input
                    {...field}
                    id="price"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field: { onChange, value, ...rest }, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Upload Image</FieldLabel>
                    <div className="relative">
                      <Label
                        htmlFor="file"
                        className="rounded border h-48 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden relative"
                      >
                        {preview ? (
                          <>
                            <Image
                              src={preview}
                              alt="Preview"
                              fill
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-sm">Click to change</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-gray-400">
                            <FileImage className="size-8" />
                            <span className="text-sm">Click to upload</span>
                          </div>
                        )}
                      </Label>
                    </div>

                    <Input
                      type="file"
                      accept="image/*"
                      hidden
                      {...rest}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                        e.target.value = "";
                      }}
                      id="file"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    <FieldDescription>
                      {value instanceof File
                        ? value.name
                        : "Only image files are accepted. Click to upload."}
                    </FieldDescription>
                  </Field>
                );
              }}
            />

            <Controller
              name="featured"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} orientation="horizontal">
                  <FieldLabel className="flex items-start bg-muted gap-2 border border-input rounded-lg px-2 py-4">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="featured"
                    />
                    <div className="grid gap-1.5 font-normal">
                      <p className="text-sm leading-none font-medium">Set to featured</p>
                      <p className="text-muted-foreground text-sm">
                        Featured items appear on featured section.
                      </p>
                    </div>
                  </FieldLabel>
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>

        <Field orientation="horizontal">
          <Button disabled={isPending} type="submit">
            {currentRow ? "Update" : "Create"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
