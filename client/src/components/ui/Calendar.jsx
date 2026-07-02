import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ className = '', onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Total days in the current month
  const totalDays = new Date(year, month + 1, 0).getDate();
  // Index of the first day of the week
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const days = [];
  // Render empty cells for days of previous month
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(<div key={`empty-${i}`} className="p-2 text-center text-slate-300 dark:text-slate-700" />);
  }

  // Render days of current month
  for (let day = 1; day <= totalDays; day++) {
    const isSelected = selectedDate &&
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year;

    const isToday = new Date().getDate() === day &&
      new Date().getMonth() === month &&
      new Date().getFullYear() === year;

    days.push(
      <button
        key={day}
        onClick={() => onDateSelect && onDateSelect(new Date(year, month, day))}
        className={`p-2 text-center text-xs sm:text-sm font-medium rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-750 transition-all duration-150 cursor-pointer
          ${isSelected ? 'bg-primary-600 text-white hover:bg-primary-700' : ''}
          ${isToday && !isSelected ? 'text-primary-600 border border-primary-100 dark:border-primary-900/40 bg-primary-50/20' : ''}
          ${!isSelected && !isToday ? 'text-slate-700 dark:text-slate-300' : ''}
        `}
      >
        {day}
      </button>
    );
  }

  return (
    <div className={`p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl w-full ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          {monthNames[month]} {year}
        </h4>
        <div className="flex items-center gap-1">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-750 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-750 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekdays Labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-slate-400 dark:text-slate-550 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  );
};

export default Calendar;
