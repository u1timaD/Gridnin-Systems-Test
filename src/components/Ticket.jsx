import Arrow from "../assets/arrow-narrow-right.svg";

export function Ticket({ ticket }) {
  const { duration, segments } = ticket;

  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration - durationHours * 60;

  const firstIndex = segments[0];
  const lastIndex = segments[segments.length - 1];

  const startPoint = firstIndex.departureDate;
  const finishPoint = lastIndex.arrivalDate;

  const airline = firstIndex.airline.caption;

  //  +Аэропорты
  const startAirport = firstIndex.departureAirport.caption;
  const finishAirport = lastIndex.arrivalAirport.caption;

  //  +Коды аэропортов
  const startAirportCode = firstIndex.departureAirport.uid;
  const finishAirportCode = lastIndex.arrivalAirport.uid;

  //  +Города
  const startCity =
    firstIndex.departureCity && firstIndex.departureCity.caption
      ? firstIndex.departureCity.caption
      : "";

  const finishCity =
    lastIndex.arrivalCity && lastIndex.arrivalCity.caption
      ? lastIndex.arrivalCity.caption
      : "";

  // +Форматируем  время
  const checkTime = (timeString) => {
    const match = timeString.match(/(\d{2}:\d{2})/);
    const formattedTime = match ? match[1] : "Invalid format";
    return formattedTime;
  };

  // +Форматируем дату
  const checkDate = (dateString) => {
    const dateObj = new Date(dateString);
    if (!isNaN(dateObj)) {
      const formattedDate = dateObj.toLocaleString("ru-RU", {
        day: "numeric",
        month: "short",
        weekday: "short",
      });
      return formattedDate;
    }
  };
  // +Ищем время
  const findTime = (point) => {
    if (point === 0) {
      const dateString = startPoint;
      return checkTime(dateString);
    } else {
      const dateString = finishPoint;
      return checkTime(dateString);
    }
  };

  // +Ищем дату
  const findDate = (point) => {
    if (point === 0) {
      const dateString = startPoint;
      return checkDate(dateString);
    } else {
      const dateString = finishPoint;
      return checkDate(dateString);
    }
  };

  const transferCount = () =>
    segments.length > 1 ? `${segments.length - 1} пересадка` : "";

  return (
    <li className="table-item ticket">
      <div className="ticket-airports">
        <div className="departure-airport airport">
          <span className="city">{startCity}, </span>
          <span className="port">{startAirport} </span>
          <span className="uid">({startAirportCode})</span>
        </div>
        <div>
          <img src={Arrow} />
        </div>
        <div className="arrival-airport airport">
          <span className="city">{finishCity}, </span>
          <span className="port">{finishAirport} </span>
          <span className="uid">({finishAirportCode})</span>
        </div>
      </div>
      <div className="ticket-timeline">
        <div className="departure-calendar calendar">
          <span className="time">{findTime(0)}</span>
          <span className="date">{findDate(0)}</span>
        </div>
        <div className="all-calender calendar">
          <span className="hours">{durationHours} ч</span>
          <span className="minutes">{durationMinutes} мин</span>
        </div>
        <div className="arrival-calendar calendar">
          <span className="date">{findDate(1)}</span>
          <span className="time">{findTime(1)}</span>
        </div>
      </div>
      <div className="transfer">
        <span className="left-line"></span>
        <span className="transfer-text">{transferCount()}</span>
        <span className="right-line"></span>
      </div>
      <div className="company">
        <span className="company-text">Рейс выполняет:</span>
        <span className="company-name">{airline}</span>
      </div>
    </li>
  );
}
