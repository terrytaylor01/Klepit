import React from "react";
import { Link } from "react-router-dom";
import { PhotoIcon } from "./ui/icons/PhotoIcon";
import { HandleModalContext, SessionContext } from "../App";

export default function CreateBar() {
  const session = React.useContext(SessionContext);
  const handleSignInModal = React.useContext(HandleModalContext);

  return (
    <>
      {session ? (
        <div className="flex h-14 items-center gap-2 rounded-md bg-neutral-800 px-2 py-2 outline outline-1 outline-neutral-600">
          <Link
            to={"/create"}
            className="h-full w-full cursor-text rounded-sm bg-neutral-700 py-2 pl-5 text-left text-neutral-400 outline outline-1 outline-neutral-600 hover:bg-neutral-800 hover:outline-neutral-200"
          >
            Create Post
          </Link>
          <Link
            to={"/create"}
            state={{ image: "true" }}
            className="aspect-square h-full rounded-md p-2 text-neutral-400 transition-colors  duration-100 hover:bg-neutral-700"
          >
            {" "}
            <PhotoIcon />{" "}
          </Link>
        </div>
      ) : (
        <button
          onClick={() => {
            handleSignInModal("open");
          }}
          className="flex h-14 items-center gap-2 rounded-md bg-neutral-800 px-2 py-2 outline outline-1 outline-neutral-600"
        >
          <div className="h-full w-full cursor-text rounded-sm bg-neutral-700 py-2 pl-5 text-left text-neutral-400 outline outline-1 outline-neutral-600 hover:bg-neutral-800 hover:outline-neutral-200">
            Create Post
          </div>
          <Link
            to={"/create"}
            state={{ image: "true" }}
            className="aspect-square h-full rounded-md p-2 text-neutral-400 transition-colors  duration-100 hover:bg-neutral-700"
          >
            {" "}
            <PhotoIcon />{" "}
          </Link>
        </button>
      )}
    </>
  );
}
