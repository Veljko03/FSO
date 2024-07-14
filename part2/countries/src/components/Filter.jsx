const Filter = ({ search, handleShowChange }) => {
  return (
    <div>
      find countries <input value={search} onChange={handleShowChange} />
    </div>
  );
};

export default Filter;
