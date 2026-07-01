# Mutual NDA Creator — Design Document

## What is it?

A web application that generates a completed **Mutual Non-Disclosure Agreement (MNDA)** from user-supplied information. Instead of manually editing a legal template, the user fills out a structured form and instantly sees a properly formatted, legally complete NDA document ready to download as a PDF.

The document is based on the **Common Paper Mutual NDA Standard (Version 1.0)** — an open, standardised legal agreement freely usable under CC BY 4.0.

---

## What does it do?

1. **User fills a form** with the key details of their NDA:
   - Purpose of information sharing
   - Effective date
   - How long the agreement lasts (MNDA Term)
   - How long confidentiality obligations apply (Term of Confidentiality)
   - Governing law (state) and jurisdiction (court location)
   - Any modifications to the standard terms
   - Names, titles, companies, and notice addresses for both parties

2. **Document updates live** — as the user types, the NDA preview on the right reflects every change in real time. Dynamic values (purpose, dates, jurisdiction, etc.) are bolded inline within the legal text so the user can clearly see what has been substituted.

3. **User downloads as PDF** — clicking "Download PDF" triggers the browser's native print dialog. Print CSS hides the form and renders only the document, giving a clean, professional PDF output without any extra dependencies.

---

## Where can it be used?

| Scenario | How it helps |
|----------|-------------|
| **Startups & small businesses** | Quickly generate an NDA before a partnership discussion or vendor conversation without engaging a lawyer for a routine agreement |
| **Freelancers & consultants** | Create a mutual NDA when sharing proprietary project details with a client |
| **In-house legal / ops teams** | Self-service NDA generation for common, low-risk confidentiality situations — frees up legal time for complex matters |
| **Accelerators & incubators** | Standardised NDA creation for cohort companies meeting investors or collaborators |
| **Legal tech platforms** | Embeddable prototype for a broader document automation product |

---

## High-Level Architecture

```
frontend/
├── app/                   ← Next.js App Router
│   ├── layout.tsx         ← Root HTML shell, metadata, global CSS import
│   ├── page.tsx           ← Main page (client component)
│   └── globals.css        ← Tailwind directives + print media query
│
├── components/
│   ├── NDAForm.tsx        ← Controlled form component (client component)
│   └── NDADocument.tsx    ← Pure document renderer (no state, no hooks)
│
└── lib/
    └── types.ts           ← Shared TypeScript interfaces and default values
```

### Data flow

```
page.tsx  (owns state)
│
│  NDAFormData (useState)
│
├──▶ NDAForm.tsx
│       User edits a field
│       └──▶ calls onChange(updatedData)
│               └──▶ state updates in page.tsx
│
└──▶ NDADocument.tsx
        Receives latest NDAFormData as props
        Re-renders synchronously — no fetch, no async
        Two instances:
          • Screen preview (right pane, visible on screen)
          • Print-only div (hidden on screen, shown on print)
```

### Key design decisions

| Decision | Reasoning |
|----------|-----------|
| **No backend** | All logic is client-side; no server needed for a prototype. The NDA text is hardcoded in the component — no template engine or API call required. |
| **`window.print()` for PDF** | Zero dependencies. The browser handles pagination, fonts, and margins via `@page` CSS. |
| **Two NDADocument renders** | One for the live screen preview (inside the scrollable right pane), one hidden for print (so print CSS can render it full-width without fighting the flex layout). |
| **Tailwind print variants** | `print:hidden` and `hidden print:block` cleanly separate screen and print layouts without separate CSS files. |
| **Uncontrolled → controlled form** | All form state lives in `page.tsx` via a single `NDAFormData` object, making it trivial to pass the same data to both the form and the document renderer. |

### Rendering pipeline (screen)

```
Browser loads page.tsx
  → useState initialised with defaultFormData (today's date, 1-year terms, empty party fields)
  → NDAForm renders the form fields
  → NDADocument renders the full MNDA with placeholder text for empty fields
  → User types → onChange → setState → React re-renders NDADocument
```

### Rendering pipeline (PDF)

```
User clicks "Download PDF"
  → window.print() fires
  → @media print CSS activates:
      · print:hidden elements (header, form pane, screen preview) disappear
      · hidden print:block element (print-only NDADocument div) appears
      · overflow/height constraints removed so full document flows
      · @page sets 0.75in margins
  → Browser print dialog opens → user saves as PDF
```
