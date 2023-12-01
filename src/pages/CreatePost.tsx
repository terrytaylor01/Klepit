import React from "react";
import { MainIcon } from "../components/ui/icons/MainIcon";
import CreatePostForm from "../components/CreatePostForm";
import { Navigate, useLocation } from "react-router-dom";
import { SessionContext } from "../App";

export default function CreatePost() {
  const location = useLocation();
  const session = React.useContext(SessionContext);

  return (
    <>
      {!session ? (
        <Navigate to={"/"} />
      ) : (
        <main className="flex h-fit w-screen justify-center font-inter  text-white">
          <div className="flex max-w-7xl grow gap-8 px-8 py-10">
            <div className="flex w-full flex-col gap-2">
              <div className="h-12 border-b border-neutral-500">
                <h1 className="text-xl font-light">Create a post</h1>
              </div>
              <CreatePostForm cameFromImage={location?.state?.image} />
            </div>
            <aside className=" hidden h-56 w-80 flex-col rounded-md bg-neutral-800 p-3 outline outline-1 outline-neutral-600 lg:flex">
              <div className="flex h-12 w-full items-end border-b border-neutral-600 pb-2 text-lg">
                <span className="aspect-square w-12">
                  <MainIcon />
                </span>
                <h2 className="ml-auto mr-auto pb-2">Posting to Klepit</h2>
              </div>
              <ul className="flex w-full list-inside list-decimal flex-col">
                <li className="w-full p-2 ">Be original</li>
                <li className="w-full p-2 ">Be respectful</li>
                <li className="w-full p-2 ">Don't steal content</li>
              </ul>
            </aside>
          </div>
        </main>
      )}
    </>
  );
}
