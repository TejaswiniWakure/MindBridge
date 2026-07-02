import React, { useRef, useEffect } from 'react';

const OtpInput = ({ value = '', onChange, length = 6, error }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return;

    const newValue = value.split('');
    newValue[index] = val.substring(val.length - 1);
    const updatedValueStr = newValue.join('');
    
    onChange(updatedValueStr);

    // Auto-focus next input
    if (val && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newValue = value.split('');
      
      if (!newValue[index] && index > 0) {
        // Focus previous and clear
        inputRefs.current[index - 1].focus();
        newValue[index - 1] = '';
        onChange(newValue.join(''));
      } else {
        newValue[index] = '';
        onChange(newValue.join(''));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (pasteData.length !== length || isNaN(Number(pasteData))) return;

    onChange(pasteData);
    inputRefs.current[length - 1].focus();
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex gap-2 sm:gap-3.5 justify-center w-full" onPaste={handlePaste}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ''}
            ref={(el) => (inputRefs.current[i] = el)}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`w-11 h-12 sm:w-14 sm:h-14 text-center font-heading font-bold text-xl sm:text-2xl bg-white dark:bg-slate-800 border rounded-xl focus:outline-none transition-all duration-200
              ${error
                ? 'border-red-500 text-red-900 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/50'
                : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900/30'
              }
            `}
          />
        ))}
      </div>
      {error && (
        <span className="text-xs text-red-550 font-semibold">{error}</span>
      )}
    </div>
  );
};

export default OtpInput;
