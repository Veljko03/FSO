import axios from "axios";
import { useState, useEffect } from "react";

const CountryBody = ({ name, showIt }) => {
  return (
    <div>
      {name}
      <button onClick={showIt}>show</button>
    </div>
  );
};

const OneCountry = ({ languages }) => {
  const l = Object.values(languages);

  return l.map((len) => <p key={len}>{len}</p>);
};

const ShowCountry = ({ countries, showBtn }) => {
  const key = "408692695547b7cd1be9065d4dad0c79";
  const apiCall =
    "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";

  if (countries.length == 1) {
    const [temp, setTemp] = useState(0);
    const [pic, setPic] = useState("");
    const [des, setDes] = useState("");

    const hook = () => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${countries[0].latlng[0]}&lon=${countries[0].latlng[1]}&appid=${key}`
        )
        .then((respose) => {
          const t = parseInt(respose.data.main.temp) - 273;

          console.log("temperature ", respose.data);
          console.log("does it work? ");
          setTemp(t);
          setPic(
            `https://openweathermap.org/img/wn/${respose.data.weather[0].icon}@2x.png`
          );
          setDes(respose.data.weather[0].description);
        });
    };
    useEffect(hook, []);
    return (
      <div>
        <h3>{countries[0].name.official}</h3>
        <p>{"Capital: " + countries[0].capital}</p>
        <b>languages:</b>

        <OneCountry languages={countries[0].languages} />

        <img src={countries[0].flags.png} alt="pictureOfcountry" />

        <h3>Weather in {countries[0].capital}</h3>
        <p>temperature: {temp}</p>
        <img src={pic} alt="pic of the weather" />
        <p>{des}</p>
      </div>
    );
  } else if (countries.length <= 10) {
    return countries.map((country) => (
      <CountryBody
        key={country.name.official}
        name={country.name.official}
        showIt={() => showBtn(country)}
      />
    ));
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

export default ShowCountry;
