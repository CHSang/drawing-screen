import RadioGroup from "../RadioGroup";
import { DATA } from "./Data";
const PaintingBrush = ({ onChange, selectedItem }) => {
  return (
    <RadioGroup
      title="Painting brush type"
      groupName="paintingBrush"
      onChange={onChange}
      selectedItem={selectedItem}
      data={DATA}
    />
  );
};

export default PaintingBrush;
