import React, { useEffect } from "react";
import "../../styles/conditionalInputs.css";
import { useState } from "react";
// w propsie - selectedDish

const ConditionalInputs = (props) => {
  const [additionalFormData, setAdditionalFormData] = useState({
    pizzaSlices: "",
    pizzaDiameter: "",
    soupSpiciness: "",
    sandwichSlicesOfBread: "",
  });

  const handleAdditionalInputChange = (event) => {
    const { name, value } = event.target;
    setAdditionalFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    props.onChange(additionalFormData);
  }, [additionalFormData, props.onChange]);

  const renderInputs = () => {
    const selectedDishType = props.selectedDish;
    const selectedDishDescription = props.dishes.find(
      (dish) => dish.name === selectedDishType
    );
    return selectedDishDescription.options.map((option, index) => (
      <div className="conditional-items" key={index}>
        <label className="conditional-label">
          {selectedDishDescription.options[index]}
        </label>
        <input
          className="conditional-input"
          onChange={handleAdditionalInputChange}
          name={selectedDishDescription.additionalDataNames[index]}
          value={
            additionalFormData[
              selectedDishDescription.additionalDataNames[index]
            ]
          }
          step={option === "Diameter" ? "any" : 1}
          type="number"
          min={1}
          max={selectedDishType === "soup" ? 10 : undefined}
          required
        ></input>
      </div>
    ));
  };

  return <div className="conditional-inputs-container">{renderInputs()}</div>;
};

export default ConditionalInputs;
