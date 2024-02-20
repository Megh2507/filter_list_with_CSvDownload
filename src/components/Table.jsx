import  { useState, useEffect } from "react";
import "./Table.css";

// eslint-disable-next-line react/prop-types
function Table({ shownData,selectedRows, setSelectedRows }) {
  
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (selectAll) {
      // eslint-disable-next-line react/prop-types
      setSelectedRows(shownData.map(item => item));
    } else {
      setSelectedRows([]);
    }
  }, [selectAll, shownData]);

  const handleRowCheckboxChange = (event, rowData) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, rowData]);
    } else {
      // eslint-disable-next-line react/prop-types
      setSelectedRows(selectedRows.filter(item => item !== rowData));
    }
  };

  const handleSelectAllCheckboxChange = event => {
    setSelectAll(event.target.checked);
  };
  console.log("logging selected rows--->",selectedRows)

  return (
    <div className="table-container">
      <div className="tableUpper">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAllCheckboxChange}
          />
          <span className="checkmark"></span>
        </label>
        <p className="p1">ALL ORDERS</p>
        {/* eslint-disable-next-line react/prop-types */}
        <p className="p2">({selectedRows.length} orders selected)</p>
      </div>
      <table>
        <thead className="table-header">
          <tr>
            <th>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllCheckboxChange}
                />
                <span className="checkmark"></span>
              </label>
            </th>
            <th>Ref. ID</th>
            <th>Customers</th>
            <th>Products</th>
            <th>Date</th>
            <th>Distribution</th>
            <th>Status</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className="table-data">
          {/* eslint-disable-next-line react/prop-types */}
          {shownData.map((item) => (
            <tr key={item.id}>
              <td>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    // eslint-disable-next-line react/prop-types
                    checked={selectedRows.includes(item)}
                    onChange={(event) => handleRowCheckboxChange(event, item)}
                  />
                  <span className="checkmark"></span>
                </label>
              </td>
              <td>{item.id}</td>
              <td>{item.customer}</td>
              <td>{item.products}</td>
              <td>{item.date}</td>
              <td>{item.distribution}</td>
              <td>{item.status}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
