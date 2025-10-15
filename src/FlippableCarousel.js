import React, { useState, useEffect, useCallback } from "react";
import FlippableCard from "./FlippableCard";

const FlippableCarousel = ({ items, badgeKey="badge" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedIndex, setFlippedIndex] = useState(null);

  const total = items.length;
  const getSlideClass = (index) => {
    if (index === currentIndex) return "active";
    if (index === (currentIndex - 1 + total) % total) return "prev";
    if (index === (currentIndex + 1) % total) return "next";
    if (index === (currentIndex - 2 + total) % total) return "hide-left";
    if (index === (currentIndex + 2) % total) return "hide-right";
    return "hidden";
  };

  const nextSlide = useCallback(
    () => setCurrentIndex((prev) => (prev + 1) % total),
    [total]
  );
  const prevSlide = useCallback(
    () => setCurrentIndex((prev) => (prev - 1 + total) % total),
    [total]
  );

  useEffect(() => {
    setFlippedIndex(null); // Always flip card back to front on slide change
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 12000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center h-[420px] mt-0">
      <div className="relative w-full h-full perspective-1000">
        <div className="relative w-full h-full preserve-3d">
        {items.map((item, index) => {
  const slideClass = getSlideClass(index);
  const isActive = slideClass === "active";
  return (
    <div
      key={index}
      className={`carousel-slide absolute w-64 md:w-80 lg:w-[370px] h-[390px] transition-transform duration-700 ${slideClass}`}
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
      onClick={() => {
        if (!isActive) {
          setCurrentIndex(index); // Move adjacent card to center
        }
      }}
    >
      <FlippableCard
        {...item}
        badge={item[badgeKey]}
        isFlipped={isActive && flippedIndex === index}
        onToggleFlip={() => {
          if (isActive) setFlippedIndex(flippedIndex === index ? null : index);
        }}
      />
    </div>
  );
})}

        </div>
      </div>
      <button
        onClick={() => { prevSlide(); }}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-gray-900 bg-opacity-60 p-3 rounded-full text-white hover:bg-opacity-80"
        style={{ transform: "translateY(-50%)" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button
        onClick={() => { nextSlide(); }}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-gray-900 bg-opacity-60 p-3 rounded-full text-white hover:bg-opacity-80"
        style={{ transform: "translateY(-50%)" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
};

export default FlippableCarousel;
