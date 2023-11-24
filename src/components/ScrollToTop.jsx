import React from "react";
import { ScrollTopIcon } from "./ui/icons/ScrollTopIcon";

export default function ScrollToTop() {
  const scroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scroll}
      className="flex aspect-square w-10 items-center justify-center rounded-full bg-neutral-800 p-2 text-2xl text-neutral-200  transition-colors hover:bg-neutral-600 "
    >
      <ScrollTopIcon />
    </button>
  );
}
