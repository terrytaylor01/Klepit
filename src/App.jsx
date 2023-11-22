import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import SignInModal from "./components/modals/SignInModal";

import { supabase } from "./supabaseClient.js";

export const SessionContext = React.createContext();
export const HandleModalContext = React.createContext();

function App() {
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignInModal = (command) => {
    if (command == "open") {
      setSignInOpen(true);
      document.body.classList.add("overflow-hidden");
    } else {
      setSignInOpen(false);
      document.body.classList.remove("overflow-hidden");
    }
  };

  return (
    <>
      <SessionContext.Provider value={session}>
        <HandleModalContext.Provider value={handleSignInModal}>
          {signInOpen && <SignInModal />}
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </HandleModalContext.Provider>
      </SessionContext.Provider>
    </>
  );
}

export default App;
