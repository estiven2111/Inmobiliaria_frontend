import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

export const fetchFormularios = createAsyncThunk(
    "dashboard/fetchFormularios",
    async () => {
        const res = await axios.get("/formulario/tomador/dashboard");
        return res.data;
    }
)

export const updateEstadoFormulario = createAsyncThunk(
    "dashboard/updateEstadoFormulario",
    async (payload) => {
       
            const res = await axios.put(`/formulario//validation-tomador/dashboard?id_form=${payload.id_form}&estado=${payload.estado}`);
            return res.data;
     
    
    }
)

export const searchFormularios = createAsyncThunk(
    "dashboard/searchFormularios",
    async (queryParams) => {
        const res = await axios.get("/formulario/search-tomador/dashboard", { params: queryParams });
        return res.data;
    }
)


export const deleteFormulario = createAsyncThunk(
    "dashboard/deleteFormulario",
    async (payload) => {
       
            const res = await axios.delete(`/formulario/delete-tomador/dashboard?id_form=${payload}`);
            return res.data;
     
    
    }
)



export const estudioSlice = createSlice({
    name: "estudio",
    initialState: {
        formularios: [],
        searchFormularios: [],
        estados: ["En estudio", "Aprobado", "Pendiente por CoA", "No aprobado"],
        updateStatus: "idle",
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFormularios.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchFormularios.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.formularios = action.payload;
        }
        )
        .addCase(fetchFormularios.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(updateEstadoFormulario.pending, (state) => {
            state.updateStatus = "loading";
        })
        .addCase(updateEstadoFormulario.fulfilled, (state, action) => {
            state.updateStatus = "succeeded";
            state.formularios = state.formularios.map((formulario) => {
                if (formulario.id_form === action.payload.id_form) {
                    return {
                        ...formulario,
                        estado: action.payload.estado,
                    }
                } else {
                    return formulario;
                }
            })
            toast.success(action.payload.message);
           

        })
        // .addCase(updateEstadoFormulario.rejected, (state, action) => {
        //     state.updateStatus = "failed";
        //     state.error = action.error.message;
        // })
        .addCase(searchFormularios.pending, (state) => {
            state.status = "loading";
        })
        .addCase(searchFormularios.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.searchFormularios = action.payload;
        })
        .addCase(searchFormularios.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(deleteFormulario.pending, (state) => {
            state.updateStatus = "loading";
        })
        .addCase(deleteFormulario.fulfilled, (state, action) => {
            state.updateStatus = "succeeded";
            // Removing the formulario with the given id from the state
            state.formularios = state.formularios.filter((formulario) => formulario.id_form !== action.payload.id_form);
            // Optional: You can also display a toast for successful deletion
           
        })
        .addCase(deleteFormulario.rejected, (state, action) => {
            state.updateStatus = "failed";
            state.error = action.error.message;
            // Optional: You can also display a toast for failed deletion
            toast.error("Error deleting the formulario. Please try again.");
        })
        
       
    },
})

export default estudioSlice.reducer;

//? SELECTORS
export const selectAllFormularios = (state) => state.estudioSlice.formularios;
export const selectAllSearchFormularios = (state) => state.estudioSlice.searchFormularios;
export const selectFormulariosById = (state, formularioId) => state.estudioSlice.formularios.find((formulario) => formulario.id_form === formularioId);
//Filtros
export const selectFormulariosByTomador = (state) => state.estudioSlice.formularios.filter((formulario) => formulario.aplica_como === "Tomador");

export const selectFormulariosByCoA = (state) => state.estudioSlice.formularios.filter((formulario) => formulario.aplica_como === "Co-arrendatario"); 

//? SELECTORS UPDATE
export const selectUpdateStatus = (state) => state.estudioSlice.updateStatus;
export const selectFormulariosStatus = (state) => state.estudioSlice.status;
