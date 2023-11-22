import React from "react";

export default function PostFilterBar({ filter, setFilter }) {
  return (
    <div className="flex h-14 items-center gap-2 rounded-md bg-neutral-800 px-4 py-2 outline outline-1 outline-neutral-600">
      <button
        onClick={() => setFilter("latest")}
        className={
          (filter == "latest"
            ? "bg-neutral-700 text-white"
            : "text-neutral-400") +
          " rounded-full px-2 py-1 font-semibold  transition-colors hover:bg-neutral-700"
        }
      >
        Latest
      </button>
      <button
        onClick={() => setFilter("popular")}
        className={
          (filter == "popular"
            ? "bg-neutral-700 text-white"
            : "text-neutral-400") +
          " rounded-full px-2 py-1 font-semibold  transition-colors hover:bg-neutral-700"
        }
      >
        Popular
      </button>
    </div>
  );
}
