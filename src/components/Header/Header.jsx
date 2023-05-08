import "./Header.css";

const Header = () => {
  return (
    <header>
      <input type="text" name="search" className="search-bar" />
      <button className="search-button">Search</button>
    </header>
  );
};

export default Header;
