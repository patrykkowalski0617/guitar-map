const enharmonicTransform = (text) => {
  const map = {
    "A#m": "Bbm",
    "A#": "Bb",
    "D#": "Eb",
    "G#": "Ab",
    "C#": "Db",
  };

  const pattern = new RegExp(Object.keys(map).join("|"), "g");

  return text.replace(pattern, (matched) => map[matched]);
};

export default enharmonicTransform;
