import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForms from "./components/PersonForm";
import PersonsToShow from "./components/ShowPersons";
import axios from "axios";
import phoneServices from "./components/Services";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState("");

  const promise = axios.get("http://localhost:3001/persons");
  console.log(promise);
  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("response fulfiled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();

    const filteredArr = persons.map((person) => person.name);
    console.log(filteredArr);
    const check = filteredArr.includes(newName);
    console.log(check);
    if (!check) {
      const obj = {
        name: newName,

        number: newNumber,
      };
      phoneServices.create(obj).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    } else {
      alert(newName + " is already added to phonebook");
      setNewName("");
      setNewNumber("");
    }
  };

  const personDelate = (id) => {
    if (window.confirm("Do you really want to delete this number?")) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => setPersons(persons.filter((p) => p.id !== id)));
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleShowChange = (event) => {
    console.log(event.target.value);
    setShowAll(event.target.value);
  };

  const toShow =
    showAll == ""
      ? persons
      : persons.filter((person) => person.name.includes(showAll));

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter showAll={showAll} handleShowChange={handleShowChange} />

      <PersonForms
        addNote={addNote}
        handleChange={handleChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <ul>
        <PersonsToShow toShow={toShow} del={personDelate} />
      </ul>
    </div>
  );
};

export default App;
