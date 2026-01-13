"use server";

import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

type GetCollectionsParams = {
  page?: number;
  pageSize?: number;
  featured?: boolean;
  filters?: Record<string, string | number>;
  category?: string;
};

export const getCollections = cache(async (params: GetCollectionsParams = {}) => {
  const {
    page = 1,
    pageSize = 10,
    featured,
    category,
    // filters = {}
  } = params;

  const supabase = await createClient();

  let countQuery = supabase
    .from("collections")
    .select('*', { count: 'exact', head: true });

  if (featured !== undefined) {
    countQuery = countQuery.eq('featured', featured);
  }

  // Object.entries(filters).forEach(([key, value]) => {
  //   if (value !== undefined && value !== null) {
  //     countQuery = countQuery.eq(key, value);
  //   }
  // });

  const { count, error: countError } = await countQuery;

  if (countError) throw countError;

  const total = count || 0;
  const totalPages = Math.ceil(total / pageSize);

  const validPage = Math.max(1, Math.min(page, totalPages || 1));

  let query = supabase
    .from("collections")
    .select(`*, category!inner(*)`)

  if (featured !== undefined) {
    query = query.eq('featured', featured);
  }

  if (category !== undefined) {
    query = query.eq('category.value', category);
  }

  const from = (validPage - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count: newCount } = await query
    .range(from, to)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return {
    data: data || [],
    pagination: {
      page: validPage,
      pageSize,
      total: newCount || 0,
      totalPages,
      isOutOfBounds: page !== validPage
    }
  };
});

export async function createCollection(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = Number(formData.get("category"));
  const price = Number(formData.get("price"));
  const image = formData.get("image") as File | null;
  const featured = formData.get("featured") == "true" ? true : false

  if (!image) {
    throw new Error("Image is required");
  }

  const fileExt = image.name.split(".").pop();
  const filePath = `/${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError, data } = await supabase.storage
    .from("images")
    .upload(filePath, image, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { error } = await supabase
    .from("collections")
    .insert({
      name,
      featured,
      description,
      category,
      price,
      image: data.path,
    })

  if (error) throw error;
}

export async function deleteCollection(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("collections")
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
    .from("collections")
    .delete()
    .eq("id", id);
}

export async function updateCollection({ id, formData }: { id: string, formData: FormData }) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = Number(formData.get("category"));
  const price = Number(formData.get("price"));
  const image = formData.get("image") as File | null;
  const featured = formData.get("featured") == "true" ? true : false

  const { data: existing, error: existingError } = await supabase
    .from("collections")
    .select("image")
    .eq("id", id)
    .single();

  if (existingError) throw existingError;

  let imageUrl = existing.image;

  if (image) {
    const fileExt = image.name.split(".").pop();
    const filePath = `/${crypto.randomUUID()}.${fileExt}`;

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
    .from("collections")
    .update({
      name,
      featured,
      description,
      category,
      price,
      image: imageUrl
    })
    .eq("id", id).select();

  if (error) throw error
}
