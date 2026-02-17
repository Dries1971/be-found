import { describe, it, expect } from "vitest";
import { z } from "zod";

// Replicate the contact schema from the API route for testing
const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  company: z.string().max(200).optional().default(""),
  message: z.string().min(10).max(5000),
  locale: z.string().min(2).max(5).optional().default("en"),
  website: z.string().max(0).optional().default(""),
});

const subscribeSchema = z.object({
  email: z.string().email().max(320),
  locale: z.string().min(2).max(5).optional().default("en"),
  website: z.string().max(0).optional().default(""),
});

describe("Contact form validation", () => {
  it("accepts valid contact data", () => {
    const result = contactSchema.safeParse({
      name: "Dries de Gelder",
      email: "dries@be-found.online",
      company: "Be-Found",
      message: "I want to discuss GEO optimization for our brand.",
      locale: "en",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = contactSchema.safeParse({
      name: "",
      email: "test@example.com",
      message: "Hello, I need help with GEO.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Test",
      email: "not-an-email",
      message: "Hello, I need help with GEO.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message shorter than 10 chars", () => {
    const result = contactSchema.safeParse({
      name: "Test",
      email: "test@example.com",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects message longer than 5000 chars", () => {
    const result = contactSchema.safeParse({
      name: "Test",
      email: "test@example.com",
      message: "x".repeat(5001),
    });
    expect(result.success).toBe(false);
  });

  it("detects honeypot (non-empty website field)", () => {
    const result = contactSchema.safeParse({
      name: "Bot",
      email: "bot@spam.com",
      message: "Buy cheap SEO services now!!!",
      website: "http://spam.com",
    });
    expect(result.success).toBe(false);
  });

  it("defaults locale to en when not provided", () => {
    const result = contactSchema.parse({
      name: "Test",
      email: "test@example.com",
      message: "Hello, I need help with GEO.",
    });
    expect(result.locale).toBe("en");
  });
});

describe("Newsletter subscription validation", () => {
  it("accepts valid email", () => {
    const result = subscribeSchema.safeParse({
      email: "subscriber@example.com",
      locale: "nl",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const result = subscribeSchema.safeParse({
      email: "invalid",
    });
    expect(result.success).toBe(false);
  });

  it("detects honeypot", () => {
    const result = subscribeSchema.safeParse({
      email: "bot@spam.com",
      website: "http://spam.com",
    });
    expect(result.success).toBe(false);
  });

  it("defaults locale to en", () => {
    const result = subscribeSchema.parse({
      email: "test@example.com",
    });
    expect(result.locale).toBe("en");
  });
});
