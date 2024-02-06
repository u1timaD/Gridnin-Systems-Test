import { Filter } from "./Filter";
import { Price } from "./Price";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortTicket, setSortType } from "../Redux/sliceData";

export function Sort() {
  const [sortBy, setSortBy] = useState("");
  const dispatch = useDispatch();
  const value = useSelector((state) => state.flight.value);

  const handleSortChange = (e) => {
    const sortType = e.target.value;
    setSortBy(sortType);
    dispatch(sortTicket(sortType));
    dispatch(setSortType(sortType));
  };
  return (
    <>
      <div className="form">
        <fieldset className="sort">
        <legend>Сортировать</legend>
          <label>
            <input
              type="radio"
              name="sort"
              value="asc"
              checked={sortBy === "asc"}
              onChange={handleSortChange}
            />
            <span>- по возрастанию цены</span>
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="desc"
              checked={sortBy === "desc"}
              onChange={handleSortChange}
            />
            <span>- по убываю цене</span>
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="time"
              checked={sortBy === "time"}
              onChange={handleSortChange}
            />
            <span>- по времени в пути</span>
          </label>
        </fieldset>
        <Filter />
        <Price />
      </div>
    </>
  );
}
