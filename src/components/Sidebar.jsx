import React from "react";

export default function Sidebar() {
  return (
    <section className=" ml-8 w-80">
      <div className="flex h-72 w-full flex-col rounded-md bg-neutral-800 p-3 text-neutral-200 outline outline-1 outline-neutral-600">
        <p>Klepit</p>
        <p>
          <small>
            This is a clone of Reddit's homepage with basic functionality to
            demonstrate abilities as a front-end developer. All rights for the
            layout and design are attributed to Reddit.
          </small>
        </p>
        <p className="mt-auto">
          <small>
            Created by Terrence Taylor, using ReactJS and TailwindCSS and
            Supabase for SQL Database and Authentication. See the source code
            here-
            {">"}
          </small>
        </p>
      </div>
    </section>
  );
}
