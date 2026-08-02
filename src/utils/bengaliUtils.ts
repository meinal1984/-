// Bengali numeral conversion maps
const englishToBengaliDigits: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯'
};

const bengaliToEnglishDigits: { [key: string]: string } = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9'
};

export const BENGALI_DAYS = [
  'রবিবার',
  'সোমবার',
  'মঙ্গলবার',
  'বুধবার',
  'বৃহস্পতিবার',
  'শুক্রবার',
  'শনিবার',
];

const bengaliMonths = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

/**
 * Converts English digits in a string to Bengali digits
 */
export function toBengaliNumerals(str: string | number): string {
  if (str === null || str === undefined) return '';
  return String(str).replace(/[0-9]/g, (digit) => englishToBengaliDigits[digit] || digit);
}

/**
 * Converts Bengali digits in a string to English digits
 */
export function toEnglishNumerals(str: string): string {
  if (!str) return '';
  return str.replace(/[০-৯]/g, (digit) => bengaliToEnglishDigits[digit] || digit);
}

/**
 * Returns Bengali day of week from Date object or ISO string
 */
export function getBengaliDayOfWeek(dateInput: Date | string): string {
  if (!dateInput) return '';
  const dateObj = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(dateObj.getTime())) return '';
  const dayIndex = dateObj.getDay();
  return BENGALI_DAYS[dayIndex] || '';
}

/**
 * Formats YYYY-MM-DD into "DD.MM.YYYY বার" format (e.g. "১৮.০৬.২০২৫ বুধবার")
 */
export function formatBengaliDateAndDay(isoDateStr: string): string {
  if (!isoDateStr) return '';
  try {
    const parts = isoDateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];

      const bnDay = toBengaliNumerals(day.padStart(2, '0'));
      const bnMonth = toBengaliNumerals(month.padStart(2, '0'));
      const bnYear = toBengaliNumerals(year);

      const dateObj = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00`);
      const dayOfWeek = getBengaliDayOfWeek(dateObj);

      return `${bnDay}.${bnMonth}.${bnYear}${dayOfWeek ? ' ' + dayOfWeek : ''}`;
    }
  } catch (err) {
    console.error('Error formatting date and day:', err);
  }
  return isoDateStr;
}

/**
 * Converts 24-hour time HH:mm (e.g. "16:30", "10:00") into Bengali time representation (e.g. "বিকাল ৪:৩০ টা")
 */
export function formatBengaliTime(time24Str: string): string {
  if (!time24Str) return '';
  try {
    const [hStr, mStr] = time24Str.split(':');
    const hour = parseInt(hStr, 10);
    const minute = parseInt(mStr, 10);

    if (isNaN(hour) || isNaN(minute)) return time24Str;

    let period = '';
    if (hour >= 4 && hour < 6) period = 'ভোর';
    else if (hour >= 6 && hour < 12) period = 'সকাল';
    else if (hour >= 12 && hour < 15) period = 'দুপুর';
    else if (hour >= 15 && hour < 18) period = 'বিকাল';
    else if (hour >= 18 && hour < 20) period = 'সন্ধ্যা';
    else period = 'রাত';

    let hr12 = hour % 12;
    if (hr12 === 0) hr12 = 12;

    const bnHour = toBengaliNumerals(hr12);
    const bnMinute = toBengaliNumerals(String(minute).padStart(2, '0'));

    return `${period} ${bnHour}:${bnMinute} টা`;
  } catch (err) {
    console.error('Error formatting Bengali time:', err);
  }
  return time24Str;
}

/**
 * Formats YYYY-MM-DD into a full Bengali date string (e.g. "১ আগস্ট ২০২৬")
 */
export function formatBengaliDate(isoDateStr: string): string {
  if (!isoDateStr) return '';
  try {
    const parts = isoDateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parts[2];
      
      const bnDay = toBengaliNumerals(parseInt(day, 10));
      const bnMonth = bengaliMonths[monthIdx] || '';
      const bnYear = toBengaliNumerals(year);
      
      return `${bnDay} ${bnMonth} ${bnYear}`;
    }
  } catch (err) {
    console.error('Error formatting Bengali date:', err);
  }
  return isoDateStr;
}

/**
 * Returns current month and year in Bengali format (e.g. "আগস্ট ২০২৬ খ্রি.")
 */
export function getCurrentBengaliMonthYear(dateInput?: Date | string): string {
  try {
    const d = dateInput ? (typeof dateInput === 'string' ? new Date(dateInput) : dateInput) : new Date();
    const validDate = isNaN(d.getTime()) ? new Date() : d;
    const monthIdx = validDate.getMonth(); // 0-11
    const yearStr = toBengaliNumerals(validDate.getFullYear());
    const bnMonth = bengaliMonths[monthIdx] || '';
    return `${bnMonth} ${yearStr} খ্রি.`;
  } catch (e) {
    return 'আগস্ট ২০২৬ খ্রি.';
  }
}

/**
 * Formats a schedule document into clean plain text formatted for WhatsApp, Email, or SMS sharing.
 */
export function generateShareableText(doc: any): string {
  if (!doc) return '';

  const { letterhead, items } = doc;
  let text = `🏛️ *${letterhead?.govtTitle || 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার'}*\n`;
  text += `📍 *${letterhead?.officeName || 'কার্যালয়'}*\n`;
  
  if (letterhead?.showRefSection !== false) {
    if (letterhead?.memoNo) text += `📜 স্মারক নং: ${letterhead.memoNo}\n`;
    if (letterhead?.issueDate) text += `📅 তারিখ: ${letterhead.issueDate}\n`;
    text += `\n📋 *বিষয়: ${letterhead?.subject || 'দৈনন্দিন কর্মসূচি'}*\n`;
  }
  text += `───────────────────────\n\n`;

  if (items && items.length > 0) {
    items.forEach((item: any, idx: number) => {
      const sl = item.serialNo || toBengaliNumerals(idx + 1);
      text += `*${sl}. ${item.description || 'কর্মসূচি'}*\n`;
      if (item.dateTime) text += `   ⏰ সময়: ${item.dateTime}\n`;
      if (item.venue) text += `   🏛️ স্থান: ${item.venue}\n`;
      if (item.chairperson) text += `   👤 সভাপতি: ${item.chairperson}\n`;
      if (item.remarks) text += `   📝 মন্তব্য: ${item.remarks}\n`;
      text += `\n`;
    });
  } else {
    text += `(কোন কর্মসূচি অন্তর্ভুক্ত করা হয়নি)\n\n`;
  }

  if (letterhead?.signatoryName) {
    text += `───────────────────────\n`;
    text += `✍️ *${letterhead.signatoryName}*\n`;
    if (letterhead.signatoryDesignation) text += `${letterhead.signatoryDesignation}\n`;
    if (letterhead.signatoryPhone) text += `📞 ${letterhead.signatoryPhone}\n`;
  }

  return text;
}
