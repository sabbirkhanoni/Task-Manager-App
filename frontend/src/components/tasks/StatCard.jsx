import React from "react";

const StatCard = ({ title, icon: Icon, gradient, iconColor }) => {
  return (
    <div className={`flex-1 min-w-[140px] rounded-2xl p-5 relative overflow-hidden shadow-lg ${gradient}`}>
      {/* Icon Badge */}
      <div className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
        <Icon size={18} className={iconColor} />
      </div>

      <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
        {title}
      </p>
      <h2 className="text-3xl font-bold text-white mt-1.5 mb-1">{10}</h2>
    </div>
  );
};

export default StatCard;