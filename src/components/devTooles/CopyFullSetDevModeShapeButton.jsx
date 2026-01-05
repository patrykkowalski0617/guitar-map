import { useState } from "react";
import { useStore } from "../../store/useStore";
import { absoluteToRelative } from "./absoluteToRelative";
import { Button } from "../../parts";

const CopyFullSetDevModeShapeButton = ({
  devModeShape,
  handleClearDevModeShape,
}) => {
  const [copied, setCopied] = useState(false);
  const getActiveChordGroup = useStore((state) => state.getActiveChordGroup);

  const handleCopy = async () => {
    if (!devModeShape || devModeShape.length === 0) return;

    const currentGroup = getActiveChordGroup();
    if (!currentGroup) {
      console.error("No active chord group found");
      return;
    }

    const currentIds = currentGroup.shapes.map((s) => {
      const parts = s.id.split("_");
      return parseInt(parts[parts.length - 1], 10) || 0;
    });
    const nextStartNumber = Math.max(...currentIds, 0) + 1;

    const relativeShape = absoluteToRelative(devModeShape);

    const generatedShapesArray = ["E1", "A2", "D3", "G4", "B5", "E6"].map(
      (stringId, index) => ({
        id: `${currentGroup.id}_${nextStartNumber + index}`,
        targetString: stringId,
        shape: relativeShape,
      })
    );

    const formattedOutput = generatedShapesArray
      .map((obj) => JSON.stringify(obj, null, 2))
      .join(",\n");

    try {
      await navigator.clipboard.writeText(formattedOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      handleClearDevModeShape();
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  };

  return (
    <Button onClick={handleCopy} $variant="dev">
      {copied ? "Full Set Copied!" : "Copy Full Set (All Strings)"}
    </Button>
  );
};

export default CopyFullSetDevModeShapeButton;
