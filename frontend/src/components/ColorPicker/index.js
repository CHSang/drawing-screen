import RadioGroup from "../RadioGroup";
import { DATA } from "./Data";

const ColorPicker = ({ onChange, selectedItem }) => {
  return (
    <RadioGroup
      title="Painting brush color"
      groupName="colorPicker"
      onChange={onChange}
      selectedItem={selectedItem}
      data={DATA}
    />
  );
};

export default ColorPicker;
