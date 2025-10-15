import React, { useState } from "react";

const FlippableRoadmapCard = ({ entry }) => {
  const [flipped, setFlipped] = useState(false);
  const [vibe, setVibe] = useState(false);

  return (
    <div
      className={`relative w-full h-48 md:h-52 lg:h-48 rounded-2xl overflow-hidden transition-shadow duration-300 bg-gray-900/80 cursor-pointer group ${vibe ? "vibrate ring-4 ring-indigo-400 ring-opacity-40" : ""}`}
      tabIndex={0}
      onMouseEnter={() => setVibe(true)}
      onMouseLeave={() => setVibe(false)}
      onAnimationEnd={() => setVibe(false)}
      onClick={() => setFlipped(f => !f)}
      onKeyDown={e => e.key === "Enter" && setFlipped(f => !f)}
    >
      <div className={`absolute inset-0 w-full h-full duration-700 transition-transform preserve-3d ${flipped ? "rotate-y-180" : ""}`}>
        {/* FRONT */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 backface-hidden">
          <div className="flex items-center mb-3 space-x-2">
            <span className="text-3xl">{entry.icon}</span>
            <span className="text-indigo-400 text-xs md:text-sm">{entry.period}</span>
          </div>
          <div>
            <h3 className="text-white text-lg md:text-xl font-bold">{entry.title}</h3>
            <p className="text-indigo-200 text-sm">{entry.company}</p>
            <ul className="text-gray-200 text-xs md:text-sm mt-2 list-disc list-inside">
              {entry.front.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* BACK */}
        <div className="absolute inset-0 flex flex-col items-start justify-center bg-gray-800/95 rounded-2xl p-6 rotate-y-180 backface-hidden">
          <div className="text-gray-100 text-base font-medium mb-2">Key Highlights:</div>
          <ul className="text-gray-200 text-xs md:text-sm list-disc list-inside">
            {entry.back.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
          <span className="absolute bottom-3 right-4 text-xs text-sky-300 font-semibold">Click to flip back</span>
        </div>
      </div>
      <span className="hidden md:block pointer-events-none absolute top-2 right-4 text-xs text-indigo-300 opacity-70 animate-pulse group-hover:block">Click to flip</span>
    </div>
  );
};

export default FlippableRoadmapCard;
