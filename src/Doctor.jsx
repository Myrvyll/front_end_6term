import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const days = [
  { day: "Monday", code: 1 },
  { day: "Tuesday", code: 2 },
  { day: "Wednesday", code: 3 },
  { day: "Thursday", code: 4 },
  { day: "Friday", code: 5 },
  { day: "Saturday", code: 6 },
];

const hours = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
];

function Doctor() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(false);
  const [isActiveDay, setIsActiveDay] = useState(false);
  const [isActiveHour, setIsActiveHour] = useState(false);

  const navigate = useNavigate();

  const fetchDoctor = () => {
    fetch(`https://647f2380c246f166da9027e0.mockapi.io/doctors/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDoctor(data);
      })
      .catch((error) => {
        console.error("Виникла помилка:", error);
      });
  };
  useEffect(() => {
    fetchDoctor();
  }, []);

  const changeDay = (code) => {
    setIsActiveDay(code);
    setIsActiveHour(false);
  };

  const handleSubmit = async () => {
    const recordArray = doctor.record[isActiveDay - 1];
    const indexNewRecordAtDay = hours.indexOf(isActiveHour);

    let newRecordArray = recordArray;
    newRecordArray[indexNewRecordAtDay] = 1;

    let result = doctor;
    result.record[isActiveDay - 1] = newRecordArray;

    await fetch(`https://647f2380c246f166da9027e0.mockapi.io/doctors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });

    navigate("/");

    window.alert(
      `You have an appointment for ${days[isActiveDay - 1].day} at ${isActiveHour.split(" - ")[0]}`
    );
  };

  return (
    <>
      {doctor ? (
        <div className="doctor">
          <div className="doctor-name">{doctor.name}</div>
          <div className="doctor-specialty">{doctor.specialty}</div>
          <div className="record-block">
            <div className="record-days">
              {days.map((item) => (
                <div
                  className={`record-day ${
                    doctor.record[item.code - 1].includes(0)
                      ? isActiveDay === item.code
                        ? "is-active"
                        : ""
                      : "is-disabled"
                  }`}
                  key={item.day}
                  onClick={
                    isActiveDay
                      ? doctor.record[item.code - 1].includes(0)
                        ? () => changeDay(item.code)
                        : () => {}
                      : () => changeDay(item.code)
                  }
                >
                  {item.day}
                </div>
              ))}
            </div>
            <div className="record-hours">
              {hours.map((item, ind) => (
                <div
                  className={`record-hour ${
                    isActiveDay
                      ? doctor.record[isActiveDay - 1][ind] === 0
                        ? isActiveHour === item
                          ? "is-active"
                          : ""
                        : "is-disabled"
                      : ""
                  }`}
                  key={item}
                  onClick={
                    isActiveHour
                      ? isActiveDay && doctor.record[isActiveDay - 1][ind] === 0
                        ? () => setIsActiveHour(item)
                        : () => {}
                      : () => setIsActiveHour(item)
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <button className="record-submit" onClick={handleSubmit} disabled={!isActiveDay || !isActiveHour}>
            record
          </button>
        </div>
      ) : (
        <div className="loading">loading...</div>
      )}
    </>
  );
}

export default Doctor;
