import "./App.scss";
import { Sort } from "./components/Sort";
import { Table } from "./components/Table";

function App() {
  return (
    <>
      <div className="wrapper">
        <Sort />
        <Table />
      </div>
    </>
  );
}

export default App;
