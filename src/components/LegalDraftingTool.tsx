import React, { useState } from 'react';
import { WatermarkBackground } from './WatermarkBackground';
import {
  PenTool,
  Sparkles,
  Copy,
  Check,
  Download,
  AlertTriangle,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { legalDraftTemplates } from '../data/mockData';
import { LegalDraftTemplate } from '../types';

export const LegalDraftingTool: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<LegalDraftTemplate>(legalDraftTemplates[0]);
  const [fieldValues, setFieldValues] = useState<{ [key: string]: string }>({
    vendorName: 'Kato Paul',
    purchaserName: 'Nakato Mary',
    landLocation: 'Kyaddondo Block 210 Plot 45, Wakiso District',
    purchasePrice: '85,000,000/-',
    spouseName: 'Mukasa Sarah'
  });
  const [generatedDraft, setGeneratedDraft] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFieldChange = (key: string, val: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleGenerateDocument = async () => {
    setIsGenerating(true);
    try {
      const detailsString = Object.entries(fieldValues)
        .map(([k, v]) => `${k}: ${v}`)
        .join(', ');

      const res = await fetch('/api/ai/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: selectedTemplate.title,
          details: detailsString,
          partyNames: `${fieldValues.vendorName || ''} and ${fieldValues.purchaserName || ''}`,
          statutoryRef: selectedTemplate.category
        })
      });

      const data = await res.json();
      if (data.documentText) {
        setGeneratedDraft(data.documentText);
      } else {
        // Fallback to client template replacement
        let text = selectedTemplate.defaultTemplate;
        Object.entries(fieldValues).forEach(([k, v]) => {
          text = text.replace(new RegExp(`\\[${k}\\]`, 'g'), v || `[${k}]`);
        });
        setGeneratedDraft(text);
      }
    } catch (err) {
      console.error(err);
      let text = selectedTemplate.defaultTemplate;
      Object.entries(fieldValues).forEach(([k, v]) => {
        text = text.replace(new RegExp(`\\[${k}\\]`, 'g'), v || `[${k}]`);
      });
      setGeneratedDraft(text);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative space-y-8 pb-12 text-slate-100">
      <WatermarkBackground type="gavel" opacity={0.18} blendMode="normal" withVignette={false} withGradientOverlay={false} />
      
      {/* Header */}
      <div className="relative z-10 bg-slate-950/40 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-[#c89d42]">
                <PenTool className="w-5 h-5" />
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-slate-100">
                AI Legal Document Drafting Assistant
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Generate statutory-compliant contracts, affidavits, demand letters, MOUs, and formal court instruments tailored for Uganda.
            </p>
          </div>
          <span className="text-xs font-bold text-[#c89d42] bg-white/[0.05] px-3 py-1.5 rounded-full border border-[#c89d42]/30 self-start sm:self-auto font-mono backdrop-blur-sm">
            Statutory Verified
          </span>
        </div>

        {/* Legal Disclaimer Notice Banner */}
        <div className="p-4 rounded-2xl bg-black/30 border border-[#c89d42]/30 flex items-start gap-3 text-xs text-slate-300 backdrop-blur-sm">
          <AlertTriangle className="w-5 h-5 text-[#c89d42] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#c89d42]">MANDATORY LEGAL NOTICE:</strong> AI-generated legal documents are provided strictly for educational and preliminary drafting reference purposes. Under the Advocates Act Cap 267, all documents intended for court submission or execution must be reviewed and endorsed by a qualified Ugandan advocate.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Form: Select Template & Details */}
        <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-6 shadow-xl backdrop-blur-md">
          <h2 className="font-bold text-sm text-slate-100 border-b border-white/10 pb-3">
            1. Select Document Template
          </h2>

          <div className="space-y-2">
            {legalDraftTemplates.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => {
                  setSelectedTemplate(tmpl);
                  setGeneratedDraft('');
                }}
                className={`w-full text-left p-3.5 rounded-2xl border text-xs transition flex flex-col gap-1 cursor-pointer backdrop-blur-sm ${
                  selectedTemplate.id === tmpl.id
                    ? 'bg-[#c89d42]/15 border-[#c89d42] text-[#c89d42] font-bold'
                    : 'bg-black/30 border-white/10 text-slate-300 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{tmpl.title}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/10">{tmpl.category}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-normal line-clamp-2">{tmpl.description}</p>
              </button>
            ))}
          </div>

          <h2 className="font-bold text-sm text-slate-100 border-b border-white/10 pb-3 pt-2">
            2. Enter Party & Case Details
          </h2>

          <div className="space-y-3">
            {selectedTemplate.requiredFields.map((f) => (
              <div key={f.key}>
                <label className="text-[11px] text-slate-300 block mb-1 font-medium">{f.label}</label>
                <input
                  type="text"
                  value={fieldValues[f.key] || ''}
                  onChange={(e) => handleFieldChange(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full bg-black/30 border border-white/10 text-slate-100 text-xs rounded-xl p-2.5 focus:outline-none focus:border-[#c89d42]"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleGenerateDocument}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-2xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            {isGenerating ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{isGenerating ? 'Drafting Document...' : 'Generate Legal Document'}</span>
          </button>
        </div>

        {/* Right Preview Window */}
        <div className="lg:col-span-2 bg-slate-950/40 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#c89d42]" /> Draft Preview Window
              </h2>

              {generatedDraft && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyDraft}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#c89d42]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>

                  <a
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(generatedDraft)}`}
                    download={`${selectedTemplate.title.replace(/\s+/g, '_')}_Uganda.txt`}
                    className="px-3 py-1.5 rounded-xl bg-[#c89d42] hover:bg-[#dfb858] text-neutral-950 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              )}
            </div>

            {/* Document Body */}
            <div className="mt-4 p-6 bg-black/30 rounded-2xl border border-white/10 text-slate-200 text-xs leading-relaxed font-mono whitespace-pre-wrap min-h-[420px] shadow-inner backdrop-blur-sm">
              {generatedDraft ? (
                generatedDraft
              ) : (
                <div className="h-full min-h-[380px] flex flex-col items-center justify-center text-center space-y-3 text-slate-400">
                  <PenTool className="w-10 h-10 text-[#c89d42]/40" />
                  <p className="font-semibold text-slate-300">No Draft Generated Yet</p>
                  <p className="text-[11px] max-w-sm text-slate-400">Fill in the party details on the left and click "Generate Legal Document" to build a statutory draft.</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-white/10">
            <span>Republic of Uganda Legal Format</span>
            <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck className="w-3.5 h-3.5" /> Advocates Act Compliant Notice</span>
          </div>
        </div>

      </div>

    </div>
  );
};
