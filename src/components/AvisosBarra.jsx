const AvisosBarra = () => {
  return (
    <div className="animate-pulse flex items-center py-1 lg:h-10 h-24 bg-primary-700 px-5 text-white ">
      <p className=" gap-3 w-full text-sm text-center">
        Durante el 14 y 15 de agosto estaremos realizando actualizaciones en
        nuestras línea de atención por WhatsApp. Si necesitas atención
        escríbenos al correo{" "}
        <a
          href="mailto:ayuda@arriendalo.com.co"
          className=" pl-2 underline font-bold text-white"
        >
          ayuda@arriendalo.com.co
        </a>{" "}
        o en nuestro chat web.
      </p>
    </div>
  );
};

export default AvisosBarra;
