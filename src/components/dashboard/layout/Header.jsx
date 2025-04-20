import SearchInput from "../components/SearchInput";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <div>
        <SearchInput />
      </div>
      <div>Botones</div>
    </div>
  );
};

export default Header;
