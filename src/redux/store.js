import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import propiedadesReducer from "./propiedades/propiedades.slice";
import testimoniosReducer from "./tetimonios/testimonios.slice";
import FilterDataObjReducer from "./landingpage/FilterDataObj.slice";
import formularioEstudioReducer from "./formularioestudio/formularioEstudio.slice";
import estudioReducer from "./admin_dashboard/estudioDatacredito.slice";

//------------ REDUX API QUERIES

import { propertyApi } from "./RTKquery/propertyApi";

export const store = configureStore({
  reducer: {
    propiedadesSlice: propiedadesReducer,
    testimoniosSlice: testimoniosReducer,
    FilterDataObjSlice: FilterDataObjReducer,
    formularioEstudioSlice: formularioEstudioReducer,
    estudioSlice: estudioReducer,
    //--------- API QUERIES
    [propertyApi.reducerPath]: propertyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertyApi.middleware),
});

setupListeners(store.dispatch);
