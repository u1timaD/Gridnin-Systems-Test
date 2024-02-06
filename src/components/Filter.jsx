import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterNoTransfer,
  filterTransfer,
  setTransferToggle,
  setNoTransferToggle,
	filterPriceCount
} from "../Redux/sliceData";

export function Filter() {
  const [transfer, setTransfer] = useState(false);
  const [noTransfer, setNoTransfer] = useState(false);
  const dispatch = useDispatch();

  const transferRef = useRef();
  const transferNoRef = useRef();

  const handleChangeTransfer = () => {
    setTransfer((prev) => !prev);
    dispatch(filterTransfer(!transfer));
    dispatch(setTransferToggle(!transfer));
    if (!transfer) {
      transferNoRef.current.disabled = true;
    } else {
			dispatch(filterPriceCount());
      transferNoRef.current.disabled = false;
    }
  };

  const handleChangeNoTransfer = () => {
    setNoTransfer((prev) => !prev);
    dispatch(filterNoTransfer(!noTransfer));
    dispatch(setNoTransferToggle(!noTransfer));
    if (!noTransfer) {
      transferRef.current.disabled = true;
    } else {
			dispatch(filterPriceCount());
      transferRef.current.disabled = false;
    }
  };
  return (
    <fieldset className="filter">
			<legend>Фильтровать</legend>
      <label>
        <input
          type="checkbox"
          checked={transfer}
          onChange={handleChangeTransfer}
          ref={transferRef}
        />
        - 1 пересадка
      </label>
      <label>
        <input
          type="checkbox"
          checked={noTransfer}
          onChange={handleChangeNoTransfer}
          ref={transferNoRef}
        />
        - без пересадок
      </label>
    </fieldset>
  );
}
