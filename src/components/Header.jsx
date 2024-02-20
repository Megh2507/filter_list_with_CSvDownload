import searchIcon from "../assets/search.svg";
import statusIcon from "../assets/status.svg";
import locationIcon from "../assets/location.svg";
import downloadIcon from "../assets/download.svg";
import { data } from "../data/data";
import "./header.css";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
// eslint-disable-next-line react/prop-types
function Header({ searchText, setSearchText, setShownData,selectedRows }) {
  console.log(searchText);
  const options = [
    
    { label: "In Transit", value: "In Transit" },
    { label: "Out for Delivery", value: "Out for Delivery" },
    { label: "Placed", value: "Placed" },
    { label: "Delivered", value: "Delivered" },
    
  ];
  const options2 = [
    
    { label: "Bangalore", value: "Bangalore" },
    { label: "Hyderabad", value: "Hyderabad" },
    { label: "Patna", value: "Patna" },
    
  ];

  const [selected, setSelected] = useState([]);
  const [selected2, setSelected2] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  console.log(selectedRows)
  const handleStatusChange = () => {
    // const selectedOptions = Array.from(
    //   e.target.selectedOptions,
    //   (option) => option.value
    // );
    const selectedOptions = selected.map((item)=>item.value)
    console.log("logging event-->", selectedOptions);
    setSelectedStatuses(selectedOptions);
    
      
      let filteredData = data.filter((el) => {
        let { status } = el;
        return selectedOptions.includes(status);
      });
      setShownData(filteredData);
   
  };
  useEffect(()=>{
    if(selected?.length>0){
      handleStatusChange();
    }
  },[selected])
  useEffect(()=>{
    if(selected2?.length>0){
      handleLocationChange();
    }
  },[selected2])
  const handleLocationChange = () => {
    
    const selectedOptions = selected2.map((item)=>item.value)
    console.log("logging event-->", selectedOptions);
    setSelectedLocation(selectedOptions);
  
      let filteredData = data.filter((el) => {
        let { distribution } = el;
        return selectedOptions.includes(distribution);
      });
      setShownData(filteredData);
    
   
  }

  const handleChange = (e) => {
    setSearchText(e.target.value);
    
    let lowercaseQuery = e.target.value.toLowerCase();

    let filtereData = data.filter((item) => {
      let { id, customer, products, date, distribution, status, price } = item;
      return (
        id.toLowerCase().includes(lowercaseQuery) ||
        customer.toLowerCase().includes(lowercaseQuery) ||
        date.toLowerCase().includes(lowercaseQuery) ||
        distribution.toLowerCase().includes(lowercaseQuery) ||
        status.toLowerCase().includes(lowercaseQuery) ||
        price.toLowerCase().includes(lowercaseQuery) ||
        products.some((product) =>
          product.toLowerCase().includes(lowercaseQuery)
        )
      );
    });
    console.log("logging filter", filtereData);
    setShownData(filtereData);
  };
  const downloadCSV = () => {
    
    // eslint-disable-next-line react/prop-types
    const csvContent = "data:text/csv;charset=utf-8," + selectedRows.map((row) => {
      return Object.values(row).join(",");
    }).join("\n");
    // Create a temporary anchor element and trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "selected_rows.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  console.log("logging selected---->",selected)
  return (
    <div className="headerbody">
      <div className="header-left">
        <div className="header-left-container2">
          <img src={searchIcon} alt="search icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
       
        <div className="header-left-container">
        <img src={statusIcon} alt="status icon" />
        <MultiSelect
        options={options}
        className="multi-select-container"
        value={selected}
        onChange={setSelected}
        labelledBy={"Status"}
        isCreatable={true}
      />
        </div>
        <div className="header-left-container">
        <img src={locationIcon} alt="status icon" />
        <MultiSelect
        options={options2}
        className="multi-select-container"
        value={selected2}
        onChange={setSelected2}
        labelledBy={"Status"}
        isCreatable={true}
      />
        </div>
       
      </div>
      <div className="export-button" onClick={downloadCSV}>
        <img src={downloadIcon} alt="download icon" />
        <p>Export Orders</p>
      </div>
    </div>
  );
}

export default Header;
