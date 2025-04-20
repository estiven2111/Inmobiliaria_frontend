import * as Yup from "yup";

//? DATOS PERSONALES

export const datosPersonalesValidationSchema = Yup.object({
  cod_inmueble: Yup.number()
      .required("Campo requerido")
      .positive("El código del inmueble tiene que ser positivo")
      .integer("El código del inmueble tiene que ser un número"),
    nom_completo: Yup.string()
      .required("Campo requerido")
      .min(3, "Mínimo 3 caracteres")
      .max(50, "Máximo 50 caracteres"),
    tipo_doc: Yup.string().required("Campo requerido"),
    num_doc: Yup.number()
      .required("Campo requerido")
      .positive()
      .integer("Ingresa solo números"),
    fechaexp_doc: Yup.date().required("Campo requerido"),
    num_whatsapp: Yup.number()
      .required("Campo requerido")
      .positive()
      .integer("Ingresa solo números"),
    email: Yup.string()
      .required("Campo requerido")
      .email("Ingresa un correo válido"),
    otras_personas: Yup.boolean(),

    datos_personas: Yup.array().when("otras_personas", {
      is: true, // When 'otras_personas' is true
      then: () =>
        Yup.array()
          .of(
            Yup.object().shape({
              nombre: Yup.string()
                .required("Nombre y edad de la persona son requeridos")
                .min(3, "Mínimo 3 caracteres")
                .max(50, "Máximo 50 caracteres"),
              edad: Yup.number()
                .required("Nombre y edad requeridos")
                .positive()
                .integer("Ingresa solo números"),
            })
          )
          .required("Al menos una persona debe ser agregada"),
      otherwise: () => Yup.array().notRequired(),
    }),

    mascotas: Yup.boolean(),
    datos_mascotas: Yup.array().when("mascotas", {
      is: true,
      then: () =>
        Yup.array()
          .of(
            Yup.object().shape({
              nombre: Yup.string()
                .required("Nombre y tipo de tu mascota son requeridos")
                .min(3, "Mínimo 3 caracteres")
                .max(50, "Máximo 50 caracteres"),
              tipo: Yup.string()
                .required("Campo requerido")
                .min(3, "Mínimo 3 caracteres")
                .max(50, "Máximo 50 caracteres"),
            })
          )
          .required("Al menos una mascota debe ser agregada"),
      otherwise: () => Yup.array().notRequired(),
    }),
    autorizacion_datos: Yup.boolean()
      .oneOf([true], "Acepta los términos y condiciones")
      .required("Acepta los términos y condiciones"),
  });

  //? INGRESOS

  export const ingresosValidationSchema = Yup.object().shape({
    act_economica: Yup.string()
      .required('Campo requerido.'),
    datos_act_economica: Yup.array()
      .of(Yup.string().required("Este campo es requerido."))
      .when('act_economica', {
        is: (act_economica) => ['Empleado'].includes(act_economica),
        then: (schema) => schema.min(1, 'Todos los campos son requeridos'),
        otherwise: () => Yup.array().notRequired(),
      })
      .when('act_economica', {
        is: (act_economica) => ['Independiente', 'Rentista de capital'].includes(act_economica),
        then: (schema) => schema.min(1, 'Campo requerido'),
        otherwise: () => Yup.array().notRequired(),
      }),
    ingresos: Yup.number()
      .required('Campo requerido.')
      .positive('Must be a positive number')
      .integer('Igresa solo números'),
    egresos: Yup.number()
      .required('Campo requerido.')
      .positive('Must be a positive number')
      .integer('Igresa solo números'),
  });

  //? REFERENCIAS

 export const referenciasValidationSchema = Yup.object().shape({
    datos_referencias: Yup.array()
      .of(
        Yup.object().shape({
          nombre: Yup.string()
            .required('El nombre completo es requerido'),
            
          contacto: Yup.string()
            .min(7, 'El número de contacto debe tener al menos 7 caracteres')
            .max(15, 'El número de contacto debe tener menos de 15 caracteres')
            .required('El número de contacto es requerido'),
            
          parentesco: Yup.string()
            .required('El parentesco es requerido'),
        })
      )
      .required('Debe agregar al menos una referencia')
      .min(1, 'Debe agregar al menos una referencia'),
  });
  