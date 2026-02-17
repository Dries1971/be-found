"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Input, Textarea, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription } from "@/components/ui/Alert";

/**
 * Contact form with honeypot, time-based bot detection, and API submission.
 * Saves to PostgreSQL. Email notification added when TransIP SMTP is ready.
 */
export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formStartedRef = useRef<number>(0);

  useEffect(() => {
    formStartedRef.current = Date.now();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-form-started": String(formStartedRef.current),
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company") || "",
          message: formData.get("message"),
          locale,
          website: formData.get("website") || "",
        }),
      });

      if (!res.ok) throw new Error("Submit failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
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
