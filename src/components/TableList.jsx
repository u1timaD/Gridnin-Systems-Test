import { Ticket } from "./Ticket";

export function TableList({ plan }) {
  const dataTicket = plan.flight;
  // console.log(dataTicket);

  const { carrier, price, legs } = plan.flight;
  const ticketPrice = price.total.amount;
  const airCompany = carrier.caption;

  
  return (
    <div className="table-wrapper">
      <div className="table-header">
        <div className="logo">
          <img width={100} height={50} alt="Логотип компании"></img>
        </div>
        <div className="passenger">
          <div className="passenger-price price">
            <span className="price-value">{ticketPrice}</span>
            <span className="price-currency">₽</span>
          </div>
          <div className="passenger-info info">
            <p className="info-text">
              Стоимость для одного взрослого пассажира
            </p>
          </div>
        </div>
      </div>
      <ul className="table-list">
        {legs.map((ticket, index) => (
          <Ticket key={index} ticket={ticket} />
        ))}
      </ul>
      <button className="table-btn">Выбрать</button>
    </div>
  );
}
