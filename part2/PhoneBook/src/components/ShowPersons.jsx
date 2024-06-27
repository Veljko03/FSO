const Person = ({ name, num }) => {
  return (
    <div>
      {name}, {num}
    </div>
  );
};

const PersonsToShow = ({ toShow }) => {
  return toShow.map((person) => (
    <Person key={person.id} name={person.name} num={person.number} />
  ));
};

export default PersonsToShow;
