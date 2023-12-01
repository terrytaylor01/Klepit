import React from "react";
import { supabase } from "../supabaseClient";
import { MainIcon } from "./ui/icons/MainIcon.jsx";
import { Link } from "react-router-dom";
import { HandleModalContext, SessionContext } from "../App.jsx";

export default function Navbar() {
  const session = React.useContext(SessionContext);
  const handleSignInModal = React.useContext(HandleModalContext);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <div className="sticky top-0 flex h-14 items-center justify-between border border-x-0 border-t-0 border-neutral-600 bg-neutral-800 px-6 py-1 font-inter">
      <Link
        reloadDocument
        to={"/"}
        className="flex h-full items-center gap-2 text-white"
      >
        <div className="h-full w-10">
          <MainIcon />
        </div>
        <h1 className="text-xl">Klepit</h1>
      </Link>
      {!session ? (
        <button
          onClick={() => {
            handleSignInModal("open");
          }}
          className="rounded-full bg-orange-500 px-2 py-1 font-medium text-white transition-colors hover:bg-orange-600"
        >
          Sign In
        </button>
      ) : (
        <div className="flex items-center gap-4 text-white">
          <h2 className="text-sm">
            {session.user.user_metadata.user_name
              ? session.user.user_metadata.user_name
              : session.user.email}
          </h2>
          <button
            onClick={signOut}
            className="rounded-full bg-orange-500 px-2 py-1 font-medium text-white transition-colors hover:bg-orange-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
