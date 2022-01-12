import "./components.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import PropTypes from "prop-types";

function InventoryForm(props) {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitValue, setUnitValue] = useState(0);
  const [location, setLocation] = useState("");
  const [locationList, setLocationList] = useState([{ id: 0, name: "" }]);

  useEffect(() => {
    getLocations();
  }, []);

  const [locationName, setLocationName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const createItem = (name, quantity, unitValue, location) => {
    Axios.post("https://shopify-2022-backend.herokuapp.com/createItem", {
      name: name,
      quantity: quantity,
      unitValue: unitValue,
      location: location,
    })
      .then((response) => {
        props.getItems();
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  const getLocations = () => {
    Axios.get("https://shopify-2022-backend.herokuapp.com/getLocations")
      .then((response) => {
        setLocationList([{ id: 0, name: "" }, ...response.data]);
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
    })
      .then((response) => {
        setLocationName("");
        setCity("");
        setAddress("");
        getLocations();
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  return (
    <div className="row">
      <div className="inputs">
        <h3 className="subheader">Add Inventory Items</h3>
        <div className="subdivider"></div>
        <label>
          Name
          <input
            type="text"
            onChange={(event) => setItemName(event.target.value)}
          />
        </label>
        <label>
          Quantity
          <input
            type="number"
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <label>
          Unit Value
          <input
            type="number"
            onChange={(event) => setUnitValue(event.target.value)}
          />
        </label>
        <label>
          Location
          <select onChange={(event) => setLocation(event.target.value)}>
            {locationList.map((val, key) => {
              return (
                <option key={val.id} value={val.name}>
                  {val.name}
                </option>
              );
            })}
          </select>
        </label>
        <button
          className="large-button"
          onClick={() => {
            createItem(itemName, quantity, unitValue, location);
          }}
        >
          Add Item
        </button>
      </div>
      <div className="inputs">
        <h3 className="subheader">Add Location</h3>
        <div className="subdivider"></div>
        <label>
          Name
          <input
            type="text"
            value={locationName}
            onChange={(event) => setLocationName(event.target.value)}
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <button
          className="large-button"
          onClick={() => {
            createLocation(locationName, city, address);
          }}
        >
          Add Location
        </button>
      </div>
    </div>
  );
}

InventoryForm.propTypes = {
  getItems: PropTypes.func,
};

export default InventoryForm;
