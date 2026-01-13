"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileImage } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { createCategory, updateCategory } from "@/actions/category";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Category } from "@/types";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentRow?: Category;
}

const createFormSchema = (hasInitialData: boolean) =>
  z.object({
    label: z.string().min(1, "This field is required"),
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

export default function CategoryForm({ open, setOpen, currentRow }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const formSchema = useMemo(() => createFormSchema(!!currentRow), [currentRow]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          label: currentRow.label,
          image: undefined,
        }
      : {
          label: "",
          image: undefined,
        },
  });

  const image = form.getValues("image");

  const preview = useMemo(() => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    if (currentRow?.image && typeof currentRow.image === "string") {
      return process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + currentRow.image;
    }
    return null;
  }, [image, currentRow]);

  function handleClose() {
    setOpen(false);
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
          await updateCategory(currentRow.id, formData);

          handleClose();
        } catch {
          toast.error("Failed to delete collection");
        }
      });
    } else {
      startTransition(async () => {
        try {
          await createCategory(formData);

          handleClose();
        } catch {
          toast.error("Failed to create collection");
        }
      });
    }
  }

  useEffect(() => {
    if (open) {
      form.reset(
        currentRow
          ? {
              label: currentRow.label,
              image: undefined,
            }
          : {
              label: "",
              image: undefined,
            }
      );
    }
  }, [open, currentRow, form]);

  useEffect(() => {
    if (preview && image instanceof File) {
      return () => URL.revokeObjectURL(preview);
    }
  }, [preview, image]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{!currentRow ? "Create product" : "Update product"}</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="p-4 overflow-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
            <FieldGroup>
              <FieldSet>
                <FieldGroup>
                  <Controller
                    name="label"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="label">Name</FieldLabel>
                        <Input
                          {...field}
                          id="label"
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
                </FieldGroup>
              </FieldSet>

              <Field orientation="horizontal">
                <Button disabled={isPending} type="submit">
                  {currentRow ? "Update" : "Create"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
