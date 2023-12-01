import React from "react";
import PreviewPost from "./PreviewPost";

type TextPostType = {
  author: string;
  body_text: string;
  created_at: string;
  id: number;
  title: string;
  votes: number;
};
type ImgPostType = {
  author: string;
  created_at: string;
  id: number;
  img_link: string;
  title: string;
  votes: number;
};

type PostDataType = TextPostType | ImgPostType;

export default function PostFeed({ postData }: { postData: PostDataType[] }) {
  const posts = postData.map((post: PostDataType) => {
    if ("body_text" in post) {
      return (
        <PreviewPost
          key={post.id}
          post_id={post.id}
          title={post.title}
          poster={post.author}
          created_at={post.created_at}
          body_text={post.body_text}
        />
      );
    } else {
      return (
        <PreviewPost
          key={post.id}
          post_id={post.id}
          title={post.title}
          poster={post.author}
          created_at={post.created_at}
          img={post.img_link}
        />
      );
    }
  });

  return (
    <section className="border-collapse [&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md [&>*:last-child]:border-b-2">
      {posts}
    </section>
  );
}
