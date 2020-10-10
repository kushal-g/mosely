import React from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../../../Hooks/useLocalStorage";
import randomColor from "randomcolor";
import "./CourseCard.css";

export default function CourseCard(props) {
  const [cardColor, setCardColor] = useLocalStorage(
    props.details.id,
    randomColor({
      luminosity: "dark",
      format: "rgba",
      alpha: 0.75,
    })
  );

  return (
    <div className="card">
      <Link
        style={{ textDecoration: "none" }}
        to={{
          pathname: `/course/assignment/${props.details.id}`,
          state: { course: props.details, label: props.label },
        }}
      >
        <div
          style={{
            backgroundColor: cardColor,
          }}
          className="top"
        >
          <div className="courseName">{props.details.name}</div>
          <div className="courseSection">
            {props.details.section ? props.details.section : " "}
          </div>
          <div className="courseTeacher">
            {props.details.teacherInfo.name.fullName}
          </div>
        </div>
      </Link>
      <div className="bottom">
        <img
          className="teacherImg"
          src={
            props.details.teacherInfo.photoUrl[0] === "/"
              ? "https:" + props.details.teacherInfo.photoUrl
              : props.details.teacherInfo.photoUrl
          }
        ></img>
      </div>
    </div>
  );
}
