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
    <div style={{ backgroundColor: "black", position: "absolute" }}>
      <h3>Add your Moss ID</h3>
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
