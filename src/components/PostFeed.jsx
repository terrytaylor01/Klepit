import React from "react";
import PreviewPost from "./PreviewPost";

export default function PostFeed({ postData }) {
  const posts = postData.map((post) => {
    return (
      <PreviewPost
        key={post.id}
        post_id={post.id}
        title={post.title}
        poster={post.author}
        //comments={post.comments}
        created_at={post.created_at}
        votes={post.votes}
        img={post.img_link}
        body_text={post.body_text}
      />
    );
  });

  return (
    <section className="border-collapse [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md [&>*:last-child]:border-b-2">
      {posts}
    </section>
  );
}
