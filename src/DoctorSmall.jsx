import React from "react";
import star from "./star.svg";
import { Link } from "react-router-dom";

function DoctorSmall({ doctor }) {
  function countZeros(arr) {
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0) {
        count++;
      }
    }

    return count;
  }
  let count = 0;
  for (let key in doctor.record) {
    count = count + countZeros(doctor.record[key]);
  }
  return (
    <Link to={`/doctor/${doctor.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="doctorsmall">
        <div className="doctorsmall-up">
          <div className="doctorsmall-specialty">{doctor.specialty}</div>
          <div className="doctorsmall-rating">
            {doctor.rating}
            <img src={star} alt="" />
          </div>
        </div>
        <div className="doctorsmall-down">
          <div className="doctorsmall-name">{doctor.name}</div>
          <div className="doctorsmall-count">{count} left</div>
        </div>
      </div>
    </Link>
  );
}

export default DoctorSmall;
