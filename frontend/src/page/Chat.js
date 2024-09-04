import React from "react";
import Nav from "../components/Nav";
import { useState } from "react";

function Chat() {
  const [peopleMessaged, setPeopleMessaged] = useState([]);
  return (
    <div>
      <Nav />
      <div className="w-screen h-[90vh]">
        <div className="flex justify-center h-full">
          <div className="bg-slate-300 w-[80%] h-[90%] py-2 mt-4">
            <div className="flex flex-col">
              {/* vertical column */}
              <div></div>
              {/* messages */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
