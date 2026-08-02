import React, { useState, useEffect } from 'react';
import { ScheduleItem } from '../types';
import { X, Save, Clock, MapPin, User, FileText, Calendar, Sparkles, Check, ChevronRight } from 'lucide-react';
import {
  toBengaliNumerals,
  formatBengaliDateAndDay,
  formatBengaliTime,
  getBengaliDayOfWeek,
} from '../utils/bengaliUtils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ScheduleItem) => void;
  itemToEdit: ScheduleItem | null;
  suggestedSerialNo: number;
}

const TIME_PRESETS = [
  { time24: '10:00', label: 'সকাল ১০:০০ টা' },
  { time24: '11:00', label: 'সকাল ১১:০০ টা' },
  { time24: '12:00', label: 'দুপুর ১২:০০ টা' },
  { time24: '14:30', label: 'দুপুর ২:৩০ টা' },
  { time24: '16:30', label: 'বিকাল ৪:৩০ টা' },
  { time24: '18:00', label: 'সন্ধ্যা ৬:০০ টা' },
];

export const ScheduleItemModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  itemToEdit,
  suggestedSerialNo,
}) => {
  // Calendar and Time Picker Raw values
  const [rawDate, setRawDate] = useState<string>('');
  const [rawTime, setRawTime] = useState<string>('16:30');

  // Formatted Output text values
  const [dateAndDay, setDateAndDay] = useState('');
  const [timeOnly, setTimeOnly] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [chairperson, setChairperson] = useState('');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setDateAndDay(itemToEdit.dateAndDay || itemToEdit.dateTime || '');
      setTimeOnly(itemToEdit.timeOnly || '');
      setDescription(itemToEdit.description || '');
      setVenue(itemToEdit.venue || '');
      setChairperson(itemToEdit.chairperson || '');
      setRemarks(itemToEdit.remarks || '');
    } else {
      const todayIso = new Date().toISOString().split('T')[0];
      setRawDate(todayIso);
      setDateAndDay(formatBengaliDateAndDay(todayIso));
      setRawTime('16:30');
      setTimeOnly('বিকাল ৪:৩০ টা');
      setDescription('');
      setVenue('সভাকক্ষ, তথ্য ও সম্প্রচার মন্ত্রণালয়');
      setChairperson('সচিব');
      setRemarks('');
    }
  }, [itemToEdit, suggestedSerialNo, isOpen]);

  if (!isOpen) return null;

  // Handle Date Selection from Calendar
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedIso = e.target.value;
    setRawDate(selectedIso);
    if (selectedIso) {
      const formatted = formatBengaliDateAndDay(selectedIso);
      setDateAndDay(formatted);
    }
  };

  // Quick Today & Tomorrow Selectors
  const handleSelectQuickDate = (type: 'today' | 'tomorrow') => {
    const d = new Date();
    if (type === 'tomorrow') {
      d.setDate(d.getDate() + 1);
    }
    const iso = d.toISOString().split('T')[0];
    setRawDate(iso);
    setDateAndDay(formatBengaliDateAndDay(iso));
  };

  // Handle Time Selection from Time Picker
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time24 = e.target.value;
    setRawTime(time24);
    if (time24) {
      const formatted = formatBengaliTime(time24);
      setTimeOnly(formatted);
    }
  };

  // Handle Preset Time Selection
  const handleSelectPresetTime = (preset: { time24: string; label: string }) => {
    setRawTime(preset.time24);
    setTimeOnly(preset.label);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('অনুগ্রহ করে সভার বিষয় উল্লেখ করুন।');
      return;
    }

    const newItem: ScheduleItem = {
      id: itemToEdit ? itemToEdit.id : 'item-' + Date.now(),
      serialNo: itemToEdit?.serialNo || toBengaliNumerals(suggestedSerialNo),
      dateAndDay: dateAndDay.trim(),
      timeOnly: timeOnly.trim(),
      dateTime: `${dateAndDay.trim()} ${timeOnly.trim()}`.trim(),
      description: description.trim(),
      venue: venue.trim(),
      chairperson: chairperson.trim(),
      remarks: remarks.trim(),
      completed: itemToEdit ? itemToEdit.completed : false,
    };

    onSave(newItem);
    onClose();
  };

  // Calculate detected Bengali day of week for badge preview
  const detectedDay = rawDate ? getBengaliDayOfWeek(rawDate) : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity modal-backdrop font-serif-bn">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span>{itemToEdit ? 'কর্মসূচি সংশোধন করুন' : 'নতুন কর্মসূচি যোগ করুন'}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          
          {/* SECTION 1: Date Selection with Calendar & Auto Day */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between font-sans">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>তারিখ নির্বাচন ও স্বয়ংক্রিয় বার নির্ধারণ (Date & Auto Day)</span>
              </label>

              {detectedDay && (
                <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1 font-serif-bn">
                  <Sparkles className="w-3 h-3 text-emerald-700" />
                  <span>বার: {detectedDay}</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  ক্যালেন্ডার হতে তারিখ সিলেক্ট করুন:
                </label>
                <input
                  type="date"
                  value={rawDate}
                  onChange={handleDateChange}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-medium focus:ring-2 focus:ring-emerald-600 cursor-pointer shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  চূড়ান্ত তারিখ ও বার (বাংলা টেক্সট):
                </label>
                <input
                  type="text"
                  value={dateAndDay}
                  onChange={(e) => setDateAndDay(e.target.value)}
                  placeholder="যেমন: ১৮.০৬.২০২৫ বুধবার"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 font-serif-bn shadow-2xs"
                  required
                />
              </div>
            </div>

            {/* Quick Date Presets */}
            <div className="flex items-center gap-2 pt-1 font-sans">
              <span className="text-[11px] text-slate-500">দ্রুত নির্বাচন:</span>
              <button
                type="button"
                onClick={() => handleSelectQuickDate('today')}
                className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-300 rounded-md text-xs font-semibold transition-colors shadow-2xs"
              >
                আজ
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickDate('tomorrow')}
                className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-300 rounded-md text-xs font-semibold transition-colors shadow-2xs"
              >
                আগামীকাল
              </button>
            </div>
          </div>

          {/* SECTION 2: Time Selection with Time Picker & Presets */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between font-sans">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-700" />
                <span>সময় নির্বাচন (Time Picker & Presets)</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  ঘড়ি হতে সময় সিলেক্ট করুন:
                </label>
                <input
                  type="time"
                  value={rawTime}
                  onChange={handleTimeChange}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-medium focus:ring-2 focus:ring-emerald-600 cursor-pointer shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  চূড়ান্ত বাংলা সময় টেক্সট:
                </label>
                <input
                  type="text"
                  value={timeOnly}
                  onChange={(e) => setTimeOnly(e.target.value)}
                  placeholder="যেমন: বিকাল ৪:৩০ টা"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 font-serif-bn shadow-2xs"
                  required
                />
              </div>
            </div>

            {/* Quick Time Presets */}
            <div className="space-y-1 font-sans">
              <span className="text-[11px] text-slate-500 block">সময় প্রিসেট নির্বাচন করুন:</span>
              <div className="flex flex-wrap gap-1.5 font-serif-bn">
                {TIME_PRESETS.map((p) => (
                  <button
                    key={p.time24}
                    type="button"
                    onClick={() => handleSelectPresetTime(p)}
                    className={`px-2.5 py-1 border rounded-lg text-xs font-medium transition-all shadow-2xs ${
                      timeOnly === p.label
                        ? 'bg-emerald-700 text-white border-emerald-800 font-bold'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description / Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1 font-sans">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>সভার বিষয় / বিবরণ *</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="যেমন: প্রকল্প স্টিয়ারিং কমিটির সভা..."
              rows={3}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold font-serif-bn text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white leading-relaxed"
              required
            />
          </div>

          {/* Venue & Chairperson Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1 font-sans">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>সভার স্থান</span>
              </label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="যেমন: সভাকক্ষ, তথ্য ও সম্প্রচার মন্ত্রণালয়"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white font-serif-bn"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1 font-sans">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>সভাপতি</span>
              </label>
              <input
                type="text"
                value={chairperson}
                onChange={(e) => setChairperson(e.target.value)}
                placeholder="যেমন: সচিব"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white font-serif-bn"
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 font-sans">
              মন্তব্য (ঐচ্ছিক)
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="বিশেষ কোনো মন্তব্য বা অতিরিক্ত বিবরণ..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white font-serif-bn"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2 font-sans">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-100 transition-colors"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm rounded-lg shadow-xs transition-all"
            >
              <Save className="w-4 h-4" />
              <span>সংরক্ষণ করুন</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

