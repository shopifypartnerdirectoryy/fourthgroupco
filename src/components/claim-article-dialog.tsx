import { useState, type FormEvent } from "react";
import { z } from "zod";
import { ArrowRight, Feather, Loader2, PartyPopper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const EDITORIAL_EMAIL = "stories@fourthgroupco.com";

const schema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name.").max(100, "First name is too long."),
  lastName: z.string().trim().min(1, "Please enter your last name.").max(100, "Last name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address, like name@example.com.")
    .max(255, "Email address is too long."),
  story: z.string().trim().max(2000, "Please keep this under 2,000 characters.").optional(),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;
type Step = "intro" | "form" | "success";

const empty: Values = { firstName: "", lastName: "", email: "", story: "" };

export function ClaimArticleDialog({
  className,
  size = "lg",
}: {
  className?: string;
  size?: "sm" | "default" | "lg";
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // reset after close animation
      setTimeout(() => {
        if (step === "success") setValues(empty);
        setStep("intro");
        setErrors({});
        setSubmitError(null);
      }, 200);
    }
  }

  function update(field: keyof Values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = (["firstName", "lastName", "email", "story"] as const).find((k) => next[k]);
      if (first) document.getElementById(`claim-${first}`)?.focus();
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("article_claims").insert({
      first_name: parsed.data.firstName,
      last_name: parsed.data.lastName,
      email: parsed.data.email,
      story: parsed.data.story ? parsed.data.story : null,
    });
    setSubmitting(false);
    if (error) {
      setSubmitError(`Something went wrong sending your details. Please try again, or email us at ${EDITORIAL_EMAIL}.`);
      return;
    }
    setStep("success");
  }

  const fieldError = (key: keyof Values) =>
    errors[key] ? (
      <p id={`claim-${key}-error`} role="alert" className="text-xs font-medium text-destructive">
        {errors[key]}
      </p>
    ) : null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size={size} className={cn("rounded-md font-semibold", className)}>
          <Feather /> Claim Free Article
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] w-[calc(100%-2rem)] max-w-[480px] overflow-y-auto rounded-xl border-border bg-card p-7 shadow-2xl sm:p-9 [&>button]:size-9 [&>button]:grid [&>button]:place-items-center [&>button]:rounded-full [&>button]:opacity-80 [&>button:hover]:bg-muted [&>button]:focus-visible:ring-2 [&>button]:focus-visible:ring-ring">
        {step === "intro" && (
          <div key="intro" className="animate-in fade-in slide-in-from-bottom-2 text-center duration-300">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent">
              <Feather className="size-5 text-primary" />
            </span>
            <DialogTitle className="mt-5 font-serif text-3xl font-normal leading-tight text-card-foreground">
              Have News Worth Sharing?
            </DialogTitle>
            <DialogDescription className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Get a professionally written article about your book launch, award, publication, or literary achievement — at no cost.
            </DialogDescription>
            <Button size="lg" className="mt-7 h-12 w-full rounded-md font-semibold" onClick={() => setStep("form")}>
              Claim My Free Article <ArrowRight />
            </Button>
            <p className="mt-4 text-[11px] uppercase tracking-wide text-muted-foreground">Free editorial feature · No payment required</p>
          </div>
        )}

        {step === "form" && (
          <div key="form" className="animate-in fade-in slide-in-from-right-4 duration-300">
            <DialogTitle className="font-serif text-3xl font-normal leading-tight text-card-foreground">
              Tell Us About You
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Share a few details and our editorial team will get in touch.
            </DialogDescription>
            <form noValidate onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="claim-firstName">First Name <span className="text-primary" aria-hidden>*</span></Label>
                  <Input id="claim-firstName" autoComplete="given-name" placeholder="First name" value={values.firstName}
                    onChange={(e) => update("firstName", e.target.value)} aria-required="true"
                    aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "claim-firstName-error" : undefined}
                    className="h-11" />
                  {fieldError("firstName")}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="claim-lastName">Last Name <span className="text-primary" aria-hidden>*</span></Label>
                  <Input id="claim-lastName" autoComplete="family-name" placeholder="Last name" value={values.lastName}
                    onChange={(e) => update("lastName", e.target.value)} aria-required="true"
                    aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "claim-lastName-error" : undefined}
                    className="h-11" />
                  {fieldError("lastName")}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="claim-email">Email Address <span className="text-primary" aria-hidden>*</span></Label>
                <Input id="claim-email" type="email" inputMode="email" autoComplete="email" placeholder="Enter your email address"
                  value={values.email} onChange={(e) => update("email", e.target.value)} aria-required="true"
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "claim-email-error" : undefined}
                  className="h-11" />
                {fieldError("email")}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="claim-story">What would you like us to feature? <span className="font-normal text-muted-foreground">(optional)</span></Label>
                <Textarea id="claim-story" rows={4} placeholder="Tell us briefly about your book, award, publication, or achievement..."
                  value={values.story} onChange={(e) => update("story", e.target.value)}
                  aria-invalid={!!errors.story} aria-describedby={errors.story ? "claim-story-error" : undefined} />
                {fieldError("story")}
              </div>
              {submitError && (
                <p role="alert" className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{submitError}</p>
              )}
              <Button type="submit" size="lg" disabled={submitting} className="h-12 w-full rounded-md font-semibold">
                {submitting ? <><Loader2 className="animate-spin" /> Sending…</> : <>Continue <ArrowRight /></>}
              </Button>
            </form>
          </div>
        )}

        {step === "success" && (
          <div key="success" className="animate-in fade-in zoom-in-95 text-center duration-300">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent">
              <PartyPopper className="size-5 text-primary" />
            </span>
            <DialogTitle className="mt-5 font-serif text-3xl font-normal text-card-foreground">You're In!</DialogTitle>
            <p className="mt-1 font-serif text-lg text-primary">We can't wait to tell your story.</p>
            <DialogDescription asChild>
              <div className="mt-5 space-y-3 text-left text-sm leading-relaxed text-muted-foreground">
                <p>Thanks for claiming your free article. Our editorial team will review your information and contact you at the email address you provided with the next steps.</p>
                <p>We can help turn your news — whether it's a book launch, award, new publication, or another literary achievement — into a professionally written article.</p>
                <p>We'll publish your story on our platform, share it across our social media channels, and put your story in front of thousands of readers in our literary community.</p>
                <p className="font-semibold text-card-foreground">No cost. No hassle. Just your news, beautifully told.</p>
              </div>
            </DialogDescription>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Questions?</p>
              <a href={`mailto:${EDITORIAL_EMAIL}`} className="mt-1 inline-block rounded-sm font-semibold text-foreground underline decoration-primary underline-offset-4 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {EDITORIAL_EMAIL}
              </a>
            </div>
            <Button size="lg" className="mt-6 h-12 w-full rounded-md font-semibold" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
