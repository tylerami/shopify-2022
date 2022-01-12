import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Item from "./components/Item.jsx";
import InventoryForm from "./components/InventoryForm";

function App() {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    Axios.get("https://shopify-2022-backend.herokuapp.com/getItems")
      .then((response) => {
        setItemsList(response.data.reverse());
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  return (
    <div className="App">
      <div className="header">
        <h1>LogistX Inventory Tracker</h1>
      </div>
      <InventoryForm getItems={getItems} />
      <h3 className="subheader">Manage Inventory</h3>
      <div className="divider"></div>
      <div className="inventory">
        <button className="large-button" onClick={getItems}>
          Load Inventory
        </button>
        {itemsList.length === 0 ? (
          <div></div>
        ) : (
          <div className="columns">
            <h4>Item ID</h4>
            <h4>Name</h4>
            <h4>Quantity</h4>
            <h4>Unit Price</h4>
            <h4>Location</h4>
            <h4>Last Update</h4>

            <h4></h4>
          </div>
        )}
        {itemsList.map((val, key) => {
          return (
            <Item
              key={val.id}
              id={val.id}
              name={val.name}
              quantity={val.quantity}
              unitValue={val.unitValue}
              location={val.location}
              lastUpdate={val.updatedAt.substring(0, 10)}
              refresh={getItems}
            />
          );
        })}
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
