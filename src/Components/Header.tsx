import "./Header.css";
function Header({
  handleClick,
  currentShape,
  hanldeImageUpload,
  handleExport,
  handleClear,
}) {
  const headerOptions = [
    {
      title: "Arrow",
    },
    {
      title: "Rectangle",
    },
    {
      title: "Circle",
    },
    {
      title: "line",
    },
  ];
  return (
    <div className="headerContainer">
      <div className="header">
        {headerOptions.map((option, index) => (
          <div
            style={{
              color: currentShape === option.title ? "red" : "white",
            }}
            key={index}
            onClick={() => handleClick(option.title)}
            className="headerText"
          >
            {option.title}
          </div>
        ))}
      </div>
      <div className="headerTextButtonContainer">
        <button onClick={hanldeImageUpload} className="headerTextButton">
          <label htmlFor="imageInput" className="headerTextLabel">
            Image Upload
            <input
              type="file"
              accept="image/*"
              id="imageInput"
              onChange={hanldeImageUpload}
              className="headerImageInput"
            />
          </label>
        </button>
        <button onClick={handleExport} className="headerTextButton">
          Export
        </button>
        <button onClick={handleClear} className="headerTextButton">
          Clear
        </button>
      </div>
    </div>
  );
}

export default Header;
