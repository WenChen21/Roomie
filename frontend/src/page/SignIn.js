import React from "react";
import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { FcGoogle } from "react-icons/fc";
function SignIn() {
  // You can extract the user's email domain and use it to trigger the
  // authentication flow with the correct identity provider.
  // const [email, setEmail] = useState("");
  // async function handleEmail() {
  //   console.log(email.split("@")[1]);
  //   const { data, error } = await supabase.auth.signInWithSSO({
  //     domain: email.split("@")[1],
  //   });
  //   console.log(error);
  //   if (data?.url) {
  //     // redirect the user to the identity provider's authentication flow
  //     window.location.href = data.url;
  //   }
  // }
  const [data, setData] = useState(null);
  const [session, setSession] = useState(null);
  const handleSignUp = async () => {
    try {
      setData(
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: "/",
            scopes: "openid profile email",
            hd: "cornell.edu",
            queryParams: { prompt: "consent", hd: "cornell.edu" },
          },
        })
      );
    } catch (error) {
      alert("Access denied: Only cornell.edu email accounts are allowed.");
    }

    // if (user && user.email.split("@")[1] !== "cornell.edu") {
    //   // Log out immediately if the email domain is incorrect
    //   await supabase.auth.admin.deleteUser(user);
    //   await supabase.auth.signOut();
    //   alert("Access denied: Only cornell.edu email accounts are allowed.");
    // }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
      error,
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    console.log(error);

    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      {session ? (
        <div>
          <p>Logged in!</p>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
        </div>
      ) : (
        <div className="w-1/2 mx-auto">
          <div
            className="flex flex-row justify-center gap-x-2 border-2 py-3 items-center rounded-lg hover:cursor-pointer hover:bg-slate-100"
            onClick={() => handleSignUp()}
          >
            <FcGoogle className="w-[23px] h-[23px]" />
            <p> Sign in with Google</p>
          </div>

          {/* <Auth
            supabaseClient={supabase}
            onlyThirdPartyProviders={false}
            queryParams={{
              prompt: "consent",
              hd: "cornell.edu",
            }}
            providers={["google"]}
            appearance={{ theme: ThemeSupa }}
          /> */}
        </div>
      )}
    </div>
  );
}
export default SignIn;
