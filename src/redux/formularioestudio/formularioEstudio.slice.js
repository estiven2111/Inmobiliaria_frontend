import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    datosEstudio: {
    aplica_como: "",
    id_form: "",
    id_form_coa:"",
    //? Aplicacion
    persona: "",
    //? Datos Personales
    cod_inmueble: "",
    nom_completo: "",
    tipo_doc: "",
    num_doc: "",
    ref_pago: "",
    fechaexp_doc: "",
    num_whatsapp: "",
    email: "",
    otras_personas: false,
    datos_personas: [{ nombre: "", edad: "" }],
    mascotas: false,
    datos_mascotas: [{ nombre: "", tipo: "" }],
    autorizacion_datos: false,
    //? Ingresos
    act_economica: "",
    datos_act_economica: [],
    ingresos: "",
    egresos: "",
    //? Referencias
    datos_referencias: [{ nombre: "", contacto: "", parentesco: "" }],
    //? Pago y confirmacion
    },
    files: [],
    dirtyInput: false,
}

export const formularioEstudioSlice = createSlice({
    name:"formularioEstudioSlice",
    initialState,
    reducers: {
      updateDatosEstudio(state, action) {
        state.datosEstudio = { ...state.datosEstudio, ...action.payload };
    },
          addFile(state, action) {
            state.files.push(action.payload)
          },
            removeFile(state, action) {
                state.files.splice(action.payload, 1)
        },
        cancelAllFiles(state) {
            state.files = []
        },

        updateDirtyInput(state, action) {
            state.dirtyInput = action.payload
        }
    },

    
})

export const {updateDatosEstudio, updateDirtyInput, addFile, removeFile, cancelAllFiles} = formularioEstudioSlice.actions
export default formularioEstudioSlice.reducer