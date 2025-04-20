/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import logo from "../../../public/logo.png";
import { MdCalendarMonth, MdSchool } from "react-icons/md";
import { BiChurch } from "react-icons/bi";
import { FaRegHospital } from "react-icons/fa";

import { ThemeContext } from "../../context/themeContext";

import {
  alfiler,
  blueicon,
  filtroicon,
  redpoint,
  location3d,
} from "../../assets";
import { BsBusFrontFill } from "react-icons/bs";
import { IoBusOutline, IoStorefrontOutline } from "react-icons/io5";
import clavekey from "./clavekey";

// AIzaSyAY3zPk-r72ELJTbepL7koVfZ6XgrE63dY
function Maps({ latitud, longitud }) {
  const [locationError, setLocationError] = useState(false);

  const [activeFilter, setActiveFilter] = useState(null);

  const handlefiltro = (name) => {
    setActiveFilter(name);

    initmap(name);
  };

  const { theme } = useContext(ThemeContext);
  let ban = 0;
  useEffect(() => {
    ban++;
    handlegoogle();
  }, []);

  const handlegoogle = () => {
    if (ban === 1) {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${clavekey.mapkey}&callback=initMap&libraries=places`;
       googleMapsScript.async = true;
      googleMapsScript.defer = true;

      window.document.head.appendChild(googleMapsScript);
      try {
        window.initmap = initmap;
        googleMapsScript.addEventListener("load", () => {
          initmap();
          googleMapsScript.src = ""
        });
      } catch (error) {
        setLocationError(true);
      }
    }
  };

  const initmap = (name) => {
    const mapOptions = {
      center: new window.google.maps.LatLng(latitud, longitud),
      zoom: 16,
      disableDoubleClickZoom: true,
      minZoom: 14, // min 5
      maxZoom: 0, //max 16
      styles: [
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
          stylers: [{ visibility: "0ff" }],
        },
        // {
        //   featureType: "landscape",
        //   stylers: [
        //     { visibility: "on" },
        //     { hue: "#00FF00" },
        //     { gamma: 1.5 },
        //   ],
        // },
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
          featureType: "administrative.locality",
          elementType: "labels",
          stylers: [{ visibility: "on" }], //! ALEJAR PARA QUE SE VEAN
        },

        // {
        //   featureType: "poi",
        //   elementType: "bus.station",
        //   stylers: [{ visibility: "on" }],
        // },
        {
          featureType: "poi.park",
          elementType: "labels",
          stylers: [{ visibility: "on", color: "#0c0d0d" }],
        },

        // {
        //   featureType: "natural",
        //   elementType: "geometry",
        //   stylers: [{ color: "#39ae0f" }], // Replace #00ff00 with your desired color
        // },
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
        {
          featureType: "road.local",
          elementType: "geometry.fill",
          stylers: [{ color: theme === "dark" ? "#3d4043" : null }],
        },
        {
          featureType: "road.arterial", //3d4043 --- light #b2dff5
          elementType: "geometry",
          stylers: [{ color: theme === "dark" ? "#3d4043" : "#b2dff5" }], // Replace #ff0000 with your desired color
        },
      ],
      mapTypeControl: false,
      streetViewControl: false,
    };

    const mapInstance = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );

    const destination = new window.google.maps.LatLng(latitud, longitud);

    const placesService = new window.google.maps.places.PlacesService(
      mapInstance
    );

    //todo filtrado de ubicaciones
    if (name !== undefined) {
      const request = {
        location: destination,
        radius: 500, // METROS A LA REDONDA
        type: name, // ESPECIFICAR QUE QUIERO AL REDEDOR
      };
      let closewindow = null;
      placesService.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // Create markers for each nearby hospital
          let placeMarker;
          for (let i = 0; i < results.length; i++) {
            const place = results[i];
            placeMarker = new window.google.maps.Marker({
              animation: window.google.maps.Animation.DROP,
              position: place.geometry.location,
              map: mapInstance,
              title: place.name,
              icon: {
                //! filtros markers
                url: "https://img.icons8.com/?size=512&id=qspUU6rTLYIZ&format=png",
                scaledSize: new window.google.maps.Size(15, 15),
              },
            });

            // Create info window for each marker
            const infowindow = new window.google.maps.InfoWindow();

            window.google.maps.event.addListener(
              placeMarker,
              "click",
              function () {
                if (closewindow) {
                  closewindow.close();
                  closewindow = null;
                }
                infowindow.setContent(
                  "<strong><span style='color: black;'>" +
                    place.name +
                    "</span></strong><br>"
                );

                infowindow.open(mapInstance, this);
                closewindow = infowindow;
              }
            );

            window.google.maps.event.addListener(
              mapInstance,
              "click",
              function () {
                if (closewindow) {
                  closewindow.close();
                  closewindow = null;
                }
              }
            );
          }

          //************* */
        }
      });
    }
    // Crea sombreado dentro del radio de búsqueda
    const circleOptions = {
      strokeColor: "#0000FF",
      strokeOpacity: 0.2,
      strokeWeight: 2,
      fillColor: "#0000FF",
      fillOpacity: 0.1,
      map: mapInstance,
      center: destination,
      radius: 100, // Radio en metros
    };
    new window.google.maps.Circle(circleOptions);
  };

  //! *****************************

  return (
    <div className=" gap-4 ">
      <div className="flex  justify-center items-center py-5 gap-2">
        <div className="flex  gap-4 overflow-x-auto hide-scrollbar ">
          <button
            // className="flex items-center justify-center gap-3 border-[1px] py-2 px-3 border-gray-200 rounded-full hover:bg-slate-300/40"
            className={`flex items-center justify-center gap-3 border-[1px] py-2 px-3 border-gray-200 rounded-full hover:bg-slate-300/40 ${
              activeFilter === "school" ? "bg-slate-300/40" : ""
            }`}
            onClick={() => handlefiltro("school")}
          >
            <MdSchool className="text-lg" />
            Educacion
          </button>
          <button
            className={`flex items-center justify-center gap-3 border-[1px] py-2 px-3 border-gray-200 rounded-full hover:bg-slate-300/40 ${
              activeFilter === "hospital" ? "bg-slate-300/40" : ""
            }`}
            onClick={() => handlefiltro("hospital")}
          >
            <FaRegHospital className="text-lg" /> Salud
          </button>
          <button
            className={`flex items-center justify-center gap-3 border-[1px] py-2 px-3 border-gray-200 rounded-full hover:bg-slate-300/40 ${
              activeFilter === "church" ? "bg-slate-300/40" : ""
            }`}
            onClick={() => handlefiltro("church")}
          >
            <BiChurch className="text-lg" />
            Iglesias
          </button>
          <button
            className={`flex items-center justify-center gap-3 border-[1px] py-2 px-3 border-gray-200 rounded-full hover:bg-slate-300/40 ${
              activeFilter === "transit_station" ? "bg-slate-300/40" : ""
            }`}
            onClick={() => handlefiltro("transit_station")}
          >
            {/* <BsBusFrontFill className="text-lg" /> */}
            <IoBusOutline className="text-lg" />
            Transporte
          </button>
          <button
            className={`flex items-center justify-center gap-3 border-[1px] py-2 px-3 border-gray-200 rounded-full hover:bg-slate-300/40 ${
              activeFilter === "store" ? "bg-slate-300/40" : ""
            }`}
            onClick={() => handlefiltro("store")}
          >
            <IoStorefrontOutline className="text-lg" />
            Tiendas
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
            style={{ width: "100%", height: "80vh" }}
          />
        )}
      </div>
    </div>
  );
}
export default Maps;
