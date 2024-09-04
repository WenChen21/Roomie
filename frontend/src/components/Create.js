import { React, useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Avatar } from "@mui/material";
import Switch from "@mui/material/Switch";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Create = (hide) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [netid, setNetid] = useState("");
  const [age, setAge] = useState(null);
  const [graduationyear, setGraduationYear] = useState(null);
  const [interests, setInterests] = useState(null);
  const [onCampus, setOnCampus] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [pic, setPic] = useState(null);
  const [image, setImage] = useState("");
  const fields = [
    [name, "name"],
    [email, "email"],
    [netid, "netid"],
    [age, "age"],
    [graduationyear, "graduation year"],
    [interests, "interests"],
    [onCampus, "onCampus"],
  ];

  async function handleUser() {
    supabase.auth.getUserIdentities().then((data) => {
      if (data) {
        setName(data.data.identities[0].identity_data.full_name);
        setEmail(data.data.identities[0].identity_data.email);
        setNetid(data.data.identities[0].identity_data.email.split("@")[0]);
      }
    });
  }

  async function handleSubmit() {
    const { error } = await supabase
      .from("profiles")
      .insert({ email: email, name: name, netid: netid, age: age });
    if (error) {
      fields.forEach((field) => {
        if (field[0] === null) console.log(field[1] + " is empty");
      });
    } else {
      const url = `${name}/avatar.png`;
      const { storageerror } = await supabase.storage
        .from("profilepics")
        .upload(url, pic, {
          cacheControl: "3600",
          upsert: false,
        });
      console.log(storageerror);
    }
  }

  const inputStyle =
    "outline-none pl-5 p-4 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50";
  const labelStyle = "mb-1";
  useEffect(() => {
    if (hide.hide) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [hide, hidden]);

  useEffect(() => {
    handleUser();
  }, []);
  return false ? (
    <></>
  ) : (
    <div className="mt-5">
      <div className="">
        <div className=" mx-auto flex justify-center">
          {/* <div className="flex bg-cyan-500 rounded-l-lg justify-center px-3 w-[40%]">
            <div className="flex flex-col justify-center">
              <label htmlFor="pic" className="mb-1 text-center">
                Profile Picture
              </label>
              <div className="flex justify-center py-10">
                <Avatar alt="" src={image} sx={{ width: 64, height: 64 }} />
              </div>
            </div>
          </div> */}
          <div className="flex flex-col bg-cyan-100 pl-5 pr-5 pb-10 pt-10 rounded-lg w-[60%]">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="age" className={labelStyle}>
                  Age
                </label>
                <input
                  className={inputStyle}
                  type="number"
                  id="age"
                  value={age}
                  min={1}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="graduation year" className={labelStyle}>
                  Graduation Year
                </label>
                <input
                  className={inputStyle}
                  type="number"
                  id="graduationyear"
                  value={graduationyear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="interests" className={labelStyle}>
                  Interests
                </label>
                <input
                  className={inputStyle}
                  type="text"
                  id="interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="on/off campus" className={labelStyle}>
                  On/Off Campus
                </label>
                <div className="flex flex-row items-center">
                  <Switch
                    className={inputStyle}
                    checked={onCampus}
                    onChange={() => setOnCampus(!onCampus)}
                  />
                  {onCampus ? <div> On Campus </div> : <div>Off Campus</div>}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <label className={labelStyle}>Profile Picture</label>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Photo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                      setPic(e.target.files[0]);
                    }}
                  />
                </Button>
              </div>
            </div>
            <button
              className="mt-5 bg-indigo-400 mx-auto w-1/2 rounded-lg p-3"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
