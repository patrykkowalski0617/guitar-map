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

    shapes: [
      ["E1_A", "E1_C#", "A2_E", "D3_A"],
      ["E1_A", "A2_C#", "A2_E", "D3_A"],
      ["E1_A", "A2_C#", "D3_E", "G4_A"],
    ],
  },
  {
    id: "M7",
    label: "Major 7th",

    shapes: [
      ["E1_G", "E1_B", "A2_D", "D3_F#", "D3_G"],
      ["E1_C", "A2_E", "A2_G", "D3_B", "D3_C"],
      ["E1_C", "A2_E", "D3_G", "D3_B", "G4_C"],
    ],
  },
  {
    id: "M_add9",
    label: "Major add9",

    shapes: [
      ["E1_G", "E1_A", "E1_B", "A2_D", "D3_G"],
      ["E1_C", "E1_D", "A2_E", "A2_G", "D3_C"],
      ["E1_C", "A2_D", "A2_E", "D3_G", "G4_C"],
    ],
  },
  {
    id: "M9",
    label: "Major 9",

    shapes: [
      ["E1_G", "E1_A", "E1_B", "A2_D", "D3_F#", "D3_G"],
      ["E1_C", "E1_D", "A2_E", "A2_G", "D3_B", "D3_C"],
      ["E1_C", "A2_D", "A2_E", "D3_G", "D3_B", "G4_C"],
    ],
  },
  {
    id: "Dominant",
    label: "Dominant",

    shapes: [
      ["E1_G", "E1_B", "A2_D", "D3_F", "D3_G"],
      ["E1_G", "A2_B", "A2_D", "D3_F", "D3_G"],
      ["E1_G", "A2_B", "D3_D", "D3_F", "G4_G"],
    ],
  },
  {
    id: "m7b5",
    label: "m7b5 (Half-dim)",

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
  },
  {
    id: "m",
    label: "Minor",

    shapes: [
      ["E1_A", "E1_C", "A2_E", "D3_A"],
      ["E1_A", "A2_C", "A2_E", "D3_A"],
      ["E1_A", "A2_C", "D3_E", "G4_A"],
    ],
  },
  {
    id: "m7",
    label: "Minor 7th",

    shapes: [
      ["E1_A", "E1_C", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "A2_C", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "A2_C", "D3_E", "D3_G", "G4_A"],
    ],
  },
  {
    id: "m_M7",
    label: "Minor with Major 7th",

    shapes: [],
  },
  {
    id: "m_add9",
    label: "Minor add9",

    shapes: [
      ["E1_A", "E1_B", "E1_C", "A2_E", "D3_A"],
      ["E1_A", "E1_B", "A2_C", "A2_E", "D3_A"],
      ["E1_A", "A2_B", "A2_C", "D3_E", "G4_A"],
    ],
  },
  {
    id: "m9",
    label: "Minor 9",

    shapes: [
      ["E1_A", "E1_B", "E1_C", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "E1_B", "A2_C", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "A2_B", "A2_C", "D3_E", "D3_G", "G4_A"],
    ],
  },
  {
    id: "minorPent",
    label: "Minor Pentatonic 9",

    shapes: [
      ["E1_A", "E1_C", "A2_D", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "A2_C", "A2_D", "A2_E", "D3_G", "D3_A"],
      ["E1_A", "A2_C", "A2_D", "D3_E", "D3_G", "G4_A"],
    ],
  },
  {
    id: "majorPent",
    label: "Major Pentatonic",

    shapes: [
      ["E1_G", "E1_A", "E1_B", "A2_D", "A2_E", "D3_G"],
      ["E1_C", "E1_D", "A2_E", "A2_G", "D3_A", "D3_C"],
      ["E1_C", "E1_D", "A2_E", "A2_G", "D3_A", "D3_C"],
    ],
  },
];

export const NEW_chordShapes = [
  {
    id: "M",
    label: "Major",
    shapes: [
      [
        [0, 0],
        [0, 4],
        [1, 7],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 4],
        [1, 7],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 4],
        [2, 7],
        [3, 12],
      ],
    ],
  },
  {
    id: "M7",
    label: "Major 7th",
    shapes: [
      [
        [0, 0],
        [0, 4],
        [1, 7],
        [2, 11],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 4],
        [1, 7],
        [2, 11],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 4],
        [2, 7],
        [2, 11],
        [3, 12],
      ],
    ],
  },
  {
    id: "M_add9",
    label: "Major add9",
    shapes: [
      [
        [0, 0],
        [0, 2],
        [0, 4],
        [1, 7],
        [2, 12],
      ],
      [
        [0, 0],
        [0, 2],
        [1, 4],
        [1, 7],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 2],
        [1, 4],
        [2, 7],
        [3, 12],
      ],
    ],
  },
  {
    id: "M9",
    label: "Major 9",
    shapes: [
      [
        [0, 0],
        [0, 2],
        [0, 4],
        [1, 7],
        [2, 11],
        [2, 12],
      ],
      [
        [0, 0],
        [0, 2],
        [1, 4],
        [1, 7],
        [2, 11],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 2],
        [1, 4],
        [2, 7],
        [2, 11],
        [3, 12],
      ],
    ],
  },
  {
    id: "Dominant",
    label: "Dominant",
    shapes: [
      [
        [0, 0],
        [0, 4],
        [1, 7],
        [2, 10],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 4],
        [1, 7],
        [2, 10],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 4],
        [2, 7],
        [2, 10],
        [3, 12],
      ],
    ],
  },
  {
    id: "m7b5",
    label: "m7b5 (Half-dim)",
    shapes: [
      [
        [0, 0],
        [0, 3],
        [1, 6],
        [2, 10],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 3],
        [2, 6],
        [2, 10],
        [3, 15],
      ],
    ],
  },
  {
    id: "dim7",
    label: "Diminished 7",
    shapes: [
      [
        [0, 0],
        [0, 3],
        [1, 6],
        [1, 9],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 3],
        [1, 6],
        [2, 9],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 3],
        [2, 6],
        [2, 9],
        [3, 12],
      ],
    ],
  },
  {
    id: "m",
    label: "Minor",
    shapes: [
      [
        [0, 0],
        [0, 3],
        [1, 7],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 3],
        [1, 7],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 3],
        [2, 7],
        [3, 12],
      ],
    ],
  },
  {
    id: "m7",
    label: "Minor 7th",
    shapes: [
      [
        [0, 0],
        [0, 3],
        [1, 7],
        [2, 10],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 3],
        [1, 7],
        [2, 10],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 3],
        [2, 7],
        [2, 10],
        [3, 12],
      ],
    ],
  },
  {
    id: "m_M7",
    label: "Minor with Major 7th",
    shapes: [],
  },
  {
    id: "m_add9",
    label: "Minor add9",
    shapes: [
      [
        [0, 0],
        [0, 2],
        [0, 3],
        [1, 7],
        [2, 12],
      ],
      [
        [0, 0],
        [0, 2],
        [1, 3],
        [1, 7],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 2],
        [1, 3],
        [2, 7],
        [3, 12],
      ],
    ],
  },
  {
    id: "m9",
    label: "Minor 9",
    shapes: [
      [
        [0, 0],
        [0, 2],
        [0, 3],
        [1, 7],
        [2, 10],
        [2, 12],
      ],
      [
        [0, 0],
        [0, 2],
        [1, 3],
        [1, 7],
        [2, 10],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 2],
        [1, 3],
        [2, 7],
        [2, 10],
        [3, 12],
      ],
    ],
  },
  {
    id: "minorPent",
    label: "Minor Pentatonic 9",
    shapes: [
      [
        [0, 0],
        [0, 3],
        [1, 5],
        [1, 7],
        [2, 10],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 3],
        [1, 5],
        [1, 7],
        [2, 10],
        [2, 12],
      ],
      [
        [0, 0],
        [1, 3],
        [1, 5],
        [2, 7],
        [2, 10],
        [3, 12],
      ],
    ],
  },
  {
    id: "majorPent",
    label: "Major Pentatonic",
    shapes: [
      [
        [0, 0],
        [0, 2],
        [0, 4],
        [1, 7],
        [1, 9],
        [2, 12],
      ],
      [
        [0, 0],
        [0, 2],
        [1, 4],
        [1, 7],
        [2, 9],
        [2, 12],
      ],
      [
        [0, 0],
        [0, 2],
        [1, 4],
        [1, 7],
        [2, 9],
        [2, 12],
      ],
    ],
  },
];

export const musicFunctionContextSelectorData = [
  {
    FunctionContextName: "Tonics",
    shapes: [
      {
        getNotesSetName: (rootNote) => `${rootNote}M7`,
        rootSemitone: _1[0],
        chordShapeId: "M7",
      },
      {
        getNotesSetName: (rootNote) => `${rootNote}m7`,
        rootSemitone: _M3[0],
        chordShapeId: "m7",
      },
      {
        getNotesSetName: (rootNote) => `${rootNote}m7`,
        rootSemitone: _M6[0],
        chordShapeId: "m7",
      },
      {
        getNotesSetName: (rootNote) => `${rootNote}M(add9)`,
        rootSemitone: _1[0],
        chordShapeId: "M_add9",
      },
      {
        getNotesSetName: (rootNote) => `${rootNote} Major pentatonic`,
        rootSemitone: _1[0],
        chordShapeId: "majorPent",
      },
      {
        getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
        rootSemitone: _M6[0],
        chordShapeId: "minorPent",
      },
      {
        getNotesSetName: () => "No avoid notes",
        // brak chordShapeId dla pustych stanów
      },
    ],
  },
  {
    FunctionContextName: "Subdominants",
    shapes: [
      {
        getNotesSetName: () => "M7 / m upper structure",
        rootSemitone: _M2[0], // Zakładam relację II stopnia
        chordShapeId: "M7",
      },
      {
        getNotesSetName: () => "M upper structure",
        rootSemitone: _M2[0],
        chordShapeId: "M",
      },
      {
        getNotesSetName: () => "m7",
        rootSemitone: _M2[0],
        chordShapeId: "m7",
      },
      {
        getNotesSetName: () => "Pentatonic",
        rootSemitone: _M2[0],
        chordShapeId: "minorPent",
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
        rootSemitone: _5[0],
        chordShapeId: "Dominant",
      },
      {
        getNotesSetName: () => "Upper structure",
        rootSemitone: _5[0],
        chordShapeId: "M", // Często US to triad dur
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
        rootSemitone: _M3[0],
        chordShapeId: "Dominant",
      },
      {
        getNotesSetName: () => "Upper structure",
        rootSemitone: _M3[0],
        chordShapeId: "dim7", // Często używane w tym kontekście
      },
    ],
  },
  {
    FunctionContextName: "Phrygian",
    shapes: [
      {
        getNotesSetName: () => "m7",
        rootSemitone: _M3[0],
        chordShapeId: "m7",
      },
      {
        getNotesSetName: () => "Pentatonic",
        rootSemitone: _M3[0],
        chordShapeId: "minorPent",
      },
    ],
  },
];
