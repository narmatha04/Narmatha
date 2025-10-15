import FlippableTimelineCard from "./FlippableTimelineCard";

const getMarkerClass = (entry) => entry.type === "education" ? "bg-emerald-500" : "bg-indigo-500";

const VerticalRoadmap = ({ entries }) => (
  <section id="journey" className="relative py-24 bg-transparent">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center text-white mb-12">Journey & Roadmap</h2>
      <div className="relative flex flex-col items-center">
        {/* Central vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-indigo-400/60 z-0" style={{ transform: 'translateX(-50%)' }}></div>
        {/* Timeline Cards */}
        <div className="w-full flex flex-col gap-16 z-10">
          {entries.map((entry, idx) => (
            <div key={idx} className="relative flex w-full items-center">
              {idx % 2 === 0 ? (
                <>
                  <div className="w-1/2 flex justify-end pr-8">
                    <FlippableTimelineCard entry={entry} side="left" />
                  </div>
                  {/* Marker */}
                  <div className="flex flex-col items-center z-20">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xl text-white border-4 border-white shadow-lg ${getMarkerClass(entry)}`}>
                      {entry.icon}
                    </div>
                  </div>
                  <div className="w-1/2" />
                </>
              ) : (
                <>
                  <div className="w-1/2" />
                  <div className="flex flex-col items-center z-20">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xl text-white border-4 border-white shadow-lg ${getMarkerClass(entry)}`}>
                      {entry.icon}
                    </div>
                  </div>
                  <div className="w-1/2 flex justify-start pl-8">
                    <FlippableTimelineCard entry={entry} side="right" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default VerticalRoadmap;
