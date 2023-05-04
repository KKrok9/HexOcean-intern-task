import React from "react";
import "../../styles/form.css";
import { useState } from "react";
import SelectBox from "../input/SelectBox";
import ConditionalInputs from "../input/ConditionalInputs";
import { API_URL } from "../../constants/api";
const dishes = [
  {
    name: "pizza",
    id: 1,
    options: ["Number of slices", "Diameter"],
    additionalDataNames: ["pizzaSlices", "pizzaDiameter"],
  },
  {
    name: "soup",
    id: 2,
    options: ["Spiciness scale"],
    additionalDataNames: ["soupSpiciness"],
  },
  {
    name: "sandwich",
    id: 3,
    options: ["Slices of bread"],
    additionalDataNames: ["sandwichSlicesOfBread"],
  },
];

const Form = () => {
  const [requiredFormData, setRequiredFormData] = useState({
    dishName: "",
    dishPreparationTime: "",
    dishType: "pizza",
  });

  const [dataFromConditionalInput, setDataFromConditionalInput] = useState("");
  const handleDataFromConditionalInput = (data) => {
    setDataFromConditionalInput(data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRequiredFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const createToSendObject = () => {
    const baseObject = {
      name: requiredFormData.dishName,
      preparation_time: requiredFormData.dishPreparationTime,
      type: requiredFormData.dishType,
    };

    if (requiredFormData.dishType === "pizza") {
      return {
        ...baseObject,
        no_of_slices: dataFromConditionalInput.pizzaSlices,
        diameter: dataFromConditionalInput.pizzaDiameter,
        id: dishes[0].id,
      };
    } else if (requiredFormData.dishType === "soup") {
      return {
        ...baseObject,
        spiciness_scale: dataFromConditionalInput.soupSpiciness,
        id: dishes[1].id,
      };
    } else if (requiredFormData.dishType === "sandwich") {
      return {
        ...baseObject,
        slices_of_bread: dataFromConditionalInput.sandwichSlicesOfBread,
        id: dishes[2].id,
      };
    }
  };

  async function registerUser() {
    const toSendObject = createToSendObject();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSendObject),
      });
      const data = await response.json();
      console.log("Data submitted !", data);
    } catch (error) {
      console.error("Error occurred while submitting data", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-header">Order Form</p>
        <div className="form-elements">
          <label className="form-label">Dish name</label>
          <input
            className="form-input"
            name="dishName"
            value={requiredFormData.dishName}
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="form-elements">
          <label className="form-label">Preparation time</label>
          <input
            className="form-input"
            type="time"
            step="2"
            name="dishPreparationTime"
            value={requiredFormData.dishPreparationTime}
            onChange={handleInputChange}
            required
          ></input>
        </div>
        <div className="form-elements">
          <label className="form-label">Type</label>
          <SelectBox
            dishes={dishes}
            name="dishType"
            value={requiredFormData.dishType}
            onChange={handleInputChange}
            required
          ></SelectBox>
        </div>
        <div className="form-elements conditional-form-elements">
          <ConditionalInputs
            selectedDish={requiredFormData.dishType}
            dishes={dishes}
            className="form-elements"
            onChange={handleDataFromConditionalInput}
            required
          ></ConditionalInputs>
        </div>
        <button className="order-btn">Order</button>
      </form>
    </div>
  );
};
export default Form;
