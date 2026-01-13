"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  fullName: z.string().min(1, "This field is required"),
  interest: z.string().min(1, "This field is required"),
  phone: z.string().min(1, "This field is required"),
  email: z.email("This field is required"),
  message: z.string().min(1, "This field is required"),
});

type ContactInput = z.infer<typeof formSchema>;

export default function ContactForm() {
  const form = useForm<ContactInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      interest: "",
      message: "",
    },
  });

  function onSubmit(data: ContactInput) {
    console.log(data);
  }

  return (
    <div className="grid items-center bg-white h-full py-10 md:py-20 px-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="text-2xl! tracking-wider font-semibold">
              Start your project
            </FieldLegend>
            <FieldDescription>
              Visit our showroom or send us a message to check availability and pricing. We reply
              within 24 hours.
            </FieldDescription>

            <FieldGroup>
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="full-name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

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
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="interest"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="interest">Interest</FieldLabel>
                    <Select name={field.name} value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="interest">
                        <SelectValue placeholder="What are you interest in?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inquiry">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="message">Message</FieldLabel>
                    <Textarea
                      {...field}
                      id="message"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit">Send</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
