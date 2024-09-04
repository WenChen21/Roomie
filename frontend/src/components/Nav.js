import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

function Nav() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);
  return (
    <div className="ml-10 mr-10 mt-5 h-max">
      <div className="flex justify-between">
        <div>
          <Link to="/" className="p-2">
            Logo
          </Link>
        </div>
        <div className="flex space-x-4">
          {session ? (
            <div className="flex space-x-4">
              <button className="p-2 border bg-cyan-200 hover:bg-cyan-400 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95">
                <Link to="/chat">Chat</Link>
              </button>
              <button className="p-2 border bg-cyan-200 hover:bg-cyan-400 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95">
                <Link to="/profile">Profile</Link>
              </button>
              <button
                className="p-2 border bg-cyan-200 hover:bg-cyan-400 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                onClick={() => {
                  supabase.auth.signOut();
                  supabase.auth.getSession().then(({ data: { session } }) => {
                    setSession(session);
                  });
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button className="p-2 border bg-cyan-200 hover:bg-cyan-400 rounded-lg transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95">
              <Link to="/signin">Sign In / Login</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
