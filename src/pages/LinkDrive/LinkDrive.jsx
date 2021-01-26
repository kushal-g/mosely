import React, { useContext, useEffect } from "react";
import "./LinkDrive.css";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/Auth";

function LinkDrive() {
  const { currentUser, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !currentUser) window.location.href = "/";
  }, [loading, currentUser]);

  async function generateLink() {
    const token = await currentUser.getIdToken();
    const result = await fetch(`${process.env.REACT_APP_URL}/auth/link`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    const body = await result.json();
    window.location.href = body.data.authLink;
    console.log(body);
  }

  return (
    <div>
      <Navbar />
      <button className="linkBtn" onClick={generateLink}>
        Link your drive and classroom
      </button>
    </div>
  );
}

export default LinkDrive;
