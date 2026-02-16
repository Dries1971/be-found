"use client";

import {
  Button,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Stat,
  Input,
  Textarea,
  Select,
  Label,
  FieldError,
} from "@/components/ui";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gold">{title}</h2>
      {children}
    </section>
  );
}

export function ComponentShowcase() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* ─── Buttons ─── */}
      <Section title="Button">
        <div className="flex flex-wrap gap-3 items-center">
          <Button intent="primary">Primary</Button>
          <Button intent="secondary">Secondary</Button>
          <Button intent="ghost">Ghost</Button>
          <Button intent="link">Link</Button>
          <Button intent="destructive">Destructive</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap gap-3 items-center mt-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Settings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </Button>
        </div>
      </Section>

      {/* ─── Badges ─── */}
      <Section title="Badge">
        <div className="flex flex-wrap gap-3 items-center">
          <Badge>Default</Badge>
          <Badge intent="status">Status</Badge>
          <Badge intent="category">Category</Badge>
          <Badge intent="tag">Tag</Badge>
          <Badge intent="geo-score">92</Badge>
          <Badge intent="success">Success</Badge>
          <Badge intent="warning">Warning</Badge>
          <Badge intent="destructive">Error</Badge>
          <Badge intent="info">Info</Badge>
        </div>
        <div className="flex flex-wrap gap-3 items-center mt-4">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </Section>

      {/* ─── Alerts ─── */}
      <Section title="Alert">
        <div className="flex flex-col gap-3">
          <Alert intent="info">
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>GEO optimization analysis is running.</AlertDescription>
          </Alert>
          <Alert intent="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your GEO score improved to 92/100.</AlertDescription>
          </Alert>
          <Alert intent="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Your citation coverage is below target.</AlertDescription>
          </Alert>
          <Alert intent="error">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to fetch GEO data. Please try again.</AlertDescription>
          </Alert>
        </div>
      </Section>

      {/* ─── Cards ─── */}
      <Section title="Card">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>A basic card with default styling.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground-muted">Card content goes here.</p>
            </CardContent>
          </Card>
          <Card intent="featured">
            <CardHeader>
              <CardTitle>Featured Card</CardTitle>
              <CardDescription>Highlighted with gold border and glow.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground-muted">Featured content.</p>
            </CardContent>
          </Card>
          <Card intent="product">
            <CardHeader>
              <CardTitle>Product Card</CardTitle>
              <CardDescription>With hover elevation effect.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground-muted">Product details.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Learn More</Button>
            </CardFooter>
          </Card>
          <Card intent="tech">
            <CardHeader>
              <CardTitle>Tech Card</CardTitle>
              <CardDescription>Teal accent for technical content.</CardDescription>
            </CardHeader>
          </Card>
          <Card intent="stat" padding="lg">
            <span className="text-3xl font-bold text-gold">92/100</span>
            <p className="mt-2 text-sm text-foreground-muted">GEO Score</p>
          </Card>
        </div>
      </Section>

      {/* ─── Stats ─── */}
      <Section title="Stat">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="92" label="GEO Score" trend={{ value: "+12%", direction: "up" }} />
          <Stat value="1,247" label="Citations" trend={{ value: "+8%", direction: "up" }} />
          <Stat value="34ms" label="Response Time" trend={{ value: "-15%", direction: "down" }} />
          <Stat value="99.9%" label="Uptime" trend={{ value: "0%", direction: "neutral" }} />
        </div>
      </Section>

      {/* ─── Inputs ─── */}
      <Section title="Input">
        <div className="max-w-md flex flex-col gap-4">
          <div>
            <Label htmlFor="name" required>Name</Label>
            <Input id="name" placeholder="Enter your name" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="email" required>Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="error-demo">With error</Label>
            <Input id="error-demo" error placeholder="Invalid input" className="mt-1.5" />
            <FieldError>This field is required.</FieldError>
          </div>
          <div>
            <Label htmlFor="select-demo">Select</Label>
            <Select id="select-demo" className="mt-1.5">
              <option value="">Choose an option...</option>
              <option value="geo">GEO Consulting</option>
              <option value="content">AI Content Strategy</option>
              <option value="audit">GEO Audit</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="textarea-demo">Message</Label>
            <Textarea id="textarea-demo" placeholder="Tell us about your project..." className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="disabled-demo">Disabled</Label>
            <Input id="disabled-demo" disabled placeholder="Disabled input" className="mt-1.5" />
          </div>
        </div>
      </Section>
    </div>
  );
}
