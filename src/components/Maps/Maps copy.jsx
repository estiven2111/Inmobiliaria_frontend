/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import logo from "../../../public/logo.png";
import ventana from "../../../public/ventana_map.png";
// import { MdCalendarMonth } from "react-icons/md";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import ReactDOMServer from "react-dom/server";
import { MdSchool } from "react-icons/md";
import { FaRegHospital } from "react-icons/fa";
import { BiChurch } from "react-icons/bi";
import Slide from "../recientespublic/Slide";
import MapSlide from "./MapSlide";
import ReactDOM, { createRoot } from "react-dom";
import PropiedadCard from "../recientespublic/PropiedadCard";
import AgendarVisitaBarra from "../detail/AgendarVisitaBarra";
import AgendarVisitaMap from "./AgendarVisitaMap";
import VerDetalle from "./VerDetalle";
import { useGetAllPropertiesQuery } from "../../redux/RTKquery/propertyApi";
import { ThemeContext } from "../../context/themeContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { tokensmaps } from "../../redux/landingpage/FilterDataObj.slice";
// AIzaSyAY3zPk-r72ELJTbepL7koVfZ6XgrE63dY
function Maps() {
  const { data: properties = [], isLoading } = useGetAllPropertiesQuery();
  const [locationError, setLocationError] = useState(false);
  const [filtro, setFiltro] = useState({
    name: "",
    radio: 500,
  });
  const [propertiesLocal, setPropertiesLocal] = useState([]);
//  const dispatch = useDispatch()
//  const [keyMaps,setKeyMaps] = useState()
// const { keys } = useSelector((state) => state.FilterDataObjSlice);
 
  const { theme } = useContext(ThemeContext);
  let ban = 0;
  let propiedades;
  // let key
  useEffect(() => {
    const execute = async () => {
      //  key = await dispatch((tokensmaps()))
      const propiedad = await axios.get("/property/all");
      setPropertiesLocal(propiedad.data);
      propiedades = propiedad.data;
      ban++;
      handlerproperties(propiedades, ban);
    };
    execute();
  }, []);

  const handlerproperties = (propiedad, ban) => {
    if (propiedad && ban === 1) {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src =
        // "https://maps.googleapis.com/maps/api/js?key=AIzaSyAnFS0Lau3P23hTkDA9nzajVKlfAyppYW8&callback=initMap&v=weekly";
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyAnFS0Lau3P23hTkDA9nzajVKlfAyppYW8&callback=initMap`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      window.document.body.appendChild(googleMapsScript);
      window.initMap = initMap;
      googleMapsScript.addEventListener("load", () => {
        initMap();
      });
    }
  };
  const initMap = () => {
    const lightModeStyles = [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "landscape",
        stylers: [
          { visibility: "on" },
          // { hue: "#000" }, // Change the hue to black (#000000)
          // { gamma: 1.5 },
        ],
      },

      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [{ visibility: "on" }],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "on" }],
      },
    ];

    const darkModeStyles = [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
          { visibility: "on" },
          // { color: "#000000" }, // Set the color to black (#000000)
          { color: theme === "dark" ? "#242928" : null },
        ],
      },
      {
        featureType: "administrative",
        elementType: "labels.text.fill",
        stylers: [
          { visibility: "on" },
          { color: theme === "dark" ? "#fffff" : "#00000" },
        ],
      },
      {
        featureType: "administrative",
        elementType: "labels.text.stroke",
        stylers: [
          { visibility: "on" },
          { color: theme === "dark" ? "#00000" : "#fffff" },
        ],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "on" }],
      },
    ];

    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: new window.google.maps.LatLng(4.6486206, -74.2726206),
      zoom: 8,
      disableDoubleClickZoom: true,
      minZoom: 5,
      maxZoom: 18,
      styles: theme === "dark" ? darkModeStyles : lightModeStyles,
      mapTypeControl: false,
      streetViewControl: false,
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: "",
      disableAutoPan: true,
    });

    const labels = propiedades.map((propie) => {
      // Mapea las propiedades a los labels correspondientes
      return {
        petfriendly: propie.petfriendly,
        amoblado: propie.amoblada, //! la propiedad llega como amoblada
        exclusivo: propie.exclusivo,
        titulo: propie.titulo,
        codigo: propie.codigo,
        habitaciones: propie.habitaciones,
        garajes: propie.garajes,
        baños: propie.baños,
        estrato: propie.strato,
        metros_cuadrados: propie.metros_cuadrados,
        tipo: propie.tipo,
        barrio: propie.barrio,
        img: propie.imagenes,
        id: propie.codigo,
        precio_pesos: propie.precio_arriendo,
        precio: propie.precio.toString(),
        whatsapp: propie.whatsapp,
      };
    });
    const markers = propiedades.map((propie) => {
      const position = {
        lat: parseFloat(propie.latitud),
        lng: parseFloat(propie.longitud),
      };

      const label = labels.find((label) => label.codigo === propie.codigo);

      //!MARKER CON PRECIOS
      const precioAbreviado = (precio) => {
        if (precio >= 1000000) {
          return precio / 1000000 + "" + "M";
        } else if (precio >= 100000) {
          return precio / 1000 + "" + "K";
        } else {
          return precio.toString();
        }
      };

      const marker = new window.google.maps.Marker({
        position,
        icon: {
          url: "https://img.icons8.com/?size=512&id=Pn4yp7YyfKY2&format=png",
          scaledSize: new window.google.maps.Size(45, 30),
        },

        label: {
          text: precioAbreviado(label.precio),
          fontWeight: "bold",
          paddingBottom: "2",
          fontFamily: "Arial, sans-serif",
          color: "#fff", // Color del texto
          fontSize: "13px", // Tamaño de fuente
        },
      });

      marker.addListener("click", () => {
        //     infoWindow.setContent(`
        //   <div">
        //     ${ReactDOMServer.renderToString(<Slide slide={label.img} propiedad={label}/>)}
        //   </div>
        // `);

        infoWindow.setContent(`<div id="map-slide-container"></div>`);

        infoWindow.addListener("domready", () => {
          ReactDOM.render(
            <div>
              <MapSlide propiedad={label} slide={label.img} />
              <div id="map-info-button">
                <div id="agendar-visita-link">
                  <a>
                    <AgendarVisitaMap />
                  </a>
                </div>
                <div id="ver-mas">
                  <a>
                    <VerDetalle />
                  </a>
                </div>
              </div>
            </div>,

            document.getElementById("map-slide-container"),
            () => {
              const container = document.getElementById("map-slide-container");
              container.style.width = "150px";
              container.style.height = "245px";
              const vermas = document.getElementById("map-info-button");
              vermas.style.display = "flex";
              vermas.style.justifyContent = "space-evenly";
              vermas.style.alignItems = "center";
              vermas.style.gap = "5px";

              const agendarVisitaLink = document.getElementById(
                "agendar-visita-link"
              );
              if (agendarVisitaLink) {
                agendarVisitaLink.addEventListener(
                  "click",
                  handleVisitaLinkClick
                );
              }

              const linkVerDetalleElement =
                document.querySelector("#ver-mas a");
              if (linkVerDetalleElement) {
                linkVerDetalleElement.addEventListener(
                  "click",
                  handleVerDetalleLinkClick
                );
              }
            }
          );
        });
        const handleVisitaLinkClick = (e) => {
          e.preventDefault();
          const agendarRoute = label.whatsapp;
          window.location.href = agendarRoute; // Navigate to the route
          window.open(agendarRoute, "_blank"); // Open in a new tab
        };

        const handleVerDetalleLinkClick = (e) => {
          e.preventDefault();
          const detailRoute = `/propiedades/${label.codigo}`;
          window.location.href = detailRoute; // Navigate to the route
          window.open(detailRoute, "_blank"); // Open in a new tab
        };
        infoWindow.open(map, marker);
      });

      return marker;
    });
    new MarkerClusterer({ map, markers });
  };

  const handleradio = (e) => {
    setFiltro({ ...filtro, radio: e.target.value });
  };
  const handlefiltro = (name) => {
    setFiltro({ ...filtro, name });
  };
  //! *****************************

  return (
    <div>
      <div className="hidden justify-between items-center py-5 gap-2">
        <div className="flex gap-4">
          <button
            className="flex items-center justify-center gap-3 border-[1px] py-2 px-3 border-gray-200 rounded-full hover:bg-slate-300/40"
            onClick={() => handlefiltro("school")}
          >
            <MdSchool className="text-lg" />
            Educacion
          </button>
          <button
            className="flex items-center justify-center gap-3 border-[1px] py-2 px-3 border-gray-200 rounded-full hover:bg-slate-300/40"
            onClick={() => handlefiltro("hospital")}
          >
            <FaRegHospital className="text-lg" /> Salud
          </button>
          <button
            className="flex items-center justify-center gap-3 border-[1px] py-2 px-3 border-gray-200 rounded-full hover:bg-slate-300/40"
            onClick={() => handlefiltro("church")}
          >
            <BiChurch className="text-lg" />
            Iglesias
          </button>
        </div>
        {/* <input
          value={filtro.radio}
          onChange={handleradio}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="radios"
        ></input> */}
      </div>

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {locationError ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
              cursor: "help",
            }}
          >
            <p className="mb-10">
              No se pudo proporcionar una ubicación de referencia {":("}
            </p>
          </div>
        ) : (
          <div
            id="map"
            className="rounded-xl"
            style={{ width: "100%", height: "60vh" }}
          />
        )}
      </div>
    </div>
  );
}
export default Maps;
