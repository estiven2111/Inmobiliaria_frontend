const HorarioAtencion = ({ horario }) => {
  // Obtener el día actual
  const dayOfWeek = new Date().getDay();

  // Definir los horarios de apertura para cada día

  return (
    <div className="flex flex-col items-center mt-8">
      <table className="table-auto  rounded-xl border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Día</th>
            <th className="border px-4 py-2">Horario</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(horario).map((dia, index) => (
            <tr key={dia}>
              <td
                className={`border px-4 py-2 ${
                  index === dayOfWeek
                    ? "bg-slate-400/20 text-primaryblue dark:text-primary font-bold"
                    : ""
                }`}
              >
                {dia.charAt(0).toUpperCase() + dia.slice(1)}
              </td>
              <td
                className={`border px-4 py-2 ${
                  index === dayOfWeek
                    ? "bg-slate-400/20 text-primaryblue dark:text-primary font-bold"
                    : ""
                }`}
              >
                {horario[dia]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HorarioAtencion;
