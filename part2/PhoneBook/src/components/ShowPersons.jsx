const Person = ({ name, num, id, deleteThisPerson }) => {
  return (
    <div>
      {name}, {num} <button onClick={() => deleteThisPerson(id)}>Delete</button>
    </div>
  );
};

const PersonsToShow = ({ toShow, del }) => {
  return toShow.map((person) => (
    <Person
      key={person.id}
      name={person.name}
      num={person.number}
      id={person.id}
      deleteThisPerson={del}
    />
  ));
};

export default PersonsToShow;
