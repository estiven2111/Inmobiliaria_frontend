import { useState } from "react";
import AcordionItem from "./AcordionItem";

const preguntas = [
  {
    title: "¿Qué es Data Crédito y para qué se utiliza?",
    description:
      "Data Crédito es una agencia de información crediticia que recopila datos financieros para evaluar la solvencia crediticia de las personas.",
  },
  {
    title:
      "¿Por qué debo proporcionar mi información personal y financiera en este formulario?",
    description:
      "La información es necesaria para evaluar tu capacidad crediticia y brindarte mejores servicios financieros.",
  },
  {
    title:
      "¿Cuánto tiempo tomará llenar el formulario y recibir los resultados del estudio?",
    description:
      "El tiempo varía, pero generalmente toma unos minutos para llenar el formulario y recibirás los resultados en un plazo razonable.",
  },
  {
    title:
      "¿Cómo se utiliza mi información en el estudio y quién tiene acceso a ella?",
    description:
      "Tu información se utilizará únicamente con fines crediticios y solo tendrá acceso personal autorizado.",
  },
  {
    title: "¿Existen costos asociados con la participación en este estudio?",
    description:
      "Esta aplicación tiene un costo de $50.000 IVA incluido, los cuales son abonables al pago de la reserva del inmueble. En caso de no aprobar la aplicación, este valor no es reembolsable.",
  },
];

const Acordion = () => {
  const [open, setOpen] = useState(preguntas.map(() => false));

  const toggleHandler = (index) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      if (!prevOpen[index]) {
        prevOpen.forEach((item, i) => {
          if (i !== index) {
            newOpen[i] = false;
          }
        });
      }
      newOpen[index] = !prevOpen[index];
      return newOpen;
    });
  };
  return (
    <div className="">
      <div className="bg-primaryblue/80 py-3 px-2 text-lg text-white font-bold">
        <h1>Resolvemos todas tu dudas...</h1>
      </div>
      {preguntas?.map((el, i) => {
        return (
          <AcordionItem
            open={open[i]}
            key={i}
            toggle={() => toggleHandler(i)}
            title={el.title}
            description={el.description}
            index={i}
          />
        );
      })}
    </div>
  );
};

export default Acordion;
