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
  return (
    <fieldset className="price-search">
			<legend>Цена</legend>
      <label>
        <span>От</span>
        <input
          type="number"
          name="min"
          value={min}
          onChange={handleChangeMin}
        />
      </label>
      <label>
        <span>До</span>
        <input
          type="number"
          name="max"
          value={max}
          onChange={handleChangeMax}
        />
      </label>
    </fieldset>
  );
}
