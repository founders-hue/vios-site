"use client";

import { useState, type FormEvent } from "react";
import { copy } from "@/lib/copy";
import { leadSchema, type LeadFieldErrors, type LeadInput } from "@/lib/lead-schema";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const emptyForm: LeadInput = {
  name: "",
  company: "",
  email: "",
  location: "",
  message: "",
};

export default function LeadForm() {
  const [fields, setFields] = useState<LeadInput>(emptyForm);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<SubmissionState>("idle");

  function updateField<K extends keyof LeadInput>(key: K, value: LeadInput[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const parsed = leadSchema.safeParse(fields);
    if (!parsed.success) {
      const next: LeadFieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof LeadInput | undefined;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      const data = (await response.json().catch(() => null)) as
        | { fieldErrors?: LeadFieldErrors; error?: string }
        | null;

      if (data?.fieldErrors) {
        setErrors(data.fieldErrors);
        setStatus("idle");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-3 py-6 text-center">
        <p className="font-serif text-2xl text-ink-50">Thanks.</p>
        <p className="text-sm text-ink-100/70">
          We have your details and will be in touch within a week.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <Field
        id="name"
        label="Your name"
        value={fields.name}
        onChange={(v) => updateField("name", v)}
        error={errors.name}
        autoComplete="name"
      />
      <Field
        id="company"
        label="Company or property"
        value={fields.company}
        onChange={(v) => updateField("company", v)}
        error={errors.company}
        autoComplete="organization"
      />
      <Field
        id="email"
        label="Email"
        type="email"
        value={fields.email}
        onChange={(v) => updateField("email", v)}
        error={errors.email}
        autoComplete="email"
      />
      <Field
        id="location"
        label="Property location"
        value={fields.location}
        onChange={(v) => updateField("location", v)}
        error={errors.location}
        autoComplete="address-level2"
      />
      <Field
        id="message"
        label="Tell us about the property"
        multiline
        value={fields.message}
        onChange={(v) => updateField("message", v)}
        error={errors.message}
      />

      {status === "error" && (
        <p className="text-sm text-red-300">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-sm border border-brass-500/60 bg-brass-500/10 px-8 py-3 text-sm uppercase tracking-[0.25em] text-brass-400 transition-colors hover:bg-brass-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : copy.engage.cta}
      </button>
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (next: string) => void;
  error?: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
};

function Field({ id, label, value, onChange, error, type = "text", multiline, autoComplete }: FieldProps) {
  const inputClass =
    "w-full rounded-sm border bg-ink-950/60 px-3 py-2 text-ink-50 placeholder:text-ink-100/30 focus:outline-none focus:ring-1 focus:ring-brass-400";
  const borderClass = error ? "border-red-400/60" : "border-ink-100/15 focus:border-brass-400/60";

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.2em] text-ink-100/50"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} ${borderClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} ${borderClass}`}
        />
      )}
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}
