import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Create from "../components/Create";
import supabase from "../config/supabaseClient";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [netid, setNetid] = useState("");
  const [age, setAge] = useState(null);
  const [hide, setHide] = useState(false);
  const [loading, setLoading] = useState(true);
  function getUserEmail() {
    const value = supabase.auth.getUser().then(({ data, error }) => {
      if (error) {
        console.log(error);
        return null;
      } else {
        return data.user.email;
      }
    });
    return value;
  }

  useEffect(() => {
    fetchUserData();
    async function fetchUserData() {
      const email = await getUserEmail()
        .then((result) => {
          return result; // Handle the resolved value
        })
        .catch((error) => {
          return null; // Handle any error
        });
      if (email) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", email);
        if (error) {
          console.log(error);
          setHide(false);
          setLoading(false);
        } else if (data.length !== 0) {
          setHide(true);
          setLoading(false);
          setEmail(data.email);
          setAge(data.age);
          setName(data.name);
          setNetid(data.netid);
        } else {
          setHide(false);
          setLoading(false);
        }
      }
    }
  }, []);
  return (
    <div>
      <Nav />
      <div className=" ml-10 mr-10 mt-5 ">
        <p className="flex justify-center">Welcome to your Profile</p>

        {loading ? <p>Loading</p> : <Create hide={hide} />}
      </div>
    </div>
  );
}

export default Profile;
