const ArriendaloFlex = () => {
  return (
    <div className="py-28 lg:px-56 px-5">
      <h1 className="font-bold text-3xl text-center py-5 text-primaryblue">
        Suscribete a Arriendalo Flex
      </h1>
      <div className="grid lg:grid-cols-3 text-white sm:grid-cols-1 lg:gap-20">
        <div className="card bg-lightblueone rounded-xl p-5">
          <h1 className="font-semibold">ArriendaloFlex | Esencial</h1>

          <p className="py-3">
            Protege el pago de tu arriendo en caso de desempleo involuntario.
          </p>
          <div className="grid grid-cols-6 content-center">
            <div className="col-span-5 font-bold text-3xl">
              <div className="fles items-center">
                <h1 className="text-4xl">COP 47,900</h1>
                <span className="text-sm">por mes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArriendaloFlex;
