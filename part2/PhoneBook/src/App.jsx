import { useState } from "react";
import Filter from "./components/Filter";
import PersonForms from "./components/PersonForm";
import PersonsToShow from "./components/ShowPersons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState("");

  const addNote = (event) => {
    event.preventDefault();

    const filteredArr = persons.map((person) => person.name);
    console.log(filteredArr);
    const check = filteredArr.includes(newName);
    console.log(check);
    if (!check) {
      const obj = {
        name: newName,
        id: persons.length + 1,
        number: newNumber,
      };
      setPersons(persons.concat(obj));
      setNewName("");
      setNewNumber("");
    } else {
      alert(newName + " is already added to phonebook");
      setNewName("");
      setNewNumber("");
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
        <PersonsToShow toShow={toShow} />
      </ul>
    </div>
  );
};

export default App;
