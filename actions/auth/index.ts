"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import * as Sentry from "@sentry/nextjs";

export async function login(formData: { email: string, password: string }) {
  try {
    const supabase = await createClient();
    const { email, password } = formData;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    redirect('/dashboard/collections');
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }

    Sentry.captureException(error, {
      tags: {
        action: "login",
        authMethod: "password"
      },
      extra: {
        emailDomain: formData.email.split('@')[1], // Less sensitive than full email
        errorCode: error instanceof Error ? error.cause : 500,
        errorMessage: error instanceof Error ? error.message : String(error),
      },
      level: "log",
    });
    throw error;
  }
}

export async function logout() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      Sentry.captureException(error, {
        tags: { action: "logout" },
        level: "warning",
      });
      throw error;
    }

    redirect('/dashboard');
  } catch (error) {
    if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
      Sentry.captureException(error, {
        tags: { action: "logout" },
      });
    }
    throw error;
  }
}