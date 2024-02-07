import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterAirlines } from "../Redux/sliceData";

export function AirlineCheckbox({
  ticket,
  id,
  checked,
  handleCheck,
  disabled,
}) {
  const airlineName = ticket.carrier.caption;
  const airlinePrice = ticket.price.total.amount;

	const airLineInfo = {
		name: ticket.carrier.caption,
		price: ticket.price.total.amount
	}

	const dispatch = useDispatch();

  const addPoints = (str) => {
    if (/^.{20,}$/.test(str)) {
      return str.slice(0, 19) + "...";
    }
    return str;
  };

  const handleOnChange = () => {
    handleCheck(id);
    if (!checked) {
      dispatch(setFilterAirlines(airLineInfo))
    } else {
			dispatch(setFilterAirlines())
		}
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        id={id}
        onChange={handleOnChange}
      />
      {addPoints(airlineName)}
      <span className="airlineCheckbox">{`от: ${airlinePrice} р.`}</span>
    </label>
  );
}
