import { RadioGroupWrapper } from "./Style";

const RadioGroup = ({ title, groupName, data, onChange, selectedItem }) => {
  return (
    <RadioGroupWrapper>
      <label>{title}</label>
      {data.map((item, index) => (
        <div key={index + item.label}>
          <input
            type="radio"
            value={item.value}
            name={groupName}
            checked={selectedItem === item.value}
            onChange={onChange}
          />
          <label>{item.label}</label>
        </div>
      ))}
    </RadioGroupWrapper>
  );
};

export default RadioGroup;
