import React, { useState, useEffect } from 'react';

export const DOBSelector = ({ value, onChange, className }) => {
  const [year, month, day] = value && value.includes('-') && !value.includes('Y') ? value.split('-') : ['', '', ''];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) => currentYear - i);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({length: 31}, (_, i) => i + 1);

  const handleChange = (type, val) => {
    let y = type === 'year' ? val : year;
    let m = type === 'month' ? val : month;
    let d = type === 'day' ? val : day;
    
    // Only emit valid ISO string if all parts are present, otherwise emit empty string to trigger validation failure
    if (y && m && d) {
      onChange(`${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
    } else {
      onChange('');
    }
  };

  const selectClass = "border border-[#DCDCDC] bg-[#F6F6F4] rounded-lg px-3 py-3 focus:outline-none focus:border-[#202020] transition-colors text-[#181818] text-sm";

  return (
    <div className={`grid grid-cols-3 gap-3 ${className || ''}`}>
      <select value={month ? parseInt(month, 10) : ''} onChange={e => handleChange('month', e.target.value)} className={selectClass}>
        <option value="" disabled>Month</option>
        {months.map((m, i) => <option key={m} value={i+1}>{m}</option>)}
      </select>
      <select value={day ? parseInt(day, 10) : ''} onChange={e => handleChange('day', e.target.value)} className={selectClass}>
        <option value="" disabled>Day</option>
        {days.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <select value={year} onChange={e => handleChange('year', e.target.value)} className={selectClass}>
        <option value="" disabled>Year</option>
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );
};
