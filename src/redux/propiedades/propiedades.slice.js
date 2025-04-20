import { createSlice } from "@reduxjs/toolkit";

 import axios from "axios";
const initialState = {
  propiedadess:[],
  filters: {
    search: '',
    petfriendly: false,
    exclusive: false,
    bathrooms: '',
    garages: '',
    bedrooms: '',
    stratum: '',
    pricemin: '',
    pricemax: '',
  }
}

export const propiedadesSlice = createSlice({
    name: 'propiedades',
    initialState,
    reducers: {
        getPropiedades(state,action){
          return{
            ...state,
            propiedadess:action.payload
          }
        },
        updateFilterValue: (state, action) => {
          const { name, value } = action.payload;
          state.filters = {
            ...state.filters,
            [name]: value
          };
        },
         
        },

    

})

export const pagePropiedades = (page) => {
  return async (dispatch) => {
    const properties = (await axios.get(`http://localhost:3002/property?page=${page}`)).data;
    await dispatch(getPropiedades(properties));
  };
};

export const {getPropiedades,updateFilterValue } = propiedadesSlice.actions
export default propiedadesSlice.reducer