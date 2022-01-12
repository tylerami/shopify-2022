import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Item from "./components/Item.jsx";
import InventoryForm from "./components/InventoryForm";

function App() {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    getItems();
    getLocations();
  }, []);

  // REMOVE ///////////////////////////////////////////////////////

  const [locationList, setlocationList] = useState([]);

  const resetValues = async () => {
    console.log("RESETTING VALUES");
    const items = [
      {
        name: "Snowboard",
        quantity: "23",
        unitValue: "133.34",
        location: "Warehouse 1",
      },
      {
        name: "Snowboard",
        quantity: "6",
        unitValue: "133.34",
        location: "Warehouse 3",
      },
      {
        name: "Skiis",
        quantity: "1232",
        unitValue: "435.35",
        location: "Warehouse 3",
      },
      {
        name: "Sleds",
        quantity: "43",
        unitValue: "243.95",
        location: "Warehouse 2",
      },
      { name: "Backpack", quantity: "9", unitValue: "96.55", location: "" },
      {
        name: "Snowshoe",
        quantity: "42",
        unitValue: "87.65",
        location: "Warehouse 1",
      },
      {
        name: "Snowshoe",
        quantity: "12",
        unitValue: "87.65",
        location: "Warehouse 2",
      },
      { name: "Snowshoe", quantity: "235", unitValue: "87.65", location: "" },
      {
        name: "Boots",
        quantity: "123",
        unitValue: "45.45",
        location: "Warehouse 2",
      },
      {
        name: "Boots",
        quantity: "23",
        unitValue: "53.45",
        location: "Warehouse 2",
      },
      { name: "Helmet", quantity: "76", unitValue: "34.43", location: "" },
      {
        name: "Jacket",
        quantity: "765",
        unitValue: "499.99",
        location: "Warehouse 1",
      },
      {
        name: "Jacket",
        quantity: "35",
        unitValue: "499.99",
        location: "Warehouse 2",
      },
    ];

    const locations = [
      { name: "Warehouse 1", city: "Toronto", address: "123 Shopify St." },
      { name: "Warehouse 2", city: "Mississauga", address: "345 Merchant Rd." },
      { name: "Warehouse 3", city: "London", address: "8 Commerce Ave." },
    ];

    getItems();
    itemsList.forEach((item) => {
      Axios.delete("https://shopify-2022-backend.herokuapp.com/deleteItem", {
        data: {
          id: item.id,
        },
      });
    });

    getLocations();
    locationList.forEach((loc) => {
      Axios.delete(
        "https://shopify-2022-backend.herokuapp.com/deleteLocation",
        {
          data: {
            id: loc.id,
          },
        }
      );
    });

    items.forEach((item) => {
      createItem(item.name, item.quantity, item.unitValue, item.location);
    });

    locations.forEach((loc) => {
      createLocation(loc.name, loc.city, loc.address);
    });
  };

  const createItem = (name, quantity, unitValue, location) => {
    Axios.post("https://shopify-2022-backend.herokuapp.com/createItem", {
      name: name,
      quantity: quantity,
      unitValue: unitValue,
      location: location,
    })
      .then((response) => {
        getItems();
      })
      .catch((err) => {
        console.log(err.toString() + +" " + name);
      });
  };

  const getLocations = () => {
    Axios.get("https://shopify-2022-backend.herokuapp.com/getLocations")
      .then((response) => {
        setlocationList(response.data);
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  const createLocation = (name, city, address) => {
    Axios.post("https://shopify-2022-backend.herokuapp.com/createLocation", {
      name: name,
      city: city,
      address: address,
    });
  };

  // REMOVE////////////////////////////////////////////
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
        <button className="large-button" onClick={resetValues}>
          Load Inventory
        </button>
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
