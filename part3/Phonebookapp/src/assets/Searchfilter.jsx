const Searchfilter = ({ newSearch, handleSearch }) => {
  return (
    <div>
      filter by: <input 
        value={newSearch}
        onChange={handleSearch}
      />
    </div>
  )
}

export default Searchfilter
