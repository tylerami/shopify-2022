import React from "react";
import PropTypes from "prop-types";
import "./components.css";
import Axios from "axios";
import { useState, useEffect } from "react";

function Item(props) {
  const [name, setName] = useState(props.name);
  const [quantity, setQuantity] = useState(props.quantity);
  const [unitValue, setUnitValue] = useState(props.unitValue);
  const [edit, setEdit] = useState(false);
  const [location, setLocation] = useState(props.location);
  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = () => {
    Axios.get("https://shopify-2022-backend.herokuapp.com/getLocations")
      .then((response) => {
        setLocationList([{ id: 0, name: "" }, ...response.data]);
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  const updateItem = () => {
    Axios.put("https://shopify-2022-backend.herokuapp.com/updateItem", {
      id: props.id,
      name: name,
      quantity: quantity,
      unitValue: unitValue,
    })
      .then(() => {
        console.log("Successfully updated iventory item");
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  const deleteItem = () => {
    Axios.delete("https://shopify-2022-backend.herokuapp.com/deleteItem", {
      data: {
        id: props.id,
      },
    })
      .then(() => {
        console.log("Successfully deleted inventory item");
        props.refresh();
      })
      .catch((err) => {
        console.log(err.toString());
      });
  };

  return edit ? (
    <div className="item">
      <h4 className="field">{props.id}</h4>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      ></input>
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      ></input>
      <input
        type="number"
        placeholder="Unit Value"
        value={unitValue}
        onChange={(event) => setUnitValue(event.target.value)}
      ></input>
      <select
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      >
        {locationList.map((val, key) => {
          return (
            <option key={val.id} value={val.name}>
              {val.name}
            </option>
          );
        })}
      </select>
      <h4 className="field">{props.lastUpdate}</h4>
      <div className="col">
        <button
          className="edit"
          onClick={(event) => {
            updateItem();
            setEdit(!edit);
          }}
        >
          Save
        </button>
        <button
          className="delete"
          onClick={(event) => {
            setEdit(!edit);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className="item">
      <h4 className="field">{props.id}</h4>
      <h4 className="field">{name}</h4>
      <h4 className="field">{quantity}</h4>
      <h4 className="field">${parseFloat(unitValue).toFixed(2)}</h4>
      <h4 className="field">{location}</h4>
      <h4 className="field">{props.lastUpdate}</h4>
      <div className="col">
        <button
          className="edit"
          onClick={(event) => {
            getLocations();
            setEdit(!edit);
          }}
        >
          Edit
        </button>
        <button className="delete" onClick={deleteItem}>
          Delete
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  quantity: PropTypes.number,
  unitValue: PropTypes.number,
  refresh: PropTypes.func,
  lastUpdate: PropTypes.string,
  location: PropTypes.string,
};

export default Item;
