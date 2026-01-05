const enharmonicTransform = (text) => {
  const map = {
    "A#m": "Bbm",
    "A#": "Bb",
    "D#": "Eb",
    "G#": "Ab",
    "C#": "Db",
  };

  const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    sortedKeys.map((k) => `${k.replace("#", "\\#")}(?![m])`).join("|"),
    "g"
  );

  return text.replace(pattern, (matched) => map[matched]);
};

export default enharmonicTransform;
