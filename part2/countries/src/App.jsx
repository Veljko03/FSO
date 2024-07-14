import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import axios from "axios";
import ShowCountry from "./components/County";

const URL = "https://studies.cs.helsinki.fi/restcountries/";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setShowAll] = useState("");

  const hook = () => {
    axios.get(`${URL}/api/all`).then((response) => {
      console.log("response fulfiled");
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const f = countries.filter((country) =>
    country.name.official.includes(search)
  );
  console.log(f);

  const handleShowChange = (event) => {
    console.log(event.target.value);
    setShowAll(event.target.value);
  };
  const showBtn = (click) => {
    setShowAll(click.name.official);
  };

  return (
    <div>
      <Filter search={search} handleShowChange={handleShowChange} />
      <ul>
        <ShowCountry countries={f} showBtn={showBtn} />
      </ul>
    </div>
  );
};

export default App;
