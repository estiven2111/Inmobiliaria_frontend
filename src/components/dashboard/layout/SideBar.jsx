import { Link, useLocation } from "react-router-dom";
import { logowhite } from "../../../assets";
import { DASHBOARD_LINKS } from "../lib/data/Data";

const SideBar = () => {
  return (
    <div className="flex flex-col w-60 p-3 bg-slate-950 ">
      <div className="">
        <img src={logowhite} alt="logo" className="w-72 h-14" />
      </div>
      <div className="flex-1 py-5">
        {DASHBOARD_LINKS.map((link) => (
          <SideBarLinks link={link} key={link.key} />
        ))}
      </div>
      <div>bottom</div>
    </div>
  );
};

export default SideBar;

const SideBarLinks = ({ link }) => {
  const { pathname } = useLocation();


  return (
    <div>
      <Link
        className={`${
          pathname === link.path ? "bg-neutral-100/30 " : null
        } flex items-center w-full rounded-lg px-2 py-2 justify-start gap-3 text-white   font-semibold`}
        to={link.path}
      >
        <span className="text-xl">{link.icon}</span>
        <span className="hover:text-lightblueone/80 duration-200">
          {link.label}
        </span>
      </Link>
      <hr className=" h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
    </div>
  );
};
