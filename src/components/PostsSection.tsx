import React from "react";
import PostFilterBar from "./PostFilterBar.js";
import PostFeed from "./PostFeed.js";
import { supabase } from "../supabaseClient";


type PostType = {
  author: string;
  created_at: string;
  body_text: string;
  id: number;
  img_link: string;
  title: string;
  votes: number;
};

export default function PostsSection() {
  const [filter, setFilter] = React.useState("latest");
  const [postData, setPostData] = React.useState<PostType[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      let orderParam = filter === "latest" ? "created_at" : "votes";
      if (orderParam == "created_at") {
        let { data: posts, error } = await supabase
          .from("posts")
          .select("*")
          .order(orderParam, { ascending: false });

        if (error) return;
        else if (posts !== null) {
          setPostData(posts);
        }
      } else {
        const { data: posts, error } = await supabase
          .from("posts_with_vote_tally")
          .select("*")
          .order("vote_tally", { ascending: false });

        if (error) return;
        else {
          setPostData(posts);
        }
      }
    };

    fetchData();
  }, [filter]);

  return (
    <section className="flex flex-col gap-6 ">
      <PostFilterBar filter={filter} setFilter={setFilter} />
      <PostFeed postData={postData} />
    </section>
  );
}
