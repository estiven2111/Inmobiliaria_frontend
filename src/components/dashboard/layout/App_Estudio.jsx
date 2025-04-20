import TomadorData from "../components/TomadorData";
import { FaWpforms } from "react-icons/fa";
import FormStatusEdit from "../components/FormStatusEdit";
import { Link, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

const App_Estudio = () => {
  return (
    <div className="flex flex-row bg-slate-800 overflow-y-scroll hide-scrollbar">
      <SideBar />
      <div className="flex-1">
        <div className="bg-blue-100 ">
          <Header />
        </div>
        <div className="p-4 flex-grow overflow-y-scroll hide-scrollbar">
          {" "}
          {<Outlet />}{" "}
        </div>
      </div>
    </div>
  );
};

export default App_Estudio;
// import { Admin, Resource, ListGuesser } from "react-admin";

// import { customDataProvider } from "./dataProvider/customDataProvider";
// import TomadorData from "./TomadorData";
// import { FaWpforms } from "react-icons/fa";
// import FormStatusEdit from "./FormStatusEdit";

// const App_Estudio = () => {
//   return (
//     <Admin dataProvider={customDataProvider}>
//       <Resource name="formulario" list={TomadorData} edit={FormStatusEdit} />
//     </Admin>
//   );
// };

// export default App_Estudio;
