import React from 'react';
import { ScheduleDocument } from '../types';
import { GovernmentEmblem } from './GovernmentEmblem';
import { Calendar, Plus, Printer, Share2, Edit3, Bell, FileSpreadsheet } from 'lucide-react';
import { formatBengaliDate } from '../utils/bengaliUtils';
import { AutoSaveIndicator } from './AutoSaveIndicator';

interface Props {
  documents: ScheduleDocument[];
  activeDocId: string;
  onSelectDocument: (id: string) => void;
  onNewDocument: () => void;
  onOpenLetterheadEditor: () => void;
  onOpenPrintModal: () => void;
  onOpenShareModal: () => void;
  onOpenNotificationModal: () => void;
  onOpenGoogleFormsModal: () => void;
  isSaving?: boolean;
  saveStatus?: 'saved' | 'syncing' | 'error';
  lastSavedTime?: string | null;
}

export const HeaderNav: React.FC<Props> = ({
  documents,
  activeDocId,
  onSelectDocument,
  onNewDocument,
  onOpenLetterheadEditor,
  onOpenPrintModal,
  onOpenShareModal,
  onOpenNotificationModal,
  onOpenGoogleFormsModal,
  isSaving = false,
  saveStatus,
  lastSavedTime,
}) => {
  const currentStatus = saveStatus || (isSaving ? 'syncing' : 'saved');

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & App Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <GovernmentEmblem size={38} variant="bd_crest" />
            <div>
              <h1 className="font-serif-bn font-bold text-lg sm:text-xl text-white tracking-wide flex items-center gap-2">
                <span>দৈনন্দিন কর্মসূচি</span>
                <span className="text-[10px] bg-emerald-800 text-emerald-200 font-sans px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border border-emerald-700">
                  Govt Schedule DB
                </span>
              </h1>
              <p className="text-xs text-slate-400 font-sans">
                দৈনন্দিন কর্মসূচি ও সভার সময়সূচি ব্যবস্থাপনা সিস্টেম
              </p>
            </div>
          </div>

          {/* Mobile New Doc Trigger */}
          <button
            onClick={onNewDocument}
            className="md:hidden p-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg"
            title="নতুন সূচি তৈরি করুন"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Saved Schedules Selector & Document Switcher */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300">
            <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
            <select
              value={activeDocId}
              onChange={(e) => onSelectDocument(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-hidden cursor-pointer max-w-[200px] truncate"
            >
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id} className="bg-slate-900 text-white">
                  {doc.title || formatBengaliDate(doc.date) || 'অনামী সূচি'}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onNewDocument}
            className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>নতুন সূচি</span>
          </button>

          <button
            onClick={onOpenGoogleFormsModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-700 text-xs font-semibold rounded-lg shadow-2xs transition-all cursor-pointer"
            title="গুগল ফর্ম সংযোগ ও উপস্থিতি ব্যবস্থাপনা"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-purple-300" />
            <span>গুগল ফর্ম</span>
          </button>

          <button
            onClick={onOpenLetterheadEditor}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium rounded-lg transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
            <span>লেটারহেড</span>
          </button>

          <button
            onClick={onOpenPrintModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>পিডিএফ প্রিন্ট</span>
          </button>

          <button
            onClick={onOpenNotificationModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 text-xs font-semibold rounded-lg shadow-2xs transition-all relative group"
            title="ইমেইল ও হোয়াটসঅ্যাপ অটো নোটিফিকেশন"
          >
            <Bell className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
            <span>অটো নোটিফিকেশন</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 ring-2 ring-slate-900"></span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium rounded-lg transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>শেয়ার</span>
          </button>

          {/* Database Auto-Save Status Badge */}
          <div className="pl-2 border-l border-slate-800 flex items-center">
            <AutoSaveIndicator status={currentStatus} lastSavedTime={lastSavedTime} />
          </div>
        </div>
      </div>
    </header>
  );
};
