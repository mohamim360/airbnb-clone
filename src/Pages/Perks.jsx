const Perks = ({ selected, onChange }) => {
  function handleCheck(e) {
    const { checked, name } = e.target;

    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }

  return (
    <div>
      <label className="p-4 border flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCheck} />
        <span>Wifi</span>
      </label>
      <label className="p-4 border flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('pole')}  name="pole" onChange={handleCheck} />
        <span>Swimming pole</span>
      </label>
      <label className="p-4 border flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('food')} name="food" onChange={handleCheck} />
        <span>Good food</span>
      </label>
      <label className="p-4 border flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('prayer')} name="prayer" onChange={handleCheck} />
        <span>Prayer room</span>
      </label>
      <label className="p-4 border flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCheck} />
        <span>Free Parking spot</span>
      </label>
    </div>
  );
};

export default Perks;
