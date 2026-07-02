import React from 'react';

const TrustedBy = () => {
  const partners = [
    { name: 'Oakridge Academy', type: 'School Member' },
    { name: 'Hope Wellness NGO', type: 'Clinical NGO' },
    { name: 'National Mental Health Trust', type: 'Research Inst.' },
    { name: 'Beacon Healthcare', type: 'Health Partner' },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-100/60">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">
          Trusted by leading educators and health organizations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-slate-100 border border-slate-200/50 flex items-center justify-center text-[9px] font-bold text-slate-700">
                  {partner.name[0]}
                </div>
                <span className="font-heading font-extrabold text-sm text-slate-700 tracking-tight">
                  {partner.name}
                </span>
              </div>
              <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase">
                {partner.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
