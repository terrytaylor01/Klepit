import React from "react";
import Navbar from "../components/Navbar";
import CreateBar from "../components/CreateBar";
import PostsSection from "../components/PostsSection";
import Sidebar from "../components/Sidebar";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  return (
    <main className="font-inter h-fit w-screen">
      <div className="flex p-8">
        <div className="flex w-full flex-col gap-4">
          <CreateBar />
          <PostsSection />
        </div>
        <div className="hidden xl:block">
          <Sidebar />
        </div>
      </div>
      <span className="sticky bottom-0 flex justify-end p-4 ">
        <ScrollToTop />
      </span>
    </main>
  );
}
