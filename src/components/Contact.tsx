import { useState, type FormEvent } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Info,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio';

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [validatedSubmission, setValidatedSubmission] = useState<ContactFormValues | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const validate = (formValues: ContactFormValues): ContactFormErrors => {
    const nextErrors: ContactFormErrors = {};

    if (!formValues.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    } else if (formValues.name.trim().length < 2) {
      nextErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formValues.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(formValues.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formValues.subject.trim()) {
      nextErrors.subject = 'Please enter a subject.';
    } else if (formValues.subject.trim().length < 3) {
      nextErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formValues.message.trim()) {
      nextErrors.message = 'Please enter a message.';
    } else if (formValues.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters.';
    }

    return nextErrors;
  };

  const handleFieldChange = (field: keyof ContactFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setValidatedSubmission({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });
    } else {
      setValidatedSubmission(null);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleCopyDraft = async () => {
    if (!validatedSubmission) return;
    const formatted = [
      `Name: ${validatedSubmission.name}`,
      `Email: ${validatedSubmission.email}`,
      `Subject: ${validatedSubmission.subject}`,
      '',
      validatedSubmission.message,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const buildMailtoHref = (submission: ContactFormValues) => {
    const subject = encodeURIComponent(submission.subject);
    const body = encodeURIComponent(
      `Name: ${submission.name}\nReply-To: ${submission.email}\n\n${submission.message}`
    );
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Contact Channels */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wider text-violet-700 dark:text-violet-400">
              04. Contact
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50 [text-wrap:balance]">
              Let&apos;s build something functional together.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-300">
              Reach out for full-stack web applications, e-commerce platforms, cloud deployments, or
              workflow automation inquiries.
            </p>

            <div className="mt-8 space-y-4 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              {/* Email Card Row */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-[#0C0C12]">
                <div className="min-w-0">
                  <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="mt-1 flex items-center gap-2 truncate text-sm font-semibold text-zinc-950 transition-colors hover:text-violet-700 dark:text-zinc-100 dark:hover:text-violet-300"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                    <span className="truncate">{PERSONAL_INFO.email}</span>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-violet-400 hover:text-violet-700 dark:border-zinc-800 dark:bg-[#14141D] dark:text-zinc-300 dark:hover:border-violet-500/60 dark:hover:text-violet-300 whitespace-nowrap shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-violet-400/70 dark:border-zinc-800 dark:bg-[#0C0C12] dark:hover:border-violet-500/50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Linkedin className="h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                  <div className="min-w-0">
                    <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      LinkedIn
                    </span>
                    <span className="block truncate text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                      Ibrahim Agboola
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-violet-400/70 dark:border-zinc-800 dark:bg-[#0C0C12] dark:hover:border-violet-500/50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Github className="h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                  <div className="min-w-0">
                    <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      GitHub
                    </span>
                    <span className="block truncate text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                      github.com/Painstakinggg
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-[#0C0C12] sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(event) => handleFieldChange('name', event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    placeholder="Your full name"
                    className={`mt-2 w-full rounded-lg border bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors dark:bg-[#07070B] dark:text-zinc-100 dark:placeholder:text-zinc-600 ${
                      errors.name
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-zinc-200 focus:border-violet-500 dark:border-zinc-800 dark:focus:border-violet-500'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(event) => handleFieldChange('email', event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    placeholder="you@example.com"
                    className={`mt-2 w-full rounded-lg border bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors dark:bg-[#07070B] dark:text-zinc-100 dark:placeholder:text-zinc-600 ${
                      errors.email
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-zinc-200 focus:border-violet-500 dark:border-zinc-800 dark:focus:border-violet-500'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={(event) => handleFieldChange('subject', event.target.value)}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  placeholder="Project inquiry or collaboration"
                  className={`mt-2 w-full rounded-lg border bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors dark:bg-[#07070B] dark:text-zinc-100 dark:placeholder:text-zinc-600 ${
                    errors.subject
                      ? 'border-rose-500 focus:border-rose-500'
                      : 'border-zinc-200 focus:border-violet-500 dark:border-zinc-800 dark:focus:border-violet-500'
                  }`}
                />
                {errors.subject && (
                  <p
                    id="contact-subject-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={(event) => handleFieldChange('message', event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  placeholder="Tell me about your project, timeline, or technical requirements..."
                  className={`mt-2 w-full resize-y rounded-lg border bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-950 placeholder:text-zinc-400 transition-colors dark:bg-[#07070B] dark:text-zinc-100 dark:placeholder:text-zinc-600 ${
                    errors.message
                      ? 'border-rose-500 focus:border-rose-500'
                      : 'border-zinc-200 focus:border-violet-500 dark:border-zinc-800 dark:focus:border-violet-500'
                  }`}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Honest Delivery Notice when Validated */}
              {validatedSubmission && (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-violet-300 bg-violet-50/70 p-4 text-sm text-zinc-800 dark:border-violet-500/40 dark:bg-violet-950/25 dark:text-zinc-200"
                >
                  <div className="flex items-start gap-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                    <div className="space-y-2">
                      <p className="font-semibold text-zinc-950 dark:text-zinc-50">
                        Form validated — email delivery backend not configured
                      </p>
                      <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                        This portfolio runs as a static frontend without an active mail server. To
                        enable automatic delivery, connect a service such as Formspree, Resend,
                        EmailJS, or a Cloudflare Worker / Express API endpoint. You can send this
                        message directly via your email client below.
                      </p>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <a
                          href={buildMailtoHref(validatedSubmission)}
                          className="inline-flex min-h-[36px] items-center gap-2 rounded-lg bg-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-violet-500"
                        >
                          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Open in Email Client</span>
                        </a>
                        <button
                          type="button"
                          onClick={handleCopyDraft}
                          className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-800 transition-colors hover:border-violet-400 dark:border-zinc-700 dark:bg-[#0E0E14] dark:text-zinc-200"
                        >
                          {copiedDraft ? (
                            <>
                              <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                              <span>Message Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Copy Message</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200/80 pt-5 dark:border-zinc-800/80">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Direct email:{' '}
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-4 hover:text-violet-700 dark:text-zinc-200 dark:decoration-zinc-700 dark:hover:text-violet-300"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </p>

                <button
                  type="submit"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-violet-500 active:bg-violet-700 whitespace-nowrap shrink-0"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
