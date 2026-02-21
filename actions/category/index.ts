"use server";

import { cache } from 'react';
import sharp from "sharp"
import * as Sentry from "@sentry/nextjs";

import { createClient } from '@/utils/supabase/server';
import { slugify } from '@/lib/utils';

export const getCategories = cache(async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("categories").select(`*`).order("updated_at", { ascending: false });

  if (error) {
    Sentry.captureException(error, {
      tags: {
        action: "Get categories",
        table: "Category"
      },
      extra: {
        errorCode: error.code,
        errorMessage: error.message,
        errorDetails: error.details,
        hint: error.hint,
      },
      level: "error",
    });
  }

  return data || []
})

export async function createCategory(formData: FormData) {
  const supabase = await createClient();

  const label = formData.get("label") as string;
  const image = formData.get("image") as File | null;
  const value = slugify(label)

  if (!image) {
    throw new Error("Image is required");
  }

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const resizedImageBuffer = await sharp(buffer)
    .resize(400, 400, {
      fit: "cover",
      position: "center",
    })
    .webp({ quality: 80 })
    .toBuffer();

  const fileExt = "webp";
  const filePath = `/${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError, data } = await supabase.storage
    .from("images")
    .upload(filePath, resizedImageBuffer, {
      contentType: "image/webp",
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {

    Sentry.captureException(uploadError, {
      tags: {
        action: "createCategory",
        step: "imageUpload",
        bucket: "images",
      },
      extra: {
        filePath,
        label,
        errorMessage: uploadError.message,
      },
      level: "error",
    });
    throw uploadError;
  }

  const { error } = await supabase
    .from("categories")
    .insert({
      label,
      value,
      image: data.path,
    })

  if (error) {
    Sentry.captureException(error, {
      tags: {
        action: "createCategory",
        step: "databaseInsert",
        table: "categories",
      },
      extra: {
        label,
        value,
        errorCode: error.code,
        errorDetails: error.details,
        hint: error.hint,
      },
      level: "error",
    });
    throw error;
  }

  return true
}

export async function deleteCategory(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("image")
    .eq("id", id)
    .single();

  if (error) throw error;

  if (data.image) {
    await supabase.storage
      .from("images")
      .remove([data.image]);
  }

  const { error: deleteError } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (deleteError) {
    Sentry.captureException(deleteError, {
      tags: {
        action: "deleteCategory",
        step: "databaseDelete",
        table: "categories",
      },
      extra: {
        errorCode: deleteError.code,
        errorDetails: deleteError.details,
        hint: deleteError.hint,
      },
      level: "error",
    });
    throw error;
  }

  return true
}

export async function updateCategory(id: number, formData: FormData) {
  const supabase = await createClient();

  const label = formData.get("label") as string;
  const image = formData.get("image") as File | null;
  const value = slugify(label)

  const { data: existing, error: existingError } = await supabase
    .from("categories")
    .select("image")
    .eq("id", id)
    .single();

  if (existingError) throw existingError;

  let imageUrl = existing.image;

  if (image) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const resizedImageBuffer = await sharp(buffer)
      .resize(400, 400, {
        fit: "cover",
        position: "center",
      })
      .webp({ quality: 80 })
      .toBuffer();

    const fileExt = "webp";
    const filePath = `/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from("images")
      .upload(filePath, resizedImageBuffer, {
        contentType: "image/webp",
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      Sentry.captureException(uploadError, {
        tags: {
          action: "updateCategory",
          step: "imageUpload",
          bucket: "images",
        },
        extra: {
          filePath,
          label,
          errorMessage: uploadError.message,
        },
        level: "error",
      });
      throw uploadError;
    }

    if (existing.image) {
      await supabase.storage
        .from("images")
        .remove([existing.image]);
    }

    imageUrl = data.path
  }

  const { error } = await supabase
    .from("categories")
    .update({
      label,
      value,
      image: imageUrl
    })
    .eq("id", id);

  if (error) {
    Sentry.captureException(error, {
      tags: {
        action: "updateCategory",
        step: "databaseUpdate",
        table: "categories",
      },
      extra: {
        label,
        value,
        imagePath: imageUrl,
        errorCode: error.code,
        errorDetails: error.details,
        hint: error.hint,
      },
      level: "error",
    });
    throw error;
  }

  return true;
}
