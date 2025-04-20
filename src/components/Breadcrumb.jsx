import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  let currentPage = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, i) => {
      currentPage = +`/${crumb}`;

      return (
        <div key={i}>
          <Link to={currentPage}>{crumb}</Link>
        </div>
      );
    });

  return <div className="mt-28 h-10 w-full bg-slate-400">{crumbs}</div>;
};

export default Breadcrumb;
