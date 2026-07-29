# Prelegal

A curated library of plain-language legal document templates for common business agreements. Every template is written in Markdown, free to use, and based on the [Common Paper](https://commonpaper.com/) open standards.

## Available Templates

| Template | Description |
|---|---|
| [Mutual NDA](templates/Mutual-NDA.md) | Standard mutual non-disclosure agreement covering confidentiality obligations between two parties |
| [Mutual NDA Cover Page](templates/Mutual-NDA-coverpage.md) | Fillable cover page for the Mutual NDA with signature blocks and key terms |
| [Cloud Service Agreement](templates/CSA.md) | SaaS access, support, customer content, privacy, payment, and liability |
| [Design Partner Agreement](templates/design-partner-agreement.md) | Early-access product programs covering product access, feedback, fees, and IP |
| [Service Level Agreement](templates/sla.md) | Uptime targets, response times, service credits, and remedies |
| [Professional Services Agreement](templates/psa.md) | SOW-based engagements, deliverables, IP assignment, and payment |
| [Data Processing Agreement](templates/DPA.md) | GDPR compliance, processor/subprocessor relationships, EEA SCCs, UK Addendum, and security incidents |
| [Software License Agreement](templates/Software-License-Agreement.md) | On-premise software licensing, restrictions, updates, warranties, and support |
| [Partnership Agreement](templates/Partnership-Agreement.md) | Co-marketing obligations, trademark licenses, fees, confidentiality, and indemnification |
| [Pilot Agreement](templates/Pilot-Agreement.md) | Time-limited product evaluations covering access, restrictions, AS-IS disclaimers, and confidentiality |
| [Business Associate Agreement](templates/BAA.md) | HIPAA compliance covering PHI obligations, breach notification, and permitted uses |
| [AI Addendum](templates/AI-Addendum.md) | AI service restrictions, model training, input/output ownership, personal data, and AI disclaimers |

## Usage

1. Browse the table above or open `catalog.json` to find the template that fits your needs.
2. Open the corresponding Markdown file in the `templates/` directory.
3. Fill in the bracketed fields (e.g. party names, dates, governing law) with your own values.
4. For agreements that have a separate cover page (e.g. the Mutual NDA), complete the cover page and attach it to the standard terms.
5. Have both parties review, sign, and retain a copy.

> **Note:** These templates are provided for informational purposes only and do not constitute legal advice. Consult a qualified attorney before using any legal document.

## Template Catalog

The `catalog.json` file at the root of the repository lists every available template with its name, description, and file path. It is machine-readable and can be used to build integrations or tooling on top of the template library.

```json
[
  {
    "name": "Mutual Non-Disclosure Agreement",
    "description": "...",
    "filename": "templates/Mutual-NDA.md"
  },
  ...
]
```

## License

Templates are free to use under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) in accordance with the Common Paper open standards.
