import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle.jsx';
import { riseIn, staggerContainer } from '../utils/motion.js';

const trainingSlots = [
  { batch: 'Foundation Batch (12-14 yrs)', morning: '6:00 AM - 7:30 AM', evening: '4:00 PM - 5:30 PM' },
  { batch: 'Performance Batch (15-17 yrs)', morning: '6:00 AM - 8:00 AM', evening: '4:00 PM - 6:00 PM' },
  { batch: 'Elite Batch (18+ yrs)', morning: '5:30 AM - 8:00 AM', evening: '4:30 PM - 7:00 PM' },
];

const weeklySchedule = [
  { day: 'Monday', focus: 'Batting Technique & Drills', type: 'training' },
  { day: 'Tuesday', focus: 'Bowling (Pace & Spin)', type: 'training' },
  { day: 'Wednesday', focus: 'Fielding & Fitness', type: 'training' },
  { day: 'Thursday', focus: 'Match Simulation', type: 'match' },
  { day: 'Friday', focus: 'Video Analysis & Skills', type: 'training' },
  { day: 'Saturday', focus: 'Practice Matches', type: 'match' },
  { day: 'Sunday', focus: 'Rest / Optional Fitness', type: 'rest' },
];

const governmentHolidays = [
  { date: '2026-01-14', name: 'Makar Sankranti' },
  { date: '2026-01-26', name: 'Republic Day' },
  { date: '2026-03-10', name: 'Maha Shivaratri' },
  { date: '2026-03-17', name: 'Holi' },
  { date: '2026-03-31', name: 'Id-ul-Fitr (Eid)' },
  { date: '2026-04-02', name: 'Ugadi' },
  { date: '2026-04-06', name: 'Ram Navami' },
  { date: '2026-04-14', name: 'Dr. Ambedkar Jayanti' },
  { date: '2026-04-18', name: 'Good Friday' },
  { date: '2026-05-01', name: 'May Day' },
  { date: '2026-05-12', name: 'Buddha Purnima' },
  { date: '2026-06-07', name: 'Bakrid (Eid al-Adha)' },
  { date: '2026-07-07', name: 'Muharram' },
  { date: '2026-08-15', name: 'Independence Day' },
  { date: '2026-08-17', name: 'Varamahalakshmi' },
  { date: '2026-09-05', name: "Milad-un-Nabi (Prophet's Birthday)" },
  { date: '2026-09-25', name: 'Mahalaya Amavasye' },
  { date: '2026-10-02', name: 'Gandhi Jayanti' },
  { date: '2026-10-02', name: 'Maha Navami' },
  { date: '2026-10-03', name: 'Vijayadashami (Dasara)' },
  { date: '2026-10-21', name: 'Maharshi Valmiki Jayanti' },
  { date: '2026-10-22', name: 'Naraka Chaturdashi' },
  { date: '2026-10-23', name: 'Deepavali' },
  { date: '2026-11-01', name: 'Kannada Rajyotsava' },
  { date: '2026-12-25', name: 'Christmas' },
];

const academyBreaks = [
  { date: '2026-04-13', name: 'Academy Annual Day' },
  { date: '2026-06-01', name: 'Summer Camp Starts' },
  { date: '2026-06-15', name: 'Summer Camp Ends' },
  { date: '2026-12-20', name: 'Winter Break Starts' },
  { date: '2026-12-31', name: 'Winter Break Ends' },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarPage = () => {
  const now = new Date();
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(now.getFullYear() === 2026 ? now.getMonth() : 0);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
      return;
    }
    setMonth((prev) => prev - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
      return;
    }
    setMonth((prev) => prev + 1);
  };

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i += 1) cells.push(null);
    for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
    return cells;
  }, [year, month]);

  const holidayMap = useMemo(() => {
    const map = {};
    for (const holiday of governmentHolidays) {
      const date = new Date(holiday.date);
      if (date.getFullYear() === year && date.getMonth() === month) {
        const day = date.getDate();
        if (!map[day]) map[day] = [];
        map[day].push({ ...holiday, type: 'govt' });
      }
    }
    for (const holiday of academyBreaks) {
      const date = new Date(holiday.date);
      if (date.getFullYear() === year && date.getMonth() === month) {
        const day = date.getDate();
        if (!map[day]) map[day] = [];
        map[day].push({ ...holiday, type: 'academy' });
      }
    }
    return map;
  }, [year, month]);

  const monthHolidays = useMemo(() => {
    const list = [];
    for (const holiday of governmentHolidays) {
      const date = new Date(holiday.date);
      if (date.getFullYear() === year && date.getMonth() === month) {
        list.push({ ...holiday, type: 'govt' });
      }
    }
    for (const holiday of academyBreaks) {
      const date = new Date(holiday.date);
      if (date.getFullYear() === year && date.getMonth() === month) {
        list.push({ ...holiday, type: 'academy' });
      }
    }
    return list.sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [year, month]);

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
  };

  const isSunday = (day) => {
    if (!day) return false;
    return new Date(year, month, day).getDay() === 0;
  };

  return (
    <motion.section variants={riseIn} initial="hidden" animate="show" className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8">
      <Helmet>
        <title>Cricket Calendar | EACE Academy</title>
        <meta
          name="description"
          content="EACE cricket training calendar with session timings, government holidays, and academy schedule for students aged 12 and above."
        />
      </Helmet>

      <SectionTitle
        eyebrow="Academy Calendar"
        title="Cricket Training Schedule"
        subtitle="Plan your training around holidays. All government holidays and academy breaks are marked."
      />

      <div className="mb-14">
        <h3 className="mb-5 text-center text-lg font-semibold text-[#0B4192]">Daily Training Timings (Age 12+)</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] rounded-xl border border-[#B8C9E8] bg-white text-sm shadow-sm">
            <thead>
              <tr className="bg-[#0B4192] text-white">
                <th className="rounded-tl-xl px-4 py-3 text-left font-semibold">Batch</th>
                <th className="px-4 py-3 text-left font-semibold">Morning Session</th>
                <th className="rounded-tr-xl px-4 py-3 text-left font-semibold">Evening Session</th>
              </tr>
            </thead>
            <tbody>
              {trainingSlots.map((slot, idx) => (
                <tr key={slot.batch} className={idx % 2 === 0 ? 'bg-[#F0F4FA]' : 'bg-white'}>
                  <td className="px-4 py-3 font-semibold text-[#0B4192]">{slot.batch}</td>
                  <td className="px-4 py-3 text-[#2C3E6B]">{slot.morning}</td>
                  <td className="px-4 py-3 text-[#2C3E6B]">{slot.evening}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-14">
        <h3 className="mb-5 text-center text-lg font-semibold text-[#0B4192]">Weekly Training Focus</h3>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {weeklySchedule.map((item) => (
            <motion.div
              key={item.day}
              variants={riseIn}
              className={`rounded-xl border p-4 text-center shadow-sm ${
                item.type === 'rest'
                  ? 'border-[#D0D8E8] bg-[#FAFAFA]'
                  : item.type === 'match'
                    ? 'border-[#790000]/20 bg-[#FDF5F5]'
                    : 'border-[#B8C9E8] bg-white'
              }`}
            >
              <p className={`text-xs font-bold uppercase tracking-widest ${
                item.type === 'rest' ? 'text-[#999]' : item.type === 'match' ? 'text-[#790000]' : 'text-[#0B4192]'
              }`}>{item.day}</p>
              <p className="mt-2 text-[11px] text-[#3A5A8C]">{item.focus}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-2xl border border-[#B8C9E8] bg-white shadow-sm">
          <div className="flex items-center justify-between bg-[#0B4192] px-5 py-4 text-white">
            <button onClick={prevMonth} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20" aria-label="Previous month">
              <FaChevronLeft />
            </button>
            <h3 className="text-lg font-bold">{MONTHS[month]} {year}</h3>
            <button onClick={nextMonth} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/20" aria-label="Next month">
              <FaChevronRight />
            </button>
          </div>

          <div className="grid grid-cols-7 border-b border-[#D0D8E8] bg-[#F0F4FA]">
            {DAYS.map((dayLabel) => (
              <div key={dayLabel} className={`py-2.5 text-center text-[11px] font-bold uppercase tracking-widest ${dayLabel === 'Sun' ? 'text-[#790000]' : 'text-[#3A5A8C]'}`}>
                {dayLabel}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) => {
              const holidays = day ? (holidayMap[day] || []) : [];
              const today = isToday(day);
              const sunday = isSunday(day);

              return (
                <div
                  key={`${idx}-${day || 'empty'}`}
                  className={`relative min-h-[56px] border-b border-r border-[#E8EDF5] p-1.5 text-center md:min-h-[72px] md:p-2 ${
                    !day ? 'bg-[#FAFBFD]' : today ? 'bg-[#E8EEF8]' : ''
                  }`}
                >
                  {day ? (
                    <>
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                          today
                            ? 'bg-[#0B4192] text-white'
                            : sunday
                              ? 'text-[#790000]'
                              : holidays.length > 0
                                ? 'font-bold text-[#790000]'
                                : 'text-[#2C3E6B]'
                        }`}
                      >
                        {day}
                      </span>
                      {holidays.length > 0 && (
                        <div className="mt-0.5">
                          {holidays.map((holiday, hIdx) => (
                            <div
                              key={`${holiday.name}-${hIdx}`}
                              className={`mt-0.5 truncate rounded px-0.5 text-[8px] font-medium leading-tight md:text-[9px] ${
                                holiday.type === 'govt' ? 'bg-[#790000]/10 text-[#790000]' : 'bg-[#0B4192]/10 text-[#0B4192]'
                              }`}
                              title={holiday.name}
                            >
                              {holiday.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#0B4192]" /> Today
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-[#790000]/15" /> Govt Holiday
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-[#0B4192]/15" /> Academy Event
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full border border-[#790000] bg-white" /> Sunday
          </span>
        </div>

        {monthHolidays.length > 0 && (
          <div className="mt-6 rounded-xl border border-[#B8C9E8] bg-white p-5 shadow-sm">
            <h4 className="mb-3 text-sm font-semibold text-[#0B4192]">Holidays & Events in {MONTHS[month]}</h4>
            <div className="space-y-2">
              {monthHolidays.map((holiday) => {
                const date = new Date(holiday.date);
                return (
                  <div key={`${holiday.date}-${holiday.name}`} className="flex items-center gap-3 text-sm">
                    <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      holiday.type === 'govt' ? 'bg-[#790000]/10 text-[#790000]' : 'bg-[#0B4192]/10 text-[#0B4192]'
                    }`}>
                      {date.getDate()}
                    </span>
                    <div>
                      <p className="font-medium text-[#1a1a2e]">{holiday.name}</p>
                      <p className="text-[10px] text-[#3A5A8C]">{holiday.type === 'govt' ? 'Government Holiday' : 'Academy Event'}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 max-w-2xl rounded-xl border border-[#B8C9E8] bg-[#F0F4FA] p-5 text-center"
      >
        <p className="text-sm font-semibold text-[#0B4192]">Training runs 6 days a week (Monday to Saturday)</p>
        <p className="mt-2 text-xs text-[#3A5A8C]">
          Sessions are conducted for students aged 12 and above. Indoor net sessions are available during monsoon.
          Government and academy holidays are observed.
        </p>
      </motion.div>
    </motion.section>
  );
};

export default CalendarPage;
