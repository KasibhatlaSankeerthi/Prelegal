"use client";

import { NDAFormData, PartyInfo } from "@/lib/types";

interface Props {
  data: NDAFormData;
  onChange: (data: NDAFormData) => void;
}

function Section({ title }: { title: string }) {
  return (
    <div className="px-6 pt-5 pb-1">
      <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 pb-2">
        {title}
      </h2>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 py-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {hint && (
          <span className="ml-1 text-xs font-normal text-gray-500">
            — {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function PartyFields({
  party,
  onChange,
  inputClass,
}: {
  party: PartyInfo;
  onChange: (field: keyof PartyInfo, value: string) => void;
  inputClass: string;
}) {
  return (
    <>
      <Field label="Print Name">
        <input
          type="text"
          className={inputClass}
          value={party.printName}
          onChange={(e) => onChange("printName", e.target.value)}
        />
      </Field>
      <Field label="Title">
        <input
          type="text"
          className={inputClass}
          value={party.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </Field>
      <Field label="Company">
        <input
          type="text"
          className={inputClass}
          value={party.company}
          onChange={(e) => onChange("company", e.target.value)}
        />
      </Field>
      <Field label="Notice Address" hint="Email or postal address">
        <input
          type="text"
          className={inputClass}
          value={party.noticeAddress}
          onChange={(e) => onChange("noticeAddress", e.target.value)}
        />
      </Field>
    </>
  );
}

export default function NDAForm({ data, onChange }: Props) {
  const update = (partial: Partial<NDAFormData>) =>
    onChange({ ...data, ...partial });

  const updateParty = (
    party: "party1" | "party2",
    field: keyof PartyInfo,
    value: string
  ) => update({ [party]: { ...data[party], [field]: value } });

  const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
    "disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <div className="pb-12">
      {/* ── Agreement Details ─────────────────────────────────────── */}
      <Section title="Agreement Details" />

      <Field label="Purpose" hint="How Confidential Information may be used">
        <textarea
          rows={3}
          className={inputClass + " resize-none"}
          value={data.purpose}
          onChange={(e) => update({ purpose: e.target.value })}
        />
      </Field>

      <Field label="Effective Date">
        <input
          type="date"
          className={inputClass}
          value={data.effectiveDate}
          onChange={(e) => update({ effectiveDate: e.target.value })}
        />
      </Field>

      {/* ── Terms ─────────────────────────────────────────────────── */}
      <Section title="Terms" />

      <Field label="MNDA Term" hint="Length of this agreement">
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mndaTermType"
              className="accent-blue-600"
              checked={data.mndaTermType === "expires"}
              onChange={() => update({ mndaTermType: "expires" })}
            />
            <span className="text-sm text-gray-700">Expires after</span>
            <input
              type="number"
              min={1}
              max={99}
              className="w-16 border border-gray-300 rounded px-2 py-1 text-sm disabled:opacity-40"
              value={data.mndaTermYears}
              disabled={data.mndaTermType !== "expires"}
              onChange={(e) =>
                update({
                  mndaTermYears: Math.max(1, parseInt(e.target.value) || 1),
                })
              }
            />
            <span className="text-sm text-gray-700">year(s) from Effective Date</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="mndaTermType"
              className="accent-blue-600"
              checked={data.mndaTermType === "continues"}
              onChange={() => update({ mndaTermType: "continues" })}
            />
            <span className="text-sm text-gray-700">
              Continues until terminated
            </span>
          </label>
        </div>
      </Field>

      <Field
        label="Term of Confidentiality"
        hint="How long Confidential Information is protected"
      >
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="confidentialityTermType"
              className="accent-blue-600"
              checked={data.confidentialityTermType === "years"}
              onChange={() => update({ confidentialityTermType: "years" })}
            />
            <input
              type="number"
              min={1}
              max={99}
              className="w-16 border border-gray-300 rounded px-2 py-1 text-sm disabled:opacity-40"
              value={data.confidentialityTermYears}
              disabled={data.confidentialityTermType !== "years"}
              onChange={(e) =>
                update({
                  confidentialityTermYears: Math.max(
                    1,
                    parseInt(e.target.value) || 1
                  ),
                })
              }
            />
            <span className="text-sm text-gray-700">year(s) from Effective Date</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="confidentialityTermType"
              className="accent-blue-600"
              checked={data.confidentialityTermType === "perpetuity"}
              onChange={() =>
                update({ confidentialityTermType: "perpetuity" })
              }
            />
            <span className="text-sm text-gray-700">In perpetuity</span>
          </label>
        </div>
      </Field>

      {/* ── Governing Law ─────────────────────────────────────────── */}
      <Section title="Governing Law" />

      <Field label="Governing Law">
        <input
          type="text"
          className={inputClass}
          placeholder="e.g., Delaware"
          value={data.governingLaw}
          onChange={(e) => update({ governingLaw: e.target.value })}
        />
      </Field>

      <Field label="Jurisdiction" hint="City or county and state">
        <input
          type="text"
          className={inputClass}
          placeholder="e.g., courts located in New Castle, DE"
          value={data.jurisdiction}
          onChange={(e) => update({ jurisdiction: e.target.value })}
        />
      </Field>

      {/* ── Modifications ─────────────────────────────────────────── */}
      <Section title="Modifications" />

      <Field
        label="MNDA Modifications"
        hint="Optional — any changes to the standard terms"
      >
        <textarea
          rows={3}
          className={inputClass + " resize-none"}
          placeholder="Leave blank if none"
          value={data.modifications}
          onChange={(e) => update({ modifications: e.target.value })}
        />
      </Field>

      {/* ── Party 1 ───────────────────────────────────────────────── */}
      <Section title="Party 1" />
      <PartyFields
        party={data.party1}
        inputClass={inputClass}
        onChange={(field, value) => updateParty("party1", field, value)}
      />

      {/* ── Party 2 ───────────────────────────────────────────────── */}
      <Section title="Party 2" />
      <PartyFields
        party={data.party2}
        inputClass={inputClass}
        onChange={(field, value) => updateParty("party2", field, value)}
      />
    </div>
  );
}
