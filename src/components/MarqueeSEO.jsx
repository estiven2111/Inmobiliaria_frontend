import Marquee from "react-fast-marquee";
import { Link, useNavigate } from "react-router-dom";
import { useGetPropertiesearchQuery } from "../redux/RTKquery/propertyApi";
import { useDispatch, useSelector } from "react-redux";
import { FilterData } from "../redux/landingpage/FilterDataObj.slice";

const MarqueeSEO = () => {
  const { filterLanding } = useSelector((state) => state.FilterDataObjSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: filterProperty = [], isLoading } =
    useGetPropertiesearchQuery(filterLanding);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    navigate("/propiedades");
  };

  const onClickHandler = (e) => {
    const { name, value } = e.currentTarget;
    const updatedFilterLanding = {
      ...filterLanding,
      [name]: value,
    };
    dispatch(FilterData(updatedFilterLanding));
  };
  return (
    <div className="pt-10">
      <h1 className="font-bold text-3xl py-5">Lo mas buscado...</h1>
      <div className="py-1 cursor-pointer">
        <Marquee
          pauseOnHover
          direction="right"
          speed={25}
          //   gradient={true}

          gradientColor={[241, 245, 249]}
          gradientWidth={50}
        >
          <form onSubmit={onSubmitHandler}>
            <div className="flex gap-3">
              <Link to={"/propiedades"} target="_blanck">
                <button className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline">
                  arriendalo
                </button>
              </Link>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartaestudio"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartaestudio en arriendo en Bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="casa"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                casa en arriendo en Bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamento"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamento en arriendo
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamento"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo bogotá economicos
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="bogotá"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo directamente con el dueño bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartaestudio"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartaestudio en arriendo
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="bogotá"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                arriendos bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartaestudio"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartaestudio arriendo bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamentos"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo bogotá
              </button>
              <div></div>
            </div>
          </form>
        </Marquee>
      </div>
      <div className="py-1 cursor-pointer">
        <Marquee pauseOnHover direction="left" speed={25}>
          <form onSubmit={onSubmitHandler}>
            <div className="flex gap-3">
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamento"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl"
              >
                arriendo apartamento
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="bogotá"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl"
              >
                apartamento en arriendo en bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="casa"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                casa en arriendo en Bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamento"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamento en arriendo
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="bogotá"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo bogotá economicos
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamentos"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo directamente con el dueño bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartaestudio"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartaestudio en arriendo
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="bogotá"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                arriendos bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartaestudio"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartaestudio arriendo bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamentos"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo bogotá
              </button>
              <div></div>
            </div>
          </form>
        </Marquee>
      </div>
      <div className="py-1 cursor-pointer">
        <Marquee pauseOnHover direction="right" speed={25}>
          <form onSubmit={onSubmitHandler}>
            <div className="flex gap-3">
              <Link to="/propiedades">
                <button
                  name="search"
                  onClick={onClickHandler}
                  value=""
                  className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl"
                >
                  arriendalo
                </button>
              </Link>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartaestudio"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl"
              >
                apartaestudio en arriendo en Bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="casa"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                casa en arriendo en Bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamento"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamento en arriendo
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="bogotá"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo bogotá economicos
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamentos"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo directamente con el dueño bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartaestudio"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartaestudio en arriendo
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="bogotá"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                arriendos bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartaestudio"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartaestudio arriendo bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="bogotá"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo bogotá
              </button>
              <div></div>
            </div>
          </form>
        </Marquee>
      </div>
      <div className="py-1 cursor-pointer">
        <Marquee pauseOnHover direction="left" speed={25}>
          <form onSubmit={onSubmitHandler}>
            <div className="flex gap-3">
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamento"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl"
              >
                arriendo apartamento
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamento"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl"
              >
                apartamento en arriendo en bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="Bogotá"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                casa en arriendo en Bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamento"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamento en arriendo
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="bogotá"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo bogotá economicos
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamentos"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo directamente con el dueño bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartaestudio"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartaestudio en arriendo
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="bogotá"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                arriendos bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartaestudio"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartaestudio arriendo bogotá
              </button>
              <button
                name="search"
                onClick={onClickHandler}
                value="apartamentos"
                className="dark:bg-slate-700 bg-neutral-300 py-2 px-3 rounded-xl hover:underline"
              >
                apartamentos en arriendo bogotá
              </button>
              <div></div>
            </div>
          </form>
        </Marquee>
      </div>
    </div>
  );
};

export default MarqueeSEO;
