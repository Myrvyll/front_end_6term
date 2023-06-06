import React, { useEffect, useState } from "react";
import DoctorSmall from "./DoctorSmall";

function Home() {
  const [doctors, setDoctors] = useState(false);
  const [doctorsFiltered, setDoctorsFiltered] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const fetchDoctors = () => {
    fetch("https://647f2380c246f166da9027e0.mockapi.io/doctors")
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
        setDoctorsFiltered(data);
      })
      .catch((error) => {
        console.error("Виникла помилка:", error);
      });
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (value) {
      setDoctorsFiltered(() => {
        return doctors.filter((obj) => obj.specialty.includes(value));
      });
    } else {
      setDoctorsFiltered(doctors);
    }
  }, [value]);

  return (
    <div className="home-page">
      <input type="text" value={value} onChange={handleChange} className="my-input" />
      <div className="home">
        {doctorsFiltered ? (
          doctorsFiltered.map((obj) => <DoctorSmall key={obj.id} doctor={obj} />)
        ) : (
          <div className="loading">loading...</div>
        )}
      </div>
    </div>
  );
}

export default Home;
