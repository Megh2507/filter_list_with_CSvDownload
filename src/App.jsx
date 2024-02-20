// import { useState } from 'react'

import "./App.css";
import Header from "./components/Header.jsx";
import Table from "./components/Table.jsx";
import { data } from "./data/data";
import { useState } from "react";

function App() {
  const [shownData, setShownData] = useState(data);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <>
      <Header searchText={searchText} setSearchText={setSearchText} setShownData={setShownData} selectedRows={selectedRows}/>
      <Table shownData={shownData} selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
    </>
  );
}

export default App;
