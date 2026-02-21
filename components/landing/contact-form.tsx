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
import { Controller, useForm } from "react-hook-form";

type ContactInput = {
  fullName: string;
  interest: string;
  phone: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const form = useForm<ContactInput>({
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
            <FieldDescription className="text-black">
              Visit our showroom or send us a message to check availability and pricing. We reply
              within 24 hours.
            </FieldDescription>

            <FieldGroup>
              <Controller
                name="fullName"
                rules={{
                  required: "This field is required",
                }}
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
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Please enter a valid email address",
                  },
                }}
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
                rules={{ required: "This field is required" }}
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
                rules={{ required: "This field is required" }}
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
