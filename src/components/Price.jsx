import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPriceRangeMax, setPriceRangeMin } from "../Redux/sliceData";

export function Price() {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const dispatch = useDispatch();
  const handleChangeMin = (e) => {
    setMin(e.target.value);
    dispatch(setPriceRangeMin(e.target.value));
  };

  const handleChangeMax = (e) => {
    setMax(e.target.value);
    dispatch(setPriceRangeMax(e.target.value));
  };

  const changePlaceholder = (number) => {
    if(number === "") {
      return "Введите значение"; 
    } else if (Number(min) > Number(number)) {
     return "значение От должно быть меньше До"
    }
    else {
     return ''
    }
  }
   

  return (
    <fieldset className="price-search">
      <legend>Цена</legend>
      <label className="priceMin">
        <span>От</span>
        <input
          type="number"
          name="min"
          value={min}
          onChange={handleChangeMin}
        />
      </label>
      <span className="priceAlert">{changePlaceholder(min)}</span>
      <label>
        <span>До</span>
        <input
          type="number"
          name="max"
          value={max}
          onChange={handleChangeMax}
        />
      </label>
      <span className="priceAlert">{changePlaceholder(max)}</span>
    </fieldset>
  );
}
