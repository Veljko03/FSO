import { useState } from "react";

const Person = ({ name, num }) => {
  return (
    <div>
      {name}, {num}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.id} name={person.name} num={person.number} />
        ))}
      </ul>
    </div>
  );
};

export default App;
