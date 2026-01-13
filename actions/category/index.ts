"use server";

import { cache } from 'react';

import { createClient } from '@/utils/supabase/server';
import { slugify } from '@/lib/utils';

export const getCategories = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select(`*`).order("updated_at", { ascending: false });

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

  const fileExt = image.name.split(".").pop();
  const filePath = `category/${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError, data } = await supabase.storage
    .from("images")
    .upload(filePath, image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { error } = await supabase
    .from("categories")
    .insert({
      label,
      value,
      image: data.path,
    })

  if (error) throw error;
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

  await supabase
    .from("categories")
    .delete()
    .eq("id", id);
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
    const fileExt = image.name.split(".").pop();
    const filePath = `category/${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError, data } = await supabase.storage
      .from("images")
      .upload(filePath, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

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

  if (error) throw error;
}
