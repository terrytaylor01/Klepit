import React from "react";
import { supabase } from "../../supabaseClient";
import { CrossIcon } from "../ui/icons/CrossIcon";
import { GithubIcon } from "../ui/icons/GithubIcon";
import { HandleModalContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function SignInModal() {
  const navigate = useNavigate();

  const handleSignInModal = React.useContext(HandleModalContext);

  const [isSignInError, setIsSignInError] = React.useState(false);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.currentTarget.name]: e.currentTarget.value };
    });
    console.log(formData);
  };

  const handleSignIn = async (provider: string) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider as "github",
    });
    if (error) console.error(error);
  };

  const handleSignInEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) {
      console.error(error);
      setIsSignInError(true);
    } else {
      handleSignInModal("close");
    }
  };

  return (
    <main className="fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center overflow-y-hidden bg-neutral-800 bg-opacity-80 font-inter text-white">
      <div className="flex max-h-[40rem] w-[30rem] flex-col gap-6 rounded-lg bg-neutral-900 px-12 pb-12 pt-8">
        <span className="flex items-center justify-between">
          <div>
            <h1 className="text-xl">Sign In</h1>
          </div>
          <button
            onClick={() => {
              handleSignInModal("close");
            }}
            className="rounded-full bg-neutral-800 p-3 transition-colors hover:bg-neutral-700"
          >
            <div className="aspect-square h-5 ">
              <CrossIcon />
            </div>
          </button>
        </span>
        <div className="flex flex-col gap-3">
          {/* <button
            onClick={() => handleSignIn("google")}
            className="flex h-12 items-center rounded-full bg-white p-2 text-black transition-colors hover:bg-neutral-200"
          >
            <div className="h-full">
              <GoogleIcon />
            </div>
            <p className="grow text-center">Continue with Google</p>
          </button> */}
          <button
            onClick={() => handleSignIn("github")}
            className="flex h-12 items-center rounded-full bg-white p-2 text-black transition-colors hover:bg-neutral-200"
          >
            <div className="h-full">
              <GithubIcon />
            </div>
            <p className="grow text-center">Continue with GitHub</p>
          </button>
        </div>
        <div className="flex items-center gap-2 opacity-70 ">
          <hr className="grow text-white" /> <p> OR</p>
          <hr className="grow text-white" />
        </div>
        <div className="w-full pt-4">
          <form className="flex w-full flex-col gap-2 ">
            <input
              onChange={handleChange}
              type="text"
              className="w-full rounded-md p-2 text-black "
              placeholder="Email Address / Username"
              name="email"
              value={formData.email}
            />
            <input
              onChange={handleChange}
              type="password"
              className="w-full rounded-md p-2 text-black "
              placeholder="Password"
              name="password"
              value={formData.password}
            />
            {isSignInError && (
              <p className="text-sm text-orange-300">
                Log-in failed, check your details and try again.
              </p>
            )}
            <button
              type="button"
              onClick={handleSignInEmail}
              className="mt-4 rounded-full bg-orange-500 p-2 text-xl transition-colors hover:bg-orange-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
