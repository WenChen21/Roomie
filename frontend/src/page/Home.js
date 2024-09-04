import React from "react";
import Nav from "../components/Nav";
import roommate from "../images/roommate.png";

function Home() {
  return (
    <div className="h-full">
      <Nav />
      <div className="px-[11.458333333%] flex flex-row w-full py-[7%]">
        <div className="pr-[15.2777778%] w-1/2">
          <p className="text-5xl pb-6">Looking for Roommates?</p>
          <p className="text-md">
            Roomie is a platform that connects you to other Cornellians who are
            also searching for roommates.
          </p>
          <div className="pt-[5%] flex items-center">
            <button className="px-[20px] py-[12px] bg-blue-700 text-white">
              Sign Up
            </button>
            <p className="pl-[20px]"> Join today!</p>
          </div>
        </div>
        <div className="w-1/2">
          <img
            className="w-[555px]"
            src={roommate}
            alt="people thinking of a house"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
