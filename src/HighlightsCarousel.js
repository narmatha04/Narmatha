import React, { useState, useEffect, useCallback } from "react";

// Helper for badge colors by category
const getBadgeColor = (category) => {
  switch (category) {
    case "AI & Automation":        return "bg-purple-500";
    case "BI & Visualization":     return "bg-blue-500";
    case "Data Analysis":          return "bg-green-500";
    case "Process Automation":     return "bg-pink-500";
    case "Strategic Insights":     return "bg-yellow-400 text-gray-900";
    case "Project Management":     return "bg-indigo-500";
    default:                      return "bg-gray-700";
  }
};

const HighlightsCarousel = ({ highlights }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Card position logic
  const getSlideClass = (index) => {
    const total = highlights.length;
    if (index === currentIndex) return "active";
    if (index === (currentIndex - 1 + total) % total) return "prev";
    if (index === (currentIndex + 1) % total) return "next";
    if (index === (currentIndex - 2 + total) % total) return "hide-left";
    if (index === (currentIndex + 2) % total) return "hide-right";
    return "hidden";
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % highlights.length);
  }, [highlights.length]);
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length);
  };
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="highlights" className="pt-32 pb-20 flex flex-col items-center justify-center">
      <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center h-[420px] mt-0">
        <div className="relative w-full h-full perspective-1000">
          <div className="relative w-full h-full transform-style-3d">
            {highlights.map((item, index) => (
              <div
                key={index}
                className={`carousel-slide absolute w-64 md:w-80 lg:w-[370px] h-[390px] transition-transform duration-700 ${getSlideClass(index)}`}
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-gray-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent py-5 px-6 rounded-b-2xl">
                    <div className="flex items-center mb-2">
                      <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${getBadgeColor(item.category)} shadow`}>
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-white text-lg font-bold leading-snug">{item.title}</h3>
                    <p className="text-gray-200 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Navigation */}
        <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-gray-900 bg-opacity-60 p-3 rounded-full text-white hover:bg-opacity-80"
        >     
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
             onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-gray-900 bg-opacity-60 p-3 rounded-full text-white hover:bg-opacity-80"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
};

export default HighlightsCarousel;
