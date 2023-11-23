import React from "react";
import PostFilterBar from "./PostFilterBar";
import PostFeed from "./PostFeed";
import { supabase } from "../supabaseClient.js";

/* const samplePostData = [
  {
    title: "Does any one else think cheese is overrated?",
    poster: "strandedFish412",
    comments: "93",
    howLong: "8 hours ago",
    votes: "9.4k",
    img: "",
  },
  {
    title: "Is this really happening?",
    poster: "thereIsOnlyOne",
    comments: "12",
    howLong: "7 hours ago",
    votes: "753",
    img: "https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_teaser_image/2022-08/pixabay-thedigitalartist_earth_exploding.jpg?itok=ZL95ut77",
  },
  {
    title:
      "bought this house and now there are creepy sounds, how do I rent it out?",
    poster: "JimBob4",
    comments: "5",
    howLong: "2 hours ago",
    votes: "2",
    img: "https://hips.hearstapps.com/hmg-prod/images/i-tkdq5mw-x2-6536cc620a0c5.jpeg?crop=0.558xw:0.823xh;0.200xw,0.0284xh&resize=640:*",
  },
  {
    title: "Questions about my pet fish?",
    poster: "strandedFish412",
    comments: "1",
    howLong: "1 hours ago",
    votes: "2",
    img: "",
  },
  {
    title: "Why is there 51 states and not 4125, a discussion.",
    poster: "orangeLiberty10942",
    comments: "93",
    howLong: "8 hours ago",
    votes: "9.4k",
    img: "",
  },
  {
    title: "bottom text",
    poster: "thereIsOnlyOne",
    comments: "12",
    howLong: "7 hours ago",
    votes: "753",
    img: "data:image/jpeg;base64,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",
  },
  {
    title: "How'd I Do?",
    poster: "eccentricchef",
    comments: "54",
    howLong: "11 hours ago",
    votes: "25",
    img: "https://i.pinimg.com/564x/77/35/dd/7735dd49ea9f5908da97618e43a4d510.jpg",
  },
  {
    title: "true",
    poster: "strandedFish412",
    comments: "184",
    howLong: "5 hours ago",
    votes: "78",
    img: "https://i.pinimg.com/736x/a4/2e/49/a42e49c9583858f98958bafa033693a3.jpg",
  },
  {
    title: "How to earn money fast?",
    poster: "daddygandalf420",
    comments: "1873",
    howLong: "3 seconds ago",
    votes: "1.0M",
    img: "",
  },
]; */

export default function PostsSection() {
  const [filter, setFilter] = React.useState("latest");
  const [postData, setPostData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      let orderParam = filter === "latest" ? "created_at" : "votes";
      if (orderParam == "created_at") {
        let { data: posts, error } = await supabase
          .from("posts")
          .select("*")
          .order(orderParam, { ascending: false });

        if (error) console.log("Data fetch error: ", error);
        else {
          setPostData(posts);
        }
      } else {
        const { data: posts, error } = await supabase
          .from("posts_with_vote_tally")
          .select("*")
          .order("vote_tally", { ascending: false });

        if (error) console.log("Data fetch error: ", error);
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
