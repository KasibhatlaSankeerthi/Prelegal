import { NDAFormData, PartyInfo } from "@/lib/types";

interface Props {
  data: NDAFormData;
}

/** Renders a filled value; shows a greyed placeholder when empty. */
function DV({ value, fallback }: { value: string; fallback: string }) {
  return value.trim() ? (
    <span className="font-semibold">{value}</span>
  ) : (
    <span className="text-gray-400 italic">[{fallback}]</span>
  );
}

function CoverRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-3 border-b border-gray-200 last:border-0">
      <div className="mb-1">
        <span className="font-bold text-sm">{label}</span>
        {hint && (
          <span className="ml-2 text-xs text-gray-500 italic">{hint}</span>
        )}
      </div>
      <div className="text-sm pl-4">{children}</div>
    </div>
  );
}

function SignatureTable({
  party1,
  party2,
}: {
  party1: PartyInfo;
  party2: PartyInfo;
}) {
  const rows: { label: string; hint?: string; p1: string; p2: string; tall?: boolean }[] = [
    { label: "Signature", p1: "", p2: "", tall: true },
    { label: "Print Name", p1: party1.printName, p2: party2.printName },
    { label: "Title", p1: party1.title, p2: party2.title },
    { label: "Company", p1: party1.company, p2: party2.company },
    {
      label: "Notice Address",
      hint: "Use either email or postal address",
      p1: party1.noticeAddress,
      p2: party2.noticeAddress,
    },
    { label: "Date", p1: "", p2: "" },
  ];

  return (
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr>
          <th className="border border-gray-400 px-3 py-2 text-left bg-gray-100 w-1/4 font-semibold" />
          <th className="border border-gray-400 px-3 py-2 text-center bg-gray-100 font-semibold">
            PARTY 1
          </th>
          <th className="border border-gray-400 px-3 py-2 text-center bg-gray-100 font-semibold">
            PARTY 2
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className={row.tall ? "h-16" : ""}>
            <td className="border border-gray-400 px-3 py-2 align-top bg-gray-50 font-semibold">
              {row.label}
              {row.hint && (
                <div className="text-xs font-normal text-gray-500 mt-0.5">
                  {row.hint}
                </div>
              )}
            </td>
            <td className="border border-gray-400 px-3 py-2 align-top">
              {row.p1}
            </td>
            <td className="border border-gray-400 px-3 py-2 align-top">
              {row.p2}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function NDADocument({ data }: Props) {
  const {
    purpose,
    effectiveDate,
    mndaTermType,
    mndaTermYears,
    confidentialityTermType,
    confidentialityTermYears,
    governingLaw,
    jurisdiction,
    modifications,
    party1,
    party2,
  } = data;

  const formattedDate = effectiveDate
    ? new Date(effectiveDate + "T12:00:00").toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const mndaTermDisplay =
    mndaTermType === "expires"
      ? `${mndaTermYears} year${mndaTermYears !== 1 ? "s" : ""} from Effective Date`
      : "continuing until terminated";

  const confidTermDisplay =
    confidentialityTermType === "years"
      ? `${confidentialityTermYears} year${confidentialityTermYears !== 1 ? "s" : ""} from Effective Date, but in the case of trade secrets until Confidential Information is no longer considered a trade secret under applicable laws`
      : "in perpetuity";

  // Inline references used throughout the standard terms
  const purposeRef = <DV value={purpose} fallback="Purpose" />;
  const dateRef = <DV value={formattedDate} fallback="Effective Date" />;
  const mndaTermRef = <DV value={mndaTermDisplay} fallback="MNDA Term" />;
  const confidTermRef = (
    <DV value={confidTermDisplay} fallback="Term of Confidentiality" />
  );
  const lawRef = <DV value={governingLaw} fallback="Governing Law" />;
  const jurRef = <DV value={jurisdiction} fallback="Jurisdiction" />;

  return (
    <div className="bg-white shadow-md print:shadow-none font-serif text-sm leading-relaxed text-gray-900 p-10 print:p-0">
      <h1 className="text-xl font-bold text-center mb-4">
        Mutual Non-Disclosure Agreement
      </h1>

      {/* Usage note */}
      <div className="border border-gray-300 rounded p-3 mb-6 font-sans text-xs bg-gray-50 print:bg-white">
        <p className="font-semibold mb-1">
          USING THIS MUTUAL NON-DISCLOSURE AGREEMENT
        </p>
        <p>
          This Mutual Non-Disclosure Agreement (the "MNDA") consists of: (1)
          this Cover Page ("Cover Page") and (2) the Common Paper Mutual NDA
          Standard Terms Version 1.0 ("Standard Terms") identical to those
          posted at commonpaper.com/standards/mutual-nda/1.0. Any
          modifications of the Standard Terms should be made on the Cover
          Page, which will control over conflicts with the Standard Terms.
        </p>
      </div>

      {/* ── Cover Page ─────────────────────────────────────────────── */}
      <div className="mb-6">
        <CoverRow label="Purpose" hint="How Confidential Information may be used">
          <DV
            value={purpose}
            fallback="Evaluating whether to enter into a business relationship with the other party."
          />
        </CoverRow>

        <CoverRow label="Effective Date">
          <DV value={formattedDate} fallback="Today's date" />
        </CoverRow>

        <CoverRow label="MNDA Term" hint="The length of this MNDA">
          {mndaTermType === "expires" ? (
            <p>
              Expires {mndaTermYears} year{mndaTermYears !== 1 ? "s" : ""}{" "}
              from Effective Date.
            </p>
          ) : (
            <p>
              Continues until terminated in accordance with the terms of the
              MNDA.
            </p>
          )}
        </CoverRow>

        <CoverRow
          label="Term of Confidentiality"
          hint="How long Confidential Information is protected"
        >
          {confidentialityTermType === "years" ? (
            <p>
              {confidentialityTermYears} year
              {confidentialityTermYears !== 1 ? "s" : ""} from Effective Date,
              but in the case of trade secrets until Confidential Information
              is no longer considered a trade secret under applicable laws.
            </p>
          ) : (
            <p>In perpetuity.</p>
          )}
        </CoverRow>

        <CoverRow label="Governing Law &amp; Jurisdiction">
          <p>
            <span className="font-semibold">Governing Law:</span>{" "}
            <DV value={governingLaw} fallback="Fill in state" />
          </p>
          <p className="mt-1">
            <span className="font-semibold">Jurisdiction:</span>{" "}
            <DV
              value={jurisdiction}
              fallback='Fill in city or county and state, e.g. "courts located in New Castle, DE"'
            />
          </p>
        </CoverRow>

        <CoverRow label="MNDA Modifications">
          {modifications.trim() ? (
            <p className="whitespace-pre-wrap">{modifications}</p>
          ) : (
            <span className="text-gray-400 italic">None</span>
          )}
        </CoverRow>
      </div>

      <p className="text-sm mb-4">
        By signing this Cover Page, each party agrees to enter into this MNDA
        as of the Effective Date.
      </p>

      <SignatureTable party1={party1} party2={party2} />

      <p className="text-xs text-gray-500 mt-3 mb-8">
        Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use
        under CC BY 4.0.
      </p>

      <hr className="border-gray-400 my-8" />

      {/* ── Standard Terms ─────────────────────────────────────────── */}
      <h2 className="text-lg font-bold mb-4">Standard Terms</h2>

      <ol className="list-decimal list-outside space-y-4 pl-5">
        <li>
          <strong>Introduction.</strong> This Mutual Non-Disclosure Agreement
          (which incorporates these Standard Terms and the Cover Page (defined
          below)) ("<strong>MNDA</strong>") allows each party ("
          <strong>Disclosing Party</strong>") to disclose or make available
          information in connection with the {purposeRef} which (1) the
          Disclosing Party identifies to the receiving party ("
          <strong>Receiving Party</strong>") as "confidential", "proprietary",
          or the like or (2) should be reasonably understood as confidential or
          proprietary due to its nature and the circumstances of its disclosure
          ("<strong>Confidential Information</strong>"). Each party's
          Confidential Information also includes the existence and status of
          the parties' discussions and information on the Cover Page.
          Confidential Information includes technical or business information,
          product designs or roadmaps, requirements, pricing, security and
          compliance documentation, technology, inventions and know-how. To
          use this MNDA, the parties must complete and sign a cover page
          incorporating these Standard Terms ("
          <strong>Cover Page</strong>"). Each party is identified on the Cover
          Page and capitalized terms have the meanings given herein or on the
          Cover Page.
        </li>

        <li>
          <strong>Use and Protection of Confidential Information.</strong> The
          Receiving Party shall: (a) use Confidential Information solely for
          the {purposeRef}; (b) not disclose Confidential Information to third
          parties without the Disclosing Party's prior written approval, except
          that the Receiving Party may disclose Confidential Information to its
          employees, agents, advisors, contractors and other representatives
          having a reasonable need to know for the {purposeRef}, provided these
          representatives are bound by confidentiality obligations no less
          protective of the Disclosing Party than the applicable terms in this
          MNDA and the Receiving Party remains responsible for their compliance
          with this MNDA; and (c) protect Confidential Information using at
          least the same protections the Receiving Party uses for its own
          similar information but no less than a reasonable standard of care.
        </li>

        <li>
          <strong>Exceptions.</strong> The Receiving Party's obligations in
          this MNDA do not apply to information that it can demonstrate: (a)
          is or becomes publicly available through no fault of the Receiving
          Party; (b) it rightfully knew or possessed prior to receipt from the
          Disclosing Party without confidentiality restrictions; (c) it
          rightfully obtained from a third party without confidentiality
          restrictions; or (d) it independently developed without using or
          referencing the Confidential Information.
        </li>

        <li>
          <strong>Disclosures Required by Law.</strong> The Receiving Party
          may disclose Confidential Information to the extent required by law,
          regulation or regulatory authority, subpoena or court order, provided
          (to the extent legally permitted) it provides the Disclosing Party
          reasonable advance notice of the required disclosure and reasonably
          cooperates, at the Disclosing Party's expense, with the Disclosing
          Party's efforts to obtain confidential treatment for the Confidential
          Information.
        </li>

        <li>
          <strong>Term and Termination.</strong> This MNDA commences on the{" "}
          {dateRef} and expires at the end of the {mndaTermRef}. Either party
          may terminate this MNDA for any or no reason upon written notice to
          the other party. The Receiving Party's obligations relating to
          Confidential Information will survive for the {confidTermRef}, despite
          any expiration or termination of this MNDA.
        </li>

        <li>
          <strong>Return or Destruction of Confidential Information.</strong>{" "}
          Upon expiration or termination of this MNDA or upon the Disclosing
          Party's earlier request, the Receiving Party will: (a) cease using
          Confidential Information; (b) promptly after the Disclosing Party's
          written request, destroy all Confidential Information in the
          Receiving Party's possession or control or return it to the
          Disclosing Party; and (c) if requested by the Disclosing Party,
          confirm its compliance with these obligations in writing. As an
          exception to subsection (b), the Receiving Party may retain
          Confidential Information in accordance with its standard backup or
          record retention policies or as required by law, but the terms of
          this MNDA will continue to apply to the retained Confidential
          Information.
        </li>

        <li>
          <strong>Proprietary Rights.</strong> The Disclosing Party retains
          all of its intellectual property and other rights in its Confidential
          Information and its disclosure to the Receiving Party grants no
          license under such rights.
        </li>

        <li>
          <strong>Disclaimer.</strong> ALL CONFIDENTIAL INFORMATION IS
          PROVIDED "AS IS", WITH ALL FAULTS, AND WITHOUT WARRANTIES, INCLUDING
          THE IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY AND FITNESS FOR A
          PARTICULAR PURPOSE.
        </li>

        <li>
          <strong>Governing Law and Jurisdiction.</strong> This MNDA and all
          matters relating hereto are governed by, and construed in accordance
          with, the laws of the State of {lawRef}, without regard to the
          conflict of laws provisions of such {lawRef}. Any legal suit, action,
          or proceeding relating to this MNDA must be instituted in the federal
          or state courts located in {jurRef}. Each party irrevocably submits
          to the exclusive jurisdiction of such {jurRef} in any such suit,
          action, or proceeding.
        </li>

        <li>
          <strong>Equitable Relief.</strong> A breach of this MNDA may cause
          irreparable harm for which monetary damages are an insufficient
          remedy. Upon a breach of this MNDA, the Disclosing Party is entitled
          to seek appropriate equitable relief, including an injunction, in
          addition to its other remedies.
        </li>

        <li>
          <strong>General.</strong> Neither party has an obligation under this
          MNDA to disclose Confidential Information to the other or proceed
          with any proposed transaction. Neither party may assign this MNDA
          without the prior written consent of the other party, except that
          either party may assign this MNDA in connection with a merger,
          reorganization, acquisition or other transfer of all or substantially
          all its assets or voting securities. Any assignment in violation of
          this Section is null and void. This MNDA will bind and inure to the
          benefit of each party's permitted successors and assigns. Waivers
          must be signed by the waiving party's authorized representative and
          cannot be implied from conduct. If any provision of this MNDA is
          held unenforceable, it will be limited to the minimum extent
          necessary so the rest of this MNDA remains in effect. This MNDA
          (including the Cover Page) constitutes the entire agreement of the
          parties with respect to its subject matter, and supersedes all prior
          and contemporaneous understandings, agreements, representations, and
          warranties, whether written or oral, regarding such subject matter.
          This MNDA may only be amended, modified, waived, or supplemented by
          an agreement in writing signed by both parties. Notices, requests and
          approvals under this MNDA must be sent in writing to the email or
          postal addresses on the Cover Page and are deemed delivered on
          receipt. This MNDA may be executed in counterparts, including
          electronic copies, each of which is deemed an original and which
          together form the same agreement.
        </li>
      </ol>

      <p className="text-xs text-gray-500 mt-6">
        Common Paper Mutual Non-Disclosure Agreement Version 1.0 free to use
        under CC BY 4.0.
      </p>
    </div>
  );
}
