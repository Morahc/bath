"use client";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Card, CardContent } from "../ui/card";
import { login } from "@/actions/auth";
import { useTransition } from "react";

const formSchema = z.object({
  email: z.email().min(1, "This field is required"),
  password: z.string().min(1, "This field is required"),
});

type LoginInput = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();

  async function onSubmit(data: LoginInput) {
    startTransition(async () => {
      await login(data);
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
          </FieldGroup>
        </CardContent>
      </Card>
    </form>
  );
}
