import { useEffect, useState } from "react";
import flight from "../assets/flights";
import { NotFound } from "./NotFound";
import { TableList } from "./TableList";
import { useSelector, useDispatch } from "react-redux";
import { setDataFlight, filterPriceCount } from "../Redux/sliceData";

export function Table() {
  const { minPrice, maxPrice } = useSelector((state) => state.flight);

  const [countTicket, setCountTicket] = useState(2);

  const dispatch = useDispatch();
  const value = useSelector((state) => state.flight.value);

  useEffect(() => {
    async function getData() {
      try {
        const flightData = await flight.result.flights;
        dispatch(setDataFlight(flightData));
      } catch (err) {
        // console.log(err);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const flightData = await flight.result.flights;

        if (Number(minPrice) < Number(maxPrice)) {
          dispatch(setDataFlight(flightData));
          dispatch(filterPriceCount());
        } else if (Number(minPrice) === 0 && Number(maxPrice) === 0) {
          dispatch(setDataFlight(flightData));
          dispatch(filterPriceCount());
        } else {
          // console.log("Вы вели неправильные значения");
        }
      } catch (err) {}
    }
    getData();
  }, [minPrice, maxPrice]);

  const handleClick = () => {
    setCountTicket((prev) => prev + 2);
  };

  return (
    <section className="table">
      {value.length ? (
        value
          .slice(0, countTicket)
          .map((plan, index) => <TableList key={index} plan={plan} />)
      ) : (
        <NotFound />
      )}

      {value.length ? (
        <button onClick={handleClick}>Посмотреть ещё билеты</button>
      ) : (
        <></>
      )}
    </section>
  );
}
