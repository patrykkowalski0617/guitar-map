import CopyShapeButton from "./CopyShapeButton";
import { absoluteToRelative } from "./absoluteToRelative";

const CopyRelativeDevModeShapeButton = (props) => (
  <CopyShapeButton
    {...props}
    label="Copy Relative Shape"
    transform={absoluteToRelative}
  />
);

export default CopyRelativeDevModeShapeButton;
