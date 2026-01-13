"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: { email: string, password: string }) {
  const supabase = await createClient();
  const { email, password } = formData

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  redirect('/dashboard/collections')
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect('/dashboard')
}
