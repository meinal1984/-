import React from 'react';
import { ScheduleItem } from '../types';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Copy, Clock, MapPin, User, FileText, Calendar } from 'lucide-react';

interface Props {
  items: ScheduleItem[];
  onAddItem: () => void;
  onEditItem: (item: ScheduleItem) => void;
  onDeleteItem: (id: string) => void;
  onDuplicateItem: (item: ScheduleItem) => void;
  onMoveItem: (index: number, direction: 'up' | 'down') => void;
  onToggleComplete?: (id: string) => void;
}

export const ScheduleTable: React.FC<Props> = ({
  items,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onDuplicateItem,
  onMoveItem,
}) => {
  return (
    <div className="bg-white border border-slate-300 rounded-xl shadow-xs overflow-hidden">
      {/* Table Action Bar */}
      <div className="no-print p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900 text-sm">
            কর্মসূচি তালিকা ({items.length} টি)
          </span>
        </div>

        <button
          onClick={onAddItem}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs sm:text-sm rounded-lg shadow-xs transition-all active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন কর্মসূচি যোগ করুন</span>
        </button>
      </div>

      {/* Main Grid Table - Matching Uploaded Image */}
      {items.length === 0 ? (
        <div className="py-12 px-4 text-center">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-slate-700 font-medium text-base">কোন কর্মসূচি অন্তর্ভুক্ত করা হয়নি</h3>
          <p className="text-slate-500 text-xs mt-1 mb-4">
            তালিকা খালি রয়েছে। নতুন কর্মসূচি যোগ করার জন্য নিচের বাটনে ক্লিক করুন।
          </p>
          <button
            onClick={onAddItem}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 text-white text-xs font-medium rounded-lg shadow-xs hover:bg-emerald-800"
          >
            <Plus className="w-4 h-4" />
            <span>প্রথম কর্মসূচি যোগ করুন</span>
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto p-2 sm:p-4 bg-slate-100/50">
          <table className="w-full text-center border-collapse border border-slate-800 bg-white shadow-2xs font-serif-bn">
            <thead>
              <tr className="bg-sky-100 text-slate-900 border-b border-slate-800 text-sm sm:text-base font-bold">
                <th className="py-2.5 px-2 w-32 border-r border-slate-800">
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-700 no-print" />
                    <span>তারিখ ও বার</span>
                  </div>
                </th>
                <th className="py-2.5 px-2 w-28 border-r border-slate-800">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-700 no-print" />
                    <span>সময়</span>
                  </div>
                </th>
                <th className="py-2.5 px-2 w-40 sm:w-48 border-r border-slate-800">
                  <div className="flex items-center justify-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-700 no-print" />
                    <span>সভার স্থান</span>
                  </div>
                </th>
                <th className="py-2.5 px-3 min-w-[220px] border-r border-slate-800">
                  <div className="flex items-center justify-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-700 no-print" />
                    <span>সভার বিষয়</span>
                  </div>
                </th>
                <th className="py-2.5 px-2 w-32 sm:w-36 border-r border-slate-800">
                  <div className="flex items-center justify-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-700 no-print" />
                    <span>সভাপতি</span>
                  </div>
                </th>
                <th className="py-2.5 px-2 w-28 sm:w-32 border-r border-slate-800">মন্তব্য</th>
                <th className="py-2.5 px-2 w-24 text-center no-print border-l border-slate-800">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs sm:text-sm text-slate-950 font-medium">
              {items.map((item, index) => (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    item.completed ? 'bg-slate-100/70 text-slate-500' : ''
                  }`}
                >
                  {/* 1. Date & Day (তারিখ ও বার) */}
                  <td className="py-3 px-2 text-center border-r border-slate-800 align-middle leading-tight font-bold text-black">
                    {item.dateAndDay || item.dateTime || '—'}
                  </td>

                  {/* 2. Time (সময়) */}
                  <td className="py-3 px-2 text-center border-r border-slate-800 align-middle font-medium text-slate-900 leading-tight">
                    {item.timeOnly || '—'}
                  </td>

                  {/* 3. Venue (সভার স্থান) */}
                  <td className="py-3 px-2 text-center border-r border-slate-800 align-middle text-slate-900 leading-snug">
                    {item.venue || '—'}
                  </td>

                  {/* 4. Subject / Description (সভার বিষয় - Bold in original image) */}
                  <td className="py-3 px-3 text-center border-r border-slate-800 align-middle font-bold text-slate-950 text-sm sm:text-base leading-snug">
                    <div className={item.completed ? 'line-through text-slate-400 font-normal' : ''}>
                      {item.description}
                    </div>
                  </td>

                  {/* 5. Chairperson (সভাপতি) */}
                  <td className="py-3 px-2 text-center border-r border-slate-800 align-middle text-slate-900">
                    {item.chairperson || '—'}
                  </td>

                  {/* 6. Remarks (মন্তব্য) */}
                  <td className="py-3 px-2 text-center border-r border-slate-800 align-middle text-slate-800 text-xs">
                    {item.remarks || '—'}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-2 px-2 text-center align-middle no-print border-l border-slate-800 bg-slate-50/50">
                    <div className="flex items-center justify-center gap-0.5">
                      {/* Move Up/Down */}
                      <button
                        onClick={() => onMoveItem(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-20 transition-colors"
                        title="উপরে নিয়ে যান"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onMoveItem(index, 'down')}
                        disabled={index === items.length - 1}
                        className="p-1 text-slate-500 hover:text-slate-900 disabled:opacity-20 transition-colors"
                        title="নিচে নিয়ে যান"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => onEditItem(item)}
                        className="p-1 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                        title="সম্পাদন করুন"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Duplicate */}
                      <button
                        onClick={() => onDuplicateItem(item)}
                        className="p-1 text-emerald-600 hover:bg-emerald-100 rounded-md transition-colors"
                        title="কপি করুন"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1 text-rose-600 hover:bg-rose-100 rounded-md transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
