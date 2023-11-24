import React from "react";

import { TextIcon } from "./ui/icons/TextIcon";
import { ArrowIcon } from "./ui/icons/ArrowIcon";
import { ExpandIcon } from "./ui/icons/ExpandIcon";
import { MinimiseIcon } from "./ui/icons/MinimiseIcon";
import { supabase } from "../supabaseClient.js";
import { HandleModalContext, SessionContext } from "../App.jsx";

export default function PreviewPost({
  post_id,
  title,
  poster,
  created_at,
  img,
  body_text,
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const [voteCount, setVoteCount] = React.useState(0);

  const session = React.useContext(SessionContext);
  const handleSignInModal = React.useContext(HandleModalContext);

  const [hasVoted, setHasVoted] = React.useState(0);

  function timeSince(dateString) {
    var date = new Date(dateString.replace(" ", "T"));
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      const msg = Math.floor(interval) == 1 ? " year ago" : " years ago";
      return Math.floor(interval) + msg;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      const msg = Math.floor(interval) == 1 ? " month ago" : " months ago";
      return Math.floor(interval) + msg;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      const msg = Math.floor(interval) == 1 ? " day ago" : " days ago";
      return Math.floor(interval) + msg;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      const msg = Math.floor(interval) == 1 ? " hour ago" : " hours ago";
      return Math.floor(interval) + msg;
    }
    interval = seconds / 60;
    if (interval > 1) {
      const msg = Math.floor(interval) == 1 ? " minute ago" : " minutes ago";
      return Math.floor(interval) + msg;
    }
    return "less than 1 minute ago";
  }

  async function handleVote(isUpvote) {
    if (!session) {
      handleSignInModal("open");
      return;
    }

    const { data, error } = await supabase
      .from("votes")
      .select("user_id, post_id, vote_type")
      .eq("user_id", session.user.id)
      .eq("post_id", post_id);

    // a vote exists already
    if (data && data.length > 0) {
      // they upvoted
      if (isUpvote) {
        // they have already upvoted so delete upvote vote
        if (data[0]?.vote_type == "upvote") {
          const { data, error } = await supabase
            .from("votes")
            .delete()
            .eq("user_id", session.user.id)
            .eq("post_id", post_id);
        }
        // if they have downvoted change the vote to upvote
        else {
          const { data, error } = await supabase
            .from("votes")
            .update({ vote_type: "upvote" })
            .eq("user_id", session.user.id)
            .eq("post_id", post_id)
            .select();
        }
      }
      // they downvoted
      else {
        if (data[0]?.vote_type == "downvote") {
          const { data, error } = await supabase
            .from("votes")
            .delete()
            .eq("user_id", session.user.id)
            .eq("post_id", post_id);
        } else {
          const { data, error } = await supabase
            .from("votes")
            .update({ vote_type: "downvote" })
            .eq("user_id", session.user.id)
            .eq("post_id", post_id)
            .select();
        }
      }
    } else {
      const { data, error } = await supabase
        .from("votes")
        .insert([
          {
            post_id: post_id,
            vote_type: isUpvote ? "upvote" : "downvote",
            user_id: session.user.id,
          },
        ])
        .select();
    }
    await fetchVotes();
  }

  // Fetch votes for tally
  const fetchVotes = async () => {
    const { data: upvoteData, error: upvoteError } = await supabase
      .from("votes")
      .select("*", { count: "exact" })
      .eq("vote_type", "upvote")
      .eq("post_id", post_id);

    const { data: downvoteData, error: downvoteError } = await supabase
      .from("votes")
      .select("*", { count: "exact" })
      .eq("vote_type", "downvote")
      .eq("post_id", post_id);

    let tally = upvoteData?.length - downvoteData?.length;
    setVoteCount(tally);
  };

  const checkUserVoteStatus = async () => {
    const { data, error } = await supabase
      .from("votes")
      .select("user_id, post_id, vote_type")
      .eq("user_id", session.user.id)
      .eq("post_id", post_id);

    if (data && data.length > 0) {
      if (data[0]?.vote_type == "upvote") {
        setHasVoted("upvoted");
      } else {
        setHasVoted("downvoted");
      }
    } else {
      setHasVoted(0);
    }
  };

  React.useEffect(() => {
    fetchVotes();
  }, []);

  React.useEffect(() => {
    checkUserVoteStatus();
  }, [voteCount, session]);

  let howLong = timeSince(created_at);

  return (
    <article
      onClick={() => setIsExpanded((prev) => !prev)}
      className="flex h-fit min-h-[7rem] border-[1px] border-neutral-700   bg-neutral-800   hover:border-neutral-400  md:min-h-[6rem] "
    >
      <div className="flex w-10 flex-col items-center bg-neutral-900 p-3  text-white">
        <button
          onClick={() => {
            handleVote(true);
          }}
          className={
            (hasVoted == "upvoted" ? "fill-white" : "") +
            " flex aspect-square w-6 items-center justify-center rounded-sm hover:bg-neutral-700 "
          }
        >
          <ArrowIcon />
        </button>
        <p>{voteCount}</p>
        <button
          onClick={() => {
            handleVote(false);
          }}
          className={
            (hasVoted == "downvoted" ? "fill-white" : "") +
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
