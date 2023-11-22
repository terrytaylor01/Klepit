import React from "react";

export default function ScrollToTop() {
  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scroll}
      className="flex aspect-square w-10 items-center justify-center rounded-full bg-neutral-800 text-2xl text-white hover:bg-neutral-600 transition-colors "
    >
      ^
    </button>
  );
}
