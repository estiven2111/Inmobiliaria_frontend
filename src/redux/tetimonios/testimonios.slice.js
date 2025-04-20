import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    testimonios: [
        {
            name: "Hernan Reyes",
            occupation: "Propietario",
            exclusivo: false,
            content: "en el poco tiempo que he vinculado el inmueble me  parece bueno, y las personas que trabajan en esta empresa me parecen excelentes hasta el momento.",
            avatar: "https://lh3.googleusercontent.com/a-/AD_cMMSd0LGW31gsnUw45bRSDza49pITHr2gVVJpJ2YtlVANBbkH=w120-h120-p-rp-mo-br100"
          },
          {
            name: "Ioanna Paola Coy Cadavid",
            occupation: "Propietario",
            exclusivo: false,            
            content: "Hola! Hace aproximadamente 2 meses, tuve la oportunidad de elegir los servicios de ARRIÉNDALO Donde la efectividad de su trabajo se vio reflejada al mes, ya mi casa fue arrendada. Me siento muy tranquila y confiada, en cuanto a los pagos y la forma en que prestan su servicio a los arrendatarios y al arrendador. Gracias ARRIÉNDALO !!",
            avatar: "https://lh3.googleusercontent.com/a/AAcHTte5XRrO7denxuU5XME_DHUUuCLmcqCZiuU0GNEaLYhg=w120-h120-p-rp-mo-br100"
          },
          {
            name: "Armando Barreto",
            occupation: "",
            exclusivo: false,
            content: "Expedito, preciso y sencillo. Siempre con la intención de apoyo  más una atención personalizada y directa.",
            avatar: "https://lh3.googleusercontent.com/a-/AD_cMMSDs6NXvX11MvKG2P5zn0t9D6HZg1eq07i6cxEfuSuQTg=w120-h120-p-rp-mo-br100"
          },
          {
            name: "Maria del Pilar Jimenez Martinez",
            occupation: "",
            exclusivo: false,
            content: "Excelente atención al cliente, publican en varios portales inmobiliarios, el estudio sale antes de media hora!!",
            avatar: "https://lh3.googleusercontent.com/a-/AD_cMMTAh4WG3hLqNsIsWDpDceiCk2GmZMVoXtFOlv-CkV0GsrI=w120-h120-p-rp-mo-br100"
          },
          {
            name: "LuzMarina",
            occupation: "Propietario",
            exclusivo: false,
            content: "Si busca confiabilidad, dinamismo y agilidad, para arrendar su inmueble... ARRIENDALO, tiene ésto y mucho mas.",
            avatar: "https://lh3.googleusercontent.com/a-/AD_cMMRljC55G_ONRXNjMPpX6AzOX0C96W6xGrayN-_JlphQSC0=w120-h120-p-rp-mo-br100"
          },
          {
            name: "Nelson Orlando Lesmes Novoa",
            occupation: "Propietario",
            exclusivo: false,  
            content: "Muy buena gestión en el arrendamiento del inmueble",
            avatar: "https://lh3.googleusercontent.com/a-/AD_cMMQd8xyBgdTqibc7m8J6n9OdPn8PEHZKBvxG0byz-SSFWYI=w120-h120-p-rp-mo-br100"
          },
         
    ]
}

export const testimoniosSlice = createSlice({
    name: 'testimonios',
    initialState,
    reducers: {
        // lol
    }
})

export const {lol} = testimoniosSlice.actions
export default testimoniosSlice.reducer