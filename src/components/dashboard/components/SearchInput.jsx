import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchFormularios } from "../../../redux/admin_dashboard/estudioDatacredito.slice.js";
import { BiSearchAlt } from "react-icons/bi";

const SearchInput = () => {
  const [email, setEmail] = useState(""); // Only using email

  const dispatch = useDispatch();

  useEffect(() => {
    if (email.trim() !== "") {
      dispatch(searchFormularios({ email: email })); // Trigger search when email changes
    }
  }, [email, dispatch]);

  return (
    <div className="relative ">
      <input
        name="email"
        className="w-64 py-2 pl-10 pr-5 bg-transparent rounded-full border-[1px] ring-gray-300"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => dispatch(searchFormularios({ email: email }))}
        placeholder="Busca por email"
      />
      <BiSearchAlt
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-5 h-5"
        aria-hidden="true"
      />
    </div>
  );
};

export default SearchInput;
