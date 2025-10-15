import React from "react";

const FlippableCard = ({
  title,
  subtitle,
  paragraph,
  imageUrl,
  badge,
  className = "",
  isFlipped = false,
  onToggleFlip,
}) => (
  <div
    className={`relative w-full h-full transition-transform duration-700 ${className} group perspective-1000`}
    onClick={onToggleFlip}
    tabIndex={0}
    onKeyDown={e => e.key === "Enter" && onToggleFlip()}
    style={{ cursor: "pointer" }}
    aria-label={title + " card"}
  >
    <div className={`absolute inset-0 w-full h-full transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""} preserve-3d`}>
      {/* Front Side */}
      
      <div className="absolute inset-0 flex flex-col bg-gray-800/85 rounded-2xl backface-hidden overflow-hidden">
  {/* Image section at top */}
  {imageUrl && (
    <img
      src={`/${imageUrl}`}
      alt={title}
      className="w-full h-36 object-cover rounded-t-2xl"
      style={{ minHeight: 110 }}  // Or use Tailwind min-h-[110px]
    />
  )}
  {/* Card content below image */}
  <div className="flex-1 flex flex-col justify-end p-6">
    {badge && (
      <span className="mb-2 px-3 py-1 rounded-full bg-blue-600 text-xs text-white font-bold shadow">{badge}</span>
    )}
    {title && <h3 className="text-white text-lg font-bold mb-1">{title}</h3>}
    {subtitle && <p className="text-white text-md mb-2 text-justify">{subtitle}</p>}
  </div>
</div>

      {/* Back Side */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900/90 rounded-2xl p-6 rotate-y-180 backface-hidden">
        <p className="text-gray-100 text-base text-justify">{paragraph}</p>
      </div>
    </div>
  </div>
);

export default FlippableCard;
