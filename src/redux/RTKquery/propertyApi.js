import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = "http://localhost:3002";
// const API = "https://pruebadeploy-393802.uw.r.appspot.com";
// const API = "https://arriendalobackend-production.up.railway.app";

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getProperties: builder.query({
      query: (page) => `/property?page=${page}`,
    }),
    getAllProperties: builder.query({
      query: () => "property/all",
    }),
    getPropertiesById: builder.query({
      query: (id) => `/property/details?id=${id}`,
    }),
    getRecentProperties: builder.query({
      query: () => "/property/newproperties",
    }),

    //!sirve
    getPropertiesearch: builder.query({
      query: (searchs) =>
        `/property/search?searchs=${searchs.search}&petfriendly=${searchs.petfriendly}&exclusive=${searchs.exclusive}&bathrooms=${searchs.bathrooms}&garages=${searchs.garages}&bedrooms=${searchs.bedrooms}&stratum=${searchs.stratum}&pricemin=${searchs.pricemin}&pricemax=${searchs.pricemax}&tipeproperty=${searchs.tipeproperty}&priceMinMax=${searchs.priceMinMax}&ciudad=${searchs.ciudad}&habitaciones=${searchs.habitaciones}&tipo=${searchs.tipo}`,
        //&ciudad=${searchs.ciudad}&habitaciones=${searchs.habitaciones}&tipo=${searchs.tipo}
     
    }),
    // getPropertiesearch: builder.query({
    //     query: (searchs)=>`/property/search?searchs=${searchs.search}&petfriendly=${searchs.petfriendly}&exclusive=Active&bathrooms=1&garages=1&bedrooms=2&stratum=2`
    // }),
    //   getPropertiesearch: builder.query({
    //     query: (searchs)=>`/property/search?searchs=${searchs.search}`
    // })
  }),
});

export const {
  useGetPropertiesQuery,
  useGetAllPropertiesQuery,
  useGetPropertiesByIdQuery,
  useGetRecentPropertiesQuery,
  useGetPropertiesearchQuery,
} = propertyApi;
