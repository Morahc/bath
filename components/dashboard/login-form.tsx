"use client";

import { Controller, useForm } from "react-hook-form";

import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Card, CardContent } from "../ui/card";

type LoginInput = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const form = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  async function onSubmit(data: LoginInput) {
    startTransition(async () => {
      try {
        await login(data);
      } catch {
        form.setError("root", {
          type: "manual",
          message: "Error Logging in",
        });
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      <Card>
        <CardContent>
          <FieldGroup>
            <FieldSet>
              <FieldLegend className="text-2xl! mb-6 tracking-wider font-semibold">
                Login to Dashboard
              </FieldLegend>

              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">Email Address</FieldLabel>
                      <Input
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        autoComplete="email"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                <Controller
                  name="password"
                  rules={{
                    required: "Password is required",
                    min: {
                      value: 8,
                      message: "Must be 8 characters or more",
                    },
                  }}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        {...field}
                        id="password"
                        aria-invalid={fieldState.invalid}
                        autoComplete="on"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <Field orientation="horizontal" className="justify-end">
              <Button disabled={isPending} type="submit">
                Login
              </Button>
            </Field>
            {form.formState.errors.root && (
              <div className="text-red-500 text-sm">{form.formState.errors.root.message}</div>
            )}
          </FieldGroup>
        </CardContent>
      </Card>
    </form>
  );
}
