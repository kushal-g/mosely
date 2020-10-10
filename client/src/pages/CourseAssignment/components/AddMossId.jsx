import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/Auth";
import "./AddMossId.css";

export default function AddMossId() {
  const { currentUser, loading } = useContext(AuthContext);
  const { moss, setMoss } = useState("");
  async function addMoss() {
    const token = await currentUser.getIdToken();
    const result = await fetch(`${process.env.REACT_APP_URL}/moss/id/update`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: {
        mossId: moss,
      },
    });

    const body = await result.json();
    console.log(body);
  }
  return (
    <div className="moss_id_input_container">
      <p>If you'd like to see the plagiarism report for this assignment, kindly enter your MOSS ID or ask some other teacher who is part of this course to do so.</p>
      <input
        type="text"
        onChange={(event) => setMoss(event.target.value)}
        value={moss}
      />
      <button type="submit" onSubmit={addMoss}>
        Submit
      </button>
    </div>
  );
}
