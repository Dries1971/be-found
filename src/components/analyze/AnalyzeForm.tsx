"use client";

import { useActionState, useEffect, useId, useRef, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { cn } from "@/lib/utils";
import { submitAnalysis, type AnalyzeFormState } from "@/app/[locale]/analyze/actions";
import { Turnstile, type TurnstileHandle } from "./Turnstile";

interface AnalyzeFormProps {
  /** Cloudflare Turnstile site key (public), passed from a server component. */
  turnstileSiteKey: string;
  /** Compact = single row for embedding on other pages. */
  variant?: "full" | "compact";
  className?: string;
}

const initialState: AnalyzeFormState = { error: null, value: "" };

export function AnalyzeForm({ turnstileSiteKey, variant = "full", className }: AnalyzeFormProps) {
  const t = useTranslations("analyze");
  const locale = useLocale();
  const [state, formAction, submitting] = useActionState(submitAnalysis, initialState);
  const [navigating, startNavigation] = useTransition();
  const router = useRouter();
  const pending = submitting || navigating || Boolean(state.analysisId);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const inputId = useId();
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  useEffect(() => {
    if (state.analysisId) {
      const id = state.analysisId;
      startNavigation(() => router.push(`/analyze/${id}`));
    } else if (state.error) {
      // A failed attempt has consumed the Turnstile token: get a fresh one.
      turnstileRef.current?.reset();
    }
  }, [state, router]);

  const compact = variant === "compact";

  return (
    <form action={formAction} className={cn("space-y-3", className)} noValidate>
      <input type="hidden" name="locale" value={locale} />

      <Label htmlFor={inputId} className={cn(compact && "sr-only")}>
        {t("form_label")}
      </Label>

      <div className={cn("flex gap-3", compact ? "flex-col sm:flex-row" : "flex-col")}>
        <Input
          id={inputId}
          name="url"
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          required
          aria-required="true"
          aria-invalid={state.error === "error_url" || undefined}
          aria-describedby={cn(hintId, state.error && errorId)}
          defaultValue={state.value}
          key={state.value}
          placeholder={t("form_placeholder")}
          disabled={pending}
          className="min-h-12 flex-1 text-base"
        />
        <Button
          type="submit"
          intent="primary"
          size="lg"
          disabled={pending}
          className={cn("min-h-12", !compact && "w-full")}
        >
          {pending ? t("form_busy") : t("form_button")}
        </Button>
      </div>

      <p id={hintId} className="text-sm text-foreground-muted">
        {t("form_hint")}
      </p>

      <Turnstile ref={turnstileRef} siteKey={turnstileSiteKey} locale={locale} />

      {state.error && (
        <Alert intent="error" id={errorId} role="alert">
          <AlertDescription>{t(state.error)}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
