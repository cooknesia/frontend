"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export default function RatingStars() {
  const [rating, setRating] = (useState < number) | (null > null);
  const [hover, setHover] = (useState < number) | (null > null);

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="p-1 focus:outline-none"
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          aria-label={`Rate ${star} stars out of 5`}
        >
          <Star
            className={`h-8 w-8 transition-all ${
              (hover !== null ? star <= hover : star <= (rating || 0))
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
      {rating && (
        <span className="ml-2 text-sm text-gray-600">
          Terima kasih atas penilaian Anda!
        </span>
      )}
    </div>
  );
}
