import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForms from "./components/PersonForm";
import PersonsToShow from "./components/ShowPersons";
import axios from "axios";
import phoneServices from "./components/Services";
import "./index.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification">{message}</div>;
};
const Error = ({ message }) => {
  if (message == "") {
    return null;
  }
  return <div className="err">{message}</div>;
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState("");
  const [notification, setNotification] = useState(null);
  const [err, setErr] = useState("");

  const promise = axios.get("http://localhost:3001/api/persons");
  console.log(promise);
  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/api/persons").then((response) => {
      console.log("response fulfiled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();

    const filteredArr = persons.map((person) => person.name);

    const check = filteredArr.includes(newName);

    if (!check) {
      const obj = {
        name: newName,

        number: newNumber,
      };

      setNotification(`${newName} is added in phoneBook`);
      setTimeout(() => {
        setNotification(null);
      }, 2000);
      phoneServices.create(obj).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName("");
        setNewNumber("");
      });
    } else {
      if (
        window.confirm(
          `${newName} allredy added to phonebook, replace old number with new one?`
        )
      ) {
        const filtered = persons.filter((x) => x.name == newName);
        const changedObj = { ...filtered[0], number: newNumber };
        const id = filtered[0].id;
        console.log(id);
        phoneServices
          .change(id, changedObj)
          .then((returnedPerson) => {
            setPersons(
              persons.map((n) => (n.id !== id ? n : returnedPerson.data))
            );
          })
          .catch(() => {
            setErr(
              `Information of ${newName} has been already been removed from server`
            );
          });
      }

      setNewName("");
      setNewNumber("");
    }
  };

  const personDelate = (id) => {
    if (window.confirm("Do you really want to delete this number?")) {
      phoneServices
        .delatePhoneNum(id)
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
      <Notification message={notification} />
      <Error message={err} />

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
