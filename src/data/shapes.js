import { _1, _4, _5, _M2, _M3, _m6, _M6, _M7 } from "./music-theory";

export const CAGEDshapes = {
  C: [
    "E1_B",
    "E1_C",
    "A2_E",
    "A2_F",
    "D3_A",
    "G4_D",
    "B5_F#",
    "E6_B",
    "E1_C#",
    "E1_D",
    "A2_G",
    "D3_C",
    "B5_A",
    "E6_D",
    "G4_F",
    "A2_F#",
    "D3_B",
    "G4_E",
    "B5_G#",
    "E6_C#",
    "E6_C",
    "B5_G",
    "G4_D#",
    "D3_A#",
  ],
  A: [
    "E1_A",
    "A2_D",
    "D3_G",
    "G4_C",
    "B5_E",
    "E6_A",
    "E6_A#",
    "G4_B",
    "D3_B",
    "E1_C",
    "E1_B",
    "E1_A#",
    "A2_D#",
    "A2_E",
    "A2_F",
    "D3_A#",
    "D3_A",
    "D3_G#",
    "G4_C#",
    "B5_F",
    "B5_F#",
    "G4_D",
    "E6_B",
    "E6_C",
    "B5_G",
    "G4_D#",
  ],
  G: [
    "E1_F",
    "E1_F#",
    "E1_G",
    "E1_G#",
    "E1_A",
    "A2_B",
    "A2_C",
    "A2_C#",
    "D3_E",
    "D3_F",
    "D3_F#",
    "A2_D",
    "D3_G",
    "G4_A",
    "G4_A#",
    "G4_B",
    "G4_C",
    "B5_C#",
    "B5_D",
    "B5_D#",
    "B5_E",
    "E6_F",
    "E6_F#",
    "E6_G",
    "E6_G#",
    "E6_A",
  ],
  E: [
    "E1_E",
    "E1_F",
    "E1_F#",
    "E1_G",
    "A2_A",
    "A2_A#",
    "A2_B",
    "A2_C",
    "D3_D",
    "D3_D#",
    "D3_E",
    "D3_F",
    "G4_G",
    "G4_G#",
    "G4_A",
    "G4_A#",
    "B5_B",
    "B5_C",
    "B5_C#",
    "B5_D",
    "E6_E",
    "E6_F",
    "E6_F#",
    "E6_G",
  ],
  D: [
    "E1_D",
    "E1_D#",
    "E1_E",
    "E1_F",
    "A2_G",
    "D3_B",
    "D3_C",
    "A2_G#",
    "D3_C#",
    "A2_A",
    "D3_D",
    "A2_A#",
    "A2_B",
    "D3_D#",
    "G4_F",
    "G4_F#",
    "G4_G",
    "G4_G#",
    "B5_A",
    "B5_A#",
    "B5_B",
    "B5_C",
    "E6_D",
    "E6_D#",
    "E6_E",
    "E6_F",
  ],
};

export const chordShapes = [
  {
    id: "M",
    label: "Major",
    rootIntervals: [_1, _4],
    shapes: [
      ["E1_A", "E1_C#", "A2_E", "D3_A"],
      ["E1_A", "A2_C#", "A2_E", "D3_A"],
      ["E1_A", "A2_C#", "D3_E", "G4_A"],
    ],
  },
  {
    id: "M7",
    label: "Major 7th",
    rootIntervals: [_1, _4],
    shapes: [
      ["E1_G", "E1_B", "A2_D", "D3_F#", "D3_G"],
      ["E1_C", "A2_E", "A2_G", "D3_B", "D3_C"],
      ["E1_C", "A2_E", "D3_G", "D3_B", "G4_C"],
    ],
  },
  {
    id: "M_add9",
    label: "Major add9",
    rootIntervals: [_1, _4],
    shapes: [
      ["E1_G", "E1_A", "E1_B", "A2_D", "D3_G"],
      ["E1_C", "E1_D", "A2_E", "A2_G", "D3_C"],
      ["E1_C", "A2_D", "A2_E", "D3_G", "G4_C"],
    ],
  },
  {
    id: "M9",
    label: "Major 9",
    rootIntervals: [_1, _4],
    shapes: [
      ["E1_G", "E1_A", "E1_B", "A2_D", "D3_F#", "D3_G"],
      ["E1_C", "E1_D", "A2_E", "A2_G", "D3_B", "D3_C"],
      ["E1_C", "A2_D", "A2_E", "D3_G", "D3_B", "G4_C"],
    ],
  },
  {
    id: "Dominant",
    label: "Dominant",
    rootIntervals: [_5],
    shapes: [
      ["E1_G", "E1_B", "A2_D", "D3_F", "D3_G"],
      ["E1_G", "A2_B", "A2_D", "D3_F", "D3_G"],
      ["E1_G", "A2_B", "D3_D", "D3_F", "G4_G"],
    ],
  },
  {
    id: "m7b5",
    label: "m7b5 (Half-dim)",
    rootIntervals: [_M7],
    shapes: [
      ["E1_B", "E1_D", "A2_F", "D3_A", "D3_B"],
      ["E1_B", "A2_D", "D3_F", "D3_A", "G4_D"],
    ],
  },
  {
    id: "dim7",
    label: "Diminished 7",
    shapes: [
      ["E1_B", "E1_D", "A2_F", "A2_G#", "D3_B"],
      ["E1_B", "A2_D", "A2_F", "D3_G#", "D3_B"],
      ["E1_B", "A2_D", "D3_F", "D3_G#", "G4_B"],
    ],
    rootIntervals: [_M7],
  },
  {
    id: "m",
    label: "Minor",
    rootIntervals: [_M6, _M2, _M3],
    shapes: [
      ["E1_A", "E1_C", "A2_E", "D3_A"],
      ["E1_A", "A2_C", "A2_E", "D3_A"],
      ["E1_A", "A2_C", "D3_E", "G4_A"],
    ],
  },
  {
    id: "m7",
    label: "Minor 7th",
    rootIntervals: [_M6, _M2, _M3],
    shapes: [
      ["E1_A", "E1_C", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "A2_C", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "A2_C", "D3_E", "D3_G", "G4_A"],
    ],
  },
  {
    id: "m_M7",
    label: "Minor with Major 7th",
    rootIntervals: [_M6, _M2, _M3],
    shapes: [],
  },
  {
    id: "m_add9",
    label: "Minor add9",
    rootIntervals: [_M6, _M2],
    shapes: [
      ["E1_A", "E1_B", "E1_C", "A2_E", "D3_A"],
      ["E1_A", "E1_B", "A2_C", "A2_E", "D3_A"],
      ["E1_A", "A2_B", "A2_C", "D3_E", "G4_A"],
    ],
  },
  {
    id: "m9",
    label: "Minor 9",
    rootIntervals: [_M6, _M2],
    shapes: [
      ["E1_A", "E1_B", "E1_C", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "E1_B", "A2_C", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "A2_B", "A2_C", "D3_E", "D3_G", "G4_A"],
    ],
  },
  {
    id: "minorPent",
    label: "Minor Pentatonic 9",
    rootIntervals: [_M6],
    shapes: [
      ["E1_A", "E1_C", "A2_D", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "A2_C", "A2_D", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "A2_C", "A2_D", "D3_E", "D3_G", "G4_A"],
    ],
  },
  {
    id: "majorPent",
    label: "Major Pentatonic",
    rootIntervals: [_1],
    shapes: [
      ["E1_G", "E1_A", "E1_B", "A2_D", "A2_E", "D3_G"],
      ["E1_C", "E1_D", "A2_E", "A2_G", "D3_A", "D3_C"],
      ["E1_C", "E1_D", "A2_E", "A2_G", "D3_A", "D3_C"],
    ],
  },
];

export const getShapesByInterval = (semitones) => {
  // Sprawdzamy czy semitones jest liczbą (wliczając 0) oraz czy biblioteka istnieje
  if (typeof semitones !== "number" || !chordShapes) return [];

  // Opcjonalnie: jeśli chcesz, aby np. 12 półtonów (oktawa)
  // również dopasowywało się do interwału _1 (0 półtonów):
  // const normalizedSemitones = semitones % 12;

  return chordShapes.filter((item) => {
    if (!item.rootIntervals) return false;

    // Sprawdzamy, czy którykolwiek z zadeklarowanych interwałów
    // w rootIntervals ma taką samą liczbę półtonów
    return item.rootIntervals.some((interval) => interval[0] === semitones);
  });
};

export const musicFunctionContextSelectorData = [
  {
    FunctionContextName: "Tonics",
    shapes: [
      {
        getNotesSetName: (keyNotes) => `${keyNotes[_1[0]]}M7`,
        CAGED_rootNote: "C",
      },
      {
        getNotesSetName: (keyNotes) => `${keyNotes[_M3[0]]}m7`,
        CAGED_rootNote: "C",
      },
      {
        getNotesSetName: (keyNotes) => `${keyNotes[_M6[0]]}m7`,
        CAGED_rootNote: "A",
      },
      {
        getNotesSetName: (keyNotes) => `${keyNotes[_1[0]]}M(add9)`,
        CAGED_rootNote: "C",
      },
      {
        getNotesSetName: (keyNotes) => `${keyNotes[_1[0]]} Major pentatonic`,
        CAGED_rootNote: "C",
      },
      {
        getNotesSetName: (keyNotes) => `${keyNotes[_M6[0]]} minor pentatonic`,
        CAGED_rootNote: "A",
      },
      {
        getNotesSetName: () => "No avoid notes",
      },
    ],
  },
  {
    FunctionContextName: "Subdominants",
    shapes: [
      {
        getNotesSetName: () => "M7 / m upper structure",
      },
      {
        getNotesSetName: () => "M upper structure",
      },
      {
        getNotesSetName: () => "m7",
      },
      {
        getNotesSetName: () => "Pentatonic",
      },
      {
        getNotesSetName: () => "No avoid notes",
      },
    ],
  },
  {
    FunctionContextName: "Dominant",
    shapes: [
      {
        getNotesSetName: () => "Dominant (Myxolydian)",
      },
      {
        getNotesSetName: () => "Upper structure",
      },
      {
        getNotesSetName: () => "No avoid notes",
      },
    ],
  },
  {
    FunctionContextName: "Dominant in relative minor key",
    shapes: [
      {
        getNotesSetName: () => "Dominant (Phrygian)",
      },
      {
        getNotesSetName: () => "Upper structure",
      },
    ],
  },
  {
    FunctionContextName: "Phrygian",
    shapes: [
      {
        getNotesSetName: () => "m7",
      },
      {
        getNotesSetName: () => "Pentatonic",
      },
    ],
  },
];
