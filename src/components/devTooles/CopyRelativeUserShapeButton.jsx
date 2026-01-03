import CopyShapeButton from "./CopyShapeButton";
import { absoluteToRelative } from "./absoluteToRelative";

const CopyRelativeUserShapeButton = (props) => (
  <CopyShapeButton
    {...props}
    label="Copy Relative User Shape"
    transform={absoluteToRelative}
  />
);

export default CopyRelativeUserShapeButton;
