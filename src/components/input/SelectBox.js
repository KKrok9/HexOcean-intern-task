import "../../styles/selectBox.css";
const SelectBox = (props) => {
  return (
    <div className="selectBox-container">
      <select
        className="selectBox-select"
        onChange={props.onChange}
        name={props.name}
        required
      >
        {props.dishes.map((dish, index) => (
          <option key={index} value={dish.name}>
            {dish.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
