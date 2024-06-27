const PersonForms = ({
  addNote,
  newName,
  newNumber,
  handleChange,
  handlePhoneChange,
}) => {
  return (
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
  );
};

export default PersonForms;
