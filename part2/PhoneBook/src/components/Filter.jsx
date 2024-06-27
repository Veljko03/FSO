const Filter = ({ showAll, handleShowChange }) => {
  return (
    <div>
      filter shown with <input value={showAll} onChange={handleShowChange} />
    </div>
  );
};

export default Filter;
