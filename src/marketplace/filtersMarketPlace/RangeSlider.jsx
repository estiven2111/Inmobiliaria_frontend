/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slider";
import { Input, initTE } from "tw-elements";
import { FilterData } from "../../redux/landingpage/FilterDataObj.slice";

const RangeSlider = ({ handlerRangeL, isActive }) => {
  const { filterLanding, minmaxPropertyFiltered } = useSelector(
    (state) => state.FilterDataObjSlice
  );

  const dispatch = useDispatch();

  // const [values, setValues] = useState([min, max]);
  const [values, setValues] = useState([
    filterLanding.pricemin,
    filterLanding.pricemax,
  ]);

  useEffect(() => {
    initTE({ Input });
  });

  const handleRangeLocal = (value) => {
    setValues(value);
    handlerRangeL(values);
    dispatch(
      FilterData({ ...filterLanding, pricemin: value[0], pricemax: value[1] })
    );
  };

  useEffect(() => {
    // if (isActive) {
    if (filterLanding.pricemin || filterLanding.pricemax) {
      setValues([filterLanding.pricemin, filterLanding.pricemax]);
    } else {
      setValues([minmaxPropertyFiltered[0], minmaxPropertyFiltered[1]]);
    }

    // }
  }, [values]);

  const handleRangeLocal2 = (e) => {
    const { name, value } = e.target;
    const numero = Number(name);
    const valor = value.replace(/\D/g, "");
    const actualizar = [...values];
    actualizar[numero] = valor;

    setValues(actualizar);
    handlerRangeL(actualizar);
  };

  return (
    <div>
      <h1 className="font-medium text-lg mb-2">Precio de arriendo</h1>

      <div
        data-te-input-wrapper-init
        className="grid grid-cols-2 gap-10 items-center justify-between"
      >
        <div className="relative mb-3" data-te-input-wrapper-init>
          {/* $ {values[0]} - $ {values[1]} */}
          <input
            className=" peer input_class"
            pattern="[0-9]*"
            inputMode="numeric"
            // value={values[0] !== min ? values[0] : filterLanding.pricemin}
            // placeholder={`$ ${values[0]}`}
            name="0"
            onChange={handleRangeLocal2}
          />
          <label className="label_class flex items-center gap-1">
            {isActive ? `$ ${filterLanding.pricemin}` : `$ ${values[0]}`}
          </label>
        </div>

        <div className="relative mb-1" data-te-input-wrapper-init>
          <input
            className=" peer input_class"
            pattern="[0-9]*"
            inputMode="numeric"
            // value={values[1] !== max ? values[1] : filterLanding.price}
            // placeholder={`$ ${values[1]}`}
            name="1"
            onChange={handleRangeLocal2}
          />
          <label className="label_class flex items-center gap-1">
            {isActive ? `$ ${filterLanding.pricemax}` : `$ ${values[1]}`}
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 items-center">
        {/* $ {values[0]} - $ {values[1]} */}
        <h1 className=" text-center">Minimo</h1>
        <h1 className=" text-center">Maximo</h1>
      </div>

      <div>
        <Slider
          className={"slider"}
          onChange={(newValue) => {
            handleRangeLocal(newValue);
          }}
          value={values}
          min={minmaxPropertyFiltered[0]}
          max={minmaxPropertyFiltered[1]}
          // min={500000}
          // max={331300000}
        />
        <div className="flex mt-4 justify-between">
          <h1 className="text-xs text-neutral-500">
            $ {minmaxPropertyFiltered[0]}
          </h1>
          <h1 className="text-xs text-neutral-500">
            $ {minmaxPropertyFiltered[1]}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
