"use client";

import { useState } from "react";
import NDAForm from "@/components/NDAForm";
import NDADocument from "@/components/NDADocument";
import { defaultFormData, NDAFormData } from "@/lib/types";

export default function Home() {
  const [formData, setFormData] = useState<NDAFormData>(defaultFormData);

  return (
    <>
      {/* ── Screen layout ─────────────────────────────────────────── */}
      <div className="print:hidden flex flex-col h-screen">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shrink-0">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Mutual NDA Creator
            </h1>
            <p className="text-xs text-gray-500">
              Fill in the form — the document updates live on the right
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm2.25 8.5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Zm0 3a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z"
                clipRule="evenodd"
              />
            </svg>
            Download PDF
          </button>
        </header>

        {/* Split pane */}
        <div className="flex flex-1 min-h-0">
          {/* Form — left pane */}
          <div className="w-1/2 overflow-y-auto bg-white border-r border-gray-200">
            <NDAForm data={formData} onChange={setFormData} />
          </div>

          {/* Preview — right pane */}
          <div className="w-1/2 overflow-y-auto bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto">
              <p className="text-xs text-gray-500 mb-3 text-center font-medium uppercase tracking-wider">
                Document Preview
              </p>
              <NDADocument data={formData} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Print-only layout ──────────────────────────────────────── */}
      {/* Hidden on screen; expanded by print media query in globals.css */}
      <div className="hidden print:block">
        <NDADocument data={formData} />
      </div>
    </>
  );
}
