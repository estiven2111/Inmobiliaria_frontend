//! SIRVE

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetPropertiesearchQuery } from "../../redux/RTKquery/propertyApi";

import PropiedadCard from "../../components/recientespublic/PropiedadCard";
import Maps from "../../components/Maps/Maps";
import Filter from "./filter";
import Pagination from "../Pagination";
import Loading from "../../components/Loading";
import BarraVerMapa from "../BarraVerMapa";
import FullMapModal from "../FullMapModal";
import Empty from "../../components/Empty";

import {
  FilterData,
  filterMinMaxProperties,
  filterTipesProperties,
} from "../../redux/landingpage/FilterDataObj.slice";
import MarqueeSEO from "../../components/MarqueeSEO";
import { Helmet } from "react-helmet-async";
import { BsMeta } from "react-icons/bs";

const MarketPlaces = () => {
  const anchoPantalla = window.innerWidth;
  const [pantalla, setPantalla] = useState(anchoPantalla);
  const { filterLanding } = useSelector((state) => state.FilterDataObjSlice);
  const dispatch = useDispatch();

  const [ban, setBan] = useState(0);
  const [activeFilters, setActiveFilters] = useState(0);

  const { data: filterProperty = [], isLoading } =
    useGetPropertiesearchQuery(filterLanding);

  const filtros = filterProperty;
  const fil = filterLanding;
  let filtered;
  if (filterLanding.length > 0) {
    filtered = fil;
  } else {
    filtered = filtros;
  }

  const [showMap, setShowMap] = useState(false);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const [showFullMap, setShowFullMap] = useState(false);

  const toggleFullMap = () => {
    setShowFullMap(!showFullMap);
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialPageNumber = Number(queryParams.get("page")) || 1;
    setCurrentPage(initialPageNumber);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Update the URL with the current page number
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("page", pageNumber.toString());
    navigate({ search: queryParams.toString() });
  };

  const propertiesPerPage = 10;
  const end = currentPage * propertiesPerPage;
  const start = end - propertiesPerPage;
  const displayedProperties = filterProperty.slice(start, end);
  const totalPages = Math.ceil(filterProperty?.length / propertiesPerPage);

  useEffect(() => {
    setPantalla(anchoPantalla);
  }, [anchoPantalla]);

  useEffect(() => {
    const filtrosAplicados = Object.values(filterLanding).filter(
      (el) => el !== "" && el !== false && el !== "Active"
    ).length;
    setActiveFilters(filtrosAplicados);
    dispatch(filterTipesProperties());
    dispatch(filterMinMaxProperties());
  }, [filterLanding]);

  useEffect(() => {
    const handlePopstate = () => {
      const queryParams = new URLSearchParams(location.search);
      const newPageNumber = Number(queryParams.get("page")) || 1;
      setCurrentPage(newPageNumber);
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [location.search]);

  //!-------------------------------------------

  // const anchoPantalla = window.innerWidth;
  // const altoPantalla = window.innerHeight;
  // const [pantalla, setPantalla] = useState(anchoPantalla);

  // const { filterLanding } = useSelector((state) => state.FilterDataObjSlice);
  // const dispatch = useDispatch();

  // const [ban, setBan] = useState(0);
  // const [activeFilters, setActiveFilters] = useState(0);

  // const { data: filterProperty = [], isLoading } =
  //   useGetPropertiesearchQuery(filterLanding);

  // const filtros = filterProperty;
  // const fil = filterLanding;
  // let filtered;
  // if (filterLanding.length > 0) {
  //   filtered = fil;
  // } else {
  //   filtered = filtros;
  // }
  // //! ---------------------->  MAPA
  // const [showMap, setShowMap] = useState(false);

  // const toggleMap = () => {
  //   setShowMap(!showMap);
  // };

  // //! <--------------------------------------

  // //! ---------------------->  MAPA FULL
  // const [showFullMap, setShowFullMap] = useState(false);

  // const toggleFullMap = () => {
  //   setShowFullMap(!showFullMap);
  // };

  // //! <--------------------------------------

  // const navigate = useNavigate();
  // const location = useLocation();

  // const path = window.location.pathname;
  // const queryParams = useMemo(
  //   () => new URLSearchParams(location.search),
  //   [location.search]
  // );
  // const initialPageNumber = Number(queryParams.get("page")) || 1;

  // const [currentPage, setCurrentPage] = useState(initialPageNumber);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const propertiesPerPage = 10;
  // const end = currentPage * propertiesPerPage;
  // const start = end - propertiesPerPage;
  // const displayedProperties = filterProperty.slice(start, end);
  // const totalPages = Math.ceil(filterProperty?.length / propertiesPerPage);

  // //?============================================================

  // useEffect(() => {
  //   setPantalla(anchoPantalla);

  //   // Update the URL with the current page number
  //   queryParams.set("page", currentPage.toString());
  //   navigate({ search: queryParams.toString() });

  //   // Cleanup function to remove the page parameter from the URL when unmounting
  //   return () => {
  //     if (currentPage !== initialPageNumber) {
  //       queryParams.delete("page");
  //       navigate({ search: queryParams.toString() });
  //     }
  //   };
  // }, [anchoPantalla, currentPage, initialPageNumber, navigate, queryParams]);

  // useEffect(() => {
  //   const filtrosAplicados = Object.values(filterLanding).filter(
  //     (el) => el !== "" && el !== false && el !== "Active"
  //   ).length;
  //   setActiveFilters(filtrosAplicados);
  //   dispatch(filterTipesProperties());
  //   dispatch(filterMinMaxProperties());
  // }, [filterLanding]);

  return (
    <div className="pt-28 lg:px-20 px-5  ">
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Arriendos en Bogota | Arriendalo Colombia</title>
            <meta
              name="description"
              content="Arrienda tu apartamento con garantías y protección de pago y daños. Encuentra tu casa en arriendo sin papeleo y sin fiador. apartamentos en arriendo bogotá."
            />
            <link
              rel="canonical"
              href="https://arriendalo.com.co/propiedades"
            />
            <meta
              property="og:description"
              content="Arrienda tu apartamento con garantías y protección de pago y daños. Encuentra tu casa en arriendo sin papeleo y sin fiador. apartamentos en arriendo bogotá."
            />
            <meta property="og:title" content="" />

            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-65YKMC7CT1"
            ></script>
            <script>
              {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
     
       gtag('config', 'G-65YKMC7CT1');
    `}
            </script>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-BCXH8TFTD5"
            ></script>
            <script>
              {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
     
       gtag('config', 'G-BCXH8TFTD5');
    `}
            </script>
          </Helmet>
          <Filter
            toggleMap={toggleMap}
            activeFilters={activeFilters}
            ban={ban}
          />
          <div className="lg:flex flex-row gap-0 lg:gap-5 rounded-xl">
            <div
              className={`lg:w-${
                showMap ? "0" : "3/5"
              } overflow-y-scroll h-[60vh]  rounded-xl`}
            >
              {/* Property card listing section */}
              {showMap ? null : (
                <>
                  <div className="grid justify-center md:grid-cols-2  lg:grid-cols-2  px-3 sm:grid-cols-1 py-2 gap-5">
                    {filtered.length === 0 ? (
                      <div className="flex items-center justify-center">
                        <Empty />
                      </div>
                    ) : (
                      displayedProperties.map((property) => (
                        <PropiedadCard
                          key={property.id_propiedad}
                          propiedad={property}
                        />
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
            {/* <div className={`w-2/5 `}> */}
            {pantalla > 1020 && (
              <div
                className={`w-${showMap ? "full" : "2/5"} lg:block hidden py-2`}
              >
                <Maps />
              </div>
            )}
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

          <div className="lg:hidden block  fixed bottom-0 left-0 z-20 bg-white dark:bg-slate-950 w-full py-5">
            <BarraVerMapa toggleFullMap={toggleFullMap} />
          </div>
        </div>
      )}

      {showFullMap &&
        //! Mirar estilos del mapa
        pantalla <= 1020 && (
          <div className="lg:flex flex-row gap-0 lg:gap-5 rounded-xl">
            <FullMapModal toggleFullMap={toggleFullMap} />
          </div>
        )}
      <MarqueeSEO />
    </div>
  );
};

export default MarketPlaces;
