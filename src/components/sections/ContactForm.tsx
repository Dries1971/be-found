"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Input, Textarea, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription } from "@/components/ui/Alert";

/**
 * Contact form with client-side state.
 *
 * Phase 1: UI only — form submission via API route comes later
 * when TransIP SMTP credentials are available.
 */
export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Phase 1: simulate submission (API route = Sprint 3)
    // In production this will POST to /api/contact
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field — hidden from users, catches bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" required>
          {t("form_name")}
        </Label>
        <Input
          id="name"
          name="name"
          placeholder={t("form_name_placeholder")}
          required
          disabled={status === "sending"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" required>
          {t("form_email")}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t("form_email_placeholder")}
          required
          disabled={status === "sending"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">{t("form_company")}</Label>
        <Input
          id="company"
          name="company"
          placeholder={t("form_company_placeholder")}
          disabled={status === "sending"}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" required>
          {t("form_message")}
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("form_message_placeholder")}
          rows={5}
          required
          disabled={status === "sending"}
        />
      </div>

      <Button
        type="submit"
        intent="primary"
        size="lg"
        className="w-full"
        disabled={status === "sending" || status === "success"}
      >
        {status === "sending" ? t("form_sending") : t("form_submit")}
      </Button>

      {status === "success" && (
        <Alert intent="success">
          <AlertDescription>{t("form_success")}</AlertDescription>
        </Alert>
      )}

      {status === "error" && (
        <Alert intent="error">
          <AlertDescription>{t("form_error")}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
