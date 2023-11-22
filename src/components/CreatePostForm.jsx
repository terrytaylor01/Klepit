import React from "react";
import { TextIcon } from "./ui/icons/TextIcon";
import { PhotoIcon } from "./ui/icons/PhotoIcon";
import { supabase } from "../supabaseClient.js";
import { HandleModalContext, SessionContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";

export default function CreatePostForm({ cameFromImage }) {
  const session = React.useContext(SessionContext);
  const handleSignInModal = React.useContext(HandleModalContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!session) {
      navigate("/");
    }
  }, []);

  const [isText, setIsText] = React.useState(cameFromImage ? false : true);

  let post_author = session.user.user_metadata.user_name
    ? session.user.user_metadata.user_name
    : session.user.email;

  const [formData, setFormData] = React.useState({
    title: "",
    text: "",
    img: "",
    author: post_author,
  });

  const [formValid, setFormValid] = React.useState(false);
  const [formSubmitLoading, setFormSubmitLoading] = React.useState(false);

  React.useEffect(() => {
    if (isText) {
      if (!formData.title == "" && !formData.text == "") {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
      console.log(formValid);
    } else {
      if (!formData.title == "" && !formData.img == "") {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(formData);
  };

  function isImgUrl(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onerror = () => resolve(false);
      img.onload = () => resolve(true);
    });
  }

  const submitForm = async () => {
    setFormSubmitLoading(true);
    console.log(formSubmitLoading);
    if (isText) {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            author: formData.author,
            title: formData.title,
            body_text: formData.text,
          },
        ])
        .select();

      setFormSubmitLoading(false);
      navigate("/");
    } else {
      if (await isImgUrl(formData.img)) {
        console.log("Success issa image");
        const { data, error } = await supabase
          .from("posts")
          .insert([
            {
              author: formData.author,
              title: formData.title,
              img_link: formData.img,
            },
          ])
          .select();
        setFormSubmitLoading(false);
        navigate("/");
      } else {
        console.log(formSubmitLoading);
        console.log(" notta image");
        setFormSubmitLoading(false);
      }
    }
  };

  return (
    <form className="h-fit w-full overflow-clip rounded-md bg-neutral-800">
      <div className="grid h-16 grid-cols-2 grid-rows-1 border-b border-neutral-600">
        <button
          type="button"
          onClick={() => setIsText(true)}
          className={
            (isText
              ? "border-b-2 border-white border-r-neutral-600 bg-neutral-700"
              : "") +
            " flex h-full items-center justify-center gap-3 border-r border-neutral-600 transition-colors hover:bg-neutral-700"
          }
        >
          <div className="aspect-square w-5">
            <TextIcon />
          </div>
          <h2>Text Post</h2>
        </button>
        <button
          onClick={() => setIsText(false)}
          type="button"
          className={
            (!isText ? "border-b-2 bg-neutral-700 " : "") +
            " flex h-full items-center justify-center gap-3   transition-colors hover:bg-neutral-700"
          }
        >
          <div className="aspect-square w-5">
            <PhotoIcon />
          </div>
          <h2>Image Link</h2>
        </button>
      </div>
      {isText ? (
        <div className="flex flex-col gap-4 p-4">
          <input
            onChange={handleChange}
            type="text"
            className=" w-full rounded-sm bg-inherit p-2 px-4 text-sm outline outline-1 outline-neutral-600 focus:outline-neutral-200"
            placeholder="Title"
            name="title"
            value={formData.title}
          />
          <textarea
            onChange={handleChange}
            className=" w-full rounded-sm bg-inherit p-2 px-4 text-sm outline outline-1 outline-neutral-600 focus:outline-neutral-200"
            rows="7"
            placeholder="Text"
            name="text"
            value={formData.text}
          />
          <div className="flex w-full">
            <div className="ml-auto flex gap-4">
              {formSubmitLoading && <div class="spinner-6 w-8 "></div>}
              <button
                disabled={!formValid}
                onClick={submitForm}
                type="button"
                className="rounded-full bg-neutral-200 px-2 py-1 font-medium text-black transition-colors hover:bg-orange-500 hover:text-white disabled:text-neutral-500 disabled:hover:bg-current"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4">
          <input
            onChange={handleChange}
            type="text"
            className=" w-full rounded-sm bg-inherit p-2 px-4 text-sm outline outline-1 outline-neutral-600 focus:outline-neutral-200"
            placeholder="Title"
            name="title"
            value={formData.title}
          />
          <input
            onChange={handleChange}
            className=" w-full rounded-sm bg-inherit p-2 px-4 text-sm outline outline-1 outline-neutral-600 focus:outline-neutral-200"
            placeholder="Image Link"
            type="url"
            name="img"
            value={formData.img}
          />
          {formData.img && (
            <div className="w-full">
              <h2 className="mb-2 text-sm text-neutral-500">Preview</h2>
              <img src={formData.img} className="max-h-60 max-w-[100%]" />
            </div>
          )}
          <div className="flex w-full">
            <div className="ml-auto flex gap-4">
              {formSubmitLoading && <div class="spinner-6 w-8 "></div>}
              <button
                disabled={!formValid}
                onClick={submitForm}
                type="button"
                className="rounded-full bg-neutral-200 px-2 py-1 font-medium text-black transition-colors hover:bg-orange-500 hover:text-white disabled:text-neutral-500 disabled:hover:bg-current"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
