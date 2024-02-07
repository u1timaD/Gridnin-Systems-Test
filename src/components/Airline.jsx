import { useState, useRef } from "react";
import { AirlineCheckbox } from "./AirlineCheckbox";
import { useSelector } from "react-redux";

export function Airline() {
  const value = useSelector((state) => state.flight.value);
  const saveValue = useSelector((state) => state.flight.saveValue);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheck = (id) => {
    setSelectedCheckbox(selectedCheckbox === id ? null : id);
  };

  const uniqueNames = {};
  const sortValue = [...saveValue]
    .sort((a, b) => {
      return (
        Number(a.flight.price.total.amount) -
        Number(b.flight.price.total.amount)
      );
    })
    .filter((item) => {
      if (!uniqueNames[item.flight.carrier.caption]) {
        uniqueNames[item.flight.carrier.caption] = true;
        return true;
      }
      return false;
    });

  const arrayToCheck = [...value];

  return (
    <fieldset className="filter-airline">
      <legend>Авиакомпании</legend>
      {sortValue.map((ticket, i) => {
        const shouldShowCheckbox = arrayToCheck.some(
          (item) =>
            item.flight.price.total.amount === ticket.flight.price.total.amount
        );
        return shouldShowCheckbox ? (
          <AirlineCheckbox
            key={i}
            id={i}
            ticket={ticket.flight}
            handleCheck={handleCheck}
            checked={selectedCheckbox === i}
          />
        ) : null;
      })}
    </fieldset>
  );
}
