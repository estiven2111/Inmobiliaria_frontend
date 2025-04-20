import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  filterLanding: {
    search: "",
    petfriendly: false,
    exclusive: "",
    bathrooms: "",
    garages: "",
    bedrooms: "",
    stratum: "",
    pricemin: "",
    pricemax: "",
    areamin: "",
    areamax: "",
    priceMinMax: "",
    tipeproperty: "",
    ciudad: "",
    habitaciones: "",
    tipo: "",
  },
  propiedadesFiltradas:[],
  citiesFiltered: [],
  tipesPropertyFiltered: [],
  minmaxPropertyFiltered: [],
  keys:{
    key_maps :""
  }
};

export const FilterDataObjSlice = createSlice({
  name: "FilterDataObj ",
  initialState,
  reducers: {
    getFilterData(state, action) {
      return {
        ...state,
        filterLanding: action.payload,
      };
    },
    getFilterProperties(state, action) {
      return {
        ...state,
        propiedadesFiltradas: action.payload,
      };
    },
    getFilterCities(state, action) {
      return {
        ...state,
        citiesFiltered: action.payload,
      };
    },
    getFilterTipesProperties(state, action) {
      return {
        ...state,
        tipesPropertyFiltered: action.payload,
      };
    },
    getFilterMinMaxProperties(state, action) {
      return {
        ...state,
        minmaxPropertyFiltered: action.payload,
      };
    },
    getKeyMapas(state, action) {
      return {
        ...state,
        keys: action.payload,
      };
    },
    // updateFilterValue: (state, action) => {
    //   const { name, value } = action.payload;
    //   state.filters = {
    //     ...state.filters,
    //     [name]: value
    //   };
    // },
  },
});

export const FilterData = (filter) => {
  return async (dispatch) => {
    dispatch(getFilterData(filter));
  };
};
export const filterProperties = (filter) => {
  return async (dispatch) => {
  const response =  (await axios.get(`/property/search?searchs=${filter.search}&petfriendly=${filter.petfriendly}&exclusive=${filter.exclusive}&bathrooms=${filter.bathrooms}&garages=${filter.garages}&bedrooms=${filter.bedrooms}&stratum=${filter.stratum}&pricemin=${filter.pricemin}&pricemax=${filter.pricemax}&tipeproperty=${searchs.tipeproperty}&priceMinMax=${searchs.priceMinMax}&ciudad=${filter.ciudad}&habitaciones=${filter.habitaciones}&tipo=${filter.tipo}`)).data;
     dispatch(getFilterProperties(response));
  };
};
export const filterCities = () => {
  return async (dispatch) => {
  const response =  (await axios.get(`/function/cities`)).data;
     dispatch(getFilterCities(response));
  };
};
export const filterTipesProperties = () => {
  return async (dispatch) => {
  const response =  (await axios.get(`/function/tipes`)).data;
     dispatch(getFilterTipesProperties(response));
  };
};
export const filterMinMaxProperties = () => {
  return async (dispatch) => {
  const response =  (await axios.get(`/function/minmax`)).data;
     dispatch(getFilterMinMaxProperties(response));
  };
};
export const tokensmaps = () => {
  return async (dispatch) => {
  const response =  (await axios.get(`/function/keyMap`)).data;
     dispatch(getKeyMapas(response));
     return response

  };
};

export const { getFilterData,getFilterProperties,getFilterCities,getFilterTipesProperties,getFilterMinMaxProperties,getKeyMapas } = FilterDataObjSlice.actions;
export default FilterDataObjSlice.reducer;
