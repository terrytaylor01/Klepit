import React from "react";

import { TextIcon } from "./ui/icons/TextIcon";
import { ArrowIcon } from "./ui/icons/ArrowIcon";
import { ExpandIcon } from "./ui/icons/ExpandIcon";
import { MinimiseIcon } from "./ui/icons/MinimiseIcon";
import { supabase } from "../supabaseClient.js";

export default function PreviewPost({
  post_id,
  title,
  poster,
  created_at,
  votes,
  img,
  body_text,
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [dynamicVotes, setDynamicVotes] = React.useState(votes);

  // 0 if false, 1 if upvote, 2 if downvote
  const [hasVoted, setHasVoted] = React.useState(0);

  function timeSince(dateString) {
    var date = new Date(dateString.replace(" ", "T"));
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return "less than 1 minute ago";
  }

  async function handleVote(isUpvote) {
    console.log("vote handled");

    if (hasVoted == 1 && isUpvote) {
      return;
    }
    const count = isUpvote ? 1 : -1;
    console.log("count:", count);
    console.log("post id", post_id);

    let { data: currentVotes, error } = await supabase
      .from("posts")
      .select("votes")
      .eq("id", post_id)
      .single();

    if (error) {
      console.log("Data fetch error: ", error);
      return;
    }

    const newVotes = currentVotes.votes + count;
    setDynamicVotes(newVotes);

    const { data, error: updateError } = await supabase
      .from("posts")
      .update({ votes: newVotes })
      .eq("id", post_id);

    if (updateError) {
      console.log("Data update error: ", updateError);
    } else {
      setHasVoted(isUpvote ? 1 : 2);
      console.log("Vote count updated successfully");
    }
  }

  let howLong = timeSince(created_at);

  return (
    <article className="flex h-fit min-h-[7rem] border-[1px] border-neutral-700   bg-neutral-800   hover:border-neutral-400  md:min-h-[6rem] ">
      <div className="flex w-10 flex-col items-center bg-neutral-900 p-3  text-white">
        <button
          onClick={() => {
            handleVote(true);
          }}
          className={
            (hasVoted == "1" ? "fill-white" : "") +
            " flex aspect-square w-6 items-center justify-center rounded-sm hover:bg-neutral-700 "
          }
        >
          <ArrowIcon />
        </button>
        <p>{!(votes === null) ? dynamicVotes : "Null"}</p>
        <button
          onClick={() => {
            handleVote(false);
          }}
          className={
            (hasVoted == "2" ? "fill-white" : "") +
            " flex aspect-square w-6 items-center justify-center rounded-sm hover:bg-neutral-700 [&>*]:rotate-180"
          }
        >
          <ArrowIcon />
        </button>
      </div>
      <div className="flex w-full flex-col">
        <div className="flex w-[100%] px-4 py-2">
          {img == "" || img == null ? (
            <div className="flex aspect-[10/8] h-[80px] w-[100px] items-center justify-center rounded-md bg-neutral-700 text-white ">
              <div className="aspect-square w-5">
                <TextIcon />
              </div>
            </div>
          ) : (
            <img
              className="flex aspect-[10/8] h-[80px] w-[100px] items-center justify-center rounded-md bg-neutral-700 object-cover text-white"
              src={img}
            />
          )}

          <div className="ml-4 flex w-full flex-col text-sm text-white md:text-base ">
            <div className="min-h-6">
              <h2>{title}</h2>
            </div>
            <div className="min-h-4 align-text-bottom text-[0.6rem] text-neutral-300">
              <p>
                Posted by {poster} {howLong}
              </p>
            </div>
            <div className="mt-auto flex h-full items-center text-neutral-400">
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="flex h-5 items-center gap-1 rounded-md  hover:bg-neutral-700"
              >
                {isExpanded ? <MinimiseIcon /> : <ExpandIcon />}
              </button>

              {/*  <button className="flex h-fit items-center gap-1 rounded-md px-2 py-1 hover:bg-neutral-700">
                <CommentIcon />
                <div className="flex gap-1">
                  {comments} <p className="hidden md:block">comments</p>
                </div>
              </button> */}
            </div>
          </div>
        </div>
        {isExpanded && body_text && (
          <div className="min-h-[4rem] px-4 py-2 text-white"> {body_text} </div>
        )}
        {isExpanded && (
          <div className="flex w-full justify-center">
            <img src={img} className="max-h-80 max-w-[100%]" />
          </div>
        )}
      </div>
    </article>
  );
}
