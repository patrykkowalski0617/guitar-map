export const CAGED = {
  C: {},
  A: {},
  G: {},
  E: {},
  D: {},
};

export const NOTES_FROM_C = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const getNotesStartingFrom = (tuneNote, notesArray = NOTES_FROM_C) => {
  const startIndex = notesArray.indexOf(tuneNote);

  if (startIndex === -1) {
    throw new Error(`Note "${tuneNote}" not exist in data base`);
  }

  return [...notesArray.slice(startIndex), ...notesArray.slice(0, startIndex)];
};

export const UNIFIED_MUSIC_KEYS = NOTES_FROM_C.map((majorNote, index) => {
  const minorNoteIndex = (index + 9) % NOTES_FROM_C.length;
  const minorNote = NOTES_FROM_C[minorNoteIndex];
  const scalePair = `${majorNote}/${minorNote}m`;

  const replacements = {
    "D#/Cm": "Eb/Cm",
    "G#/Fm": "Ab/Fm",
    "C#/A#m": "Db/Bbm",
  };

  return replacements[scalePair] || scalePair;
});

// SIGATURES

// INTERVAL TEMPLATES

// OLD CODE

export const INTERVAL_NAMES = [
  "1",
  "m2",
  "M2",
  "m3",
  "M3",
  "4",
  "4#",
  "5",
  "m6",
  "M6",
  "m7",
  "M7",
  "_8",
  "m9",
  "M9",
  "m10",
  "M10",
  "11",
  "11#",
  "12",
  "m13",
  "M13",
  "m14",
  "M14",
];

export const [
  _1,
  m2,
  M2,
  m3,
  M3,
  _4,
  b5,
  _5,
  m6,
  M6,
  m7,
  M7,
  _8,
  m9,
  M9,
  m10,
  M10,
  _11,
  b12,
  _12,
  m13,
  M13,
  m14,
  M14,
] = INTERVAL_NAMES;

export const chordTypesSigntures = {
  M: "M",
  M7: "M7",
  M_add9: "M(add9)",
  Dominant: "Dominant",
  m7b5: "m7b5",
  dim7: "dim7",
  m: "m",
  m7: "m7",
  m_M7: "m(M7)",
  m_add9: "m(add9)",
  m_69: "m69",
};

export const scales = {
  ionian: {
    name: "Ionian",
    modeNum: 1,
    intervalTemplate: [_1, M2, M3, _4, b5, M6, M7],
  },
  dorian: {
    name: "Dorian",
    modeNum: 2,
    intervalTemplate: [_1, M2, m3, _4, b5, M6, m7],
  },
  phrygian: {
    name: "Phrygian",
    modeNum: 3,
    intervalTemplate: [_1, m2, m3, _4, b5, m6, m7],
  },
  lydian: {
    name: "Lydian",
    modeNum: 4,
    intervalTemplate: [_1, M2, M3, _4, b5, M6, M7],
  },
  mixolydian: {
    name: "Mixolydian",
    modeNum: 5,
    intervalTemplate: [_1, M2, M3, _4, b5, M6, m7],
  },
  aeolian: {
    name: "Aeolian",
    modeNum: 6,
    intervalTemplate: [_1, M2, m3, _4, b5, m6, m7],
  },
  locrian: {
    name: "Locrian",
    modeNum: 7,
    intervalTemplate: [_1, m2, m3, _4, b5, m6, m7],
  },
  phrygianDominant: {
    name: "Phrygian Dominant",
    modeNum: 3,
    intervalTemplate: [_1, m2, M3, _4, b5, m6, m7],
  },
  pent_m: {
    name: "Minor Pentatonic",
    modeNum: 6,
    intervalTemplate: [_1, m3, _4, _5, m6, m7],
  },
  pent_M: {
    name: "Major Pentatonic",
    modeNum: 1,
    intervalTemplate: [],
  },
};

export const {
  ionian,
  dorian,
  phrygian,
  lydian,
  mixolydian,
  aeolian,
  locrian,
  phrygianDominant,
  pent_m,
  pent_M,
} = scales;

export const intervalTemplates = {};

export const noAvoidNotesTempltes = {
  T: [_1, M2, M3, _5, M6, M7],
  t: [_1, M2, m3, _4, _5, m7],
  S: [],
  D: [],
  Ph: [],
};

export const chordIntervalTemplates = {
  M: {
    triad: [_1, M3, _5],
    M7: [_1, M3, _5, M7],
    M9: [_1, M3, _5, M7, M9],
    add9: [_1, M3, _5, M9],
  },
  D: { _7: [_1, M3, _5, m7] },
  m: {
    triad: [_1, m3, _5],
    m7: [_1, m3, _5, m7],
    M9: [_1, m3, _5, m7, M9],
    M7: [_1, m3, _5, M7],
    add9: [_1, m3, _5, M9],
    _69: [_1, m3, M6, M9],
    m7b5: [_1, m3, b5, m7],
    dim7: [_1, m3, b5, M6],
  },
};

export const { M, D, m } = chordIntervalTemplates;

export const MUSIC_FUCTIONS = {
  Tonics: {
    Major: {
      Triad: M.triad,
      M7: M.M7,
      M9: M.M9,
      add9: M.add9,
      "Uper structure": m.m7,
      "No avoid notes": noAvoidNotesTempltes.T,
      "Major pentatonic": pent_M.intervalTemplate,
    },
    minor: {
      Triad: m._,
      m7: m._7,
      M9: m._9,
      "Uper structure": M._M7,
      "No avoid notes": noAvoidNotesTempltes.T,
      "Minor pentatonic": pent_m.intervalTemplate,
      add9: m.add9,
      _69: m._69,
    },
  },
  Subdominants: {
    Major: {
      Triad: [],
      _9: chordIntervalTemplates.M,
      "Uper structure": [],
      _7: chordIntervalTemplates.M,
      "No avoid notes": [],
      "Minor pentatonic": [],
      add9: [],
      _69: [],
    },
    minor: {
      Triad: [],
      7: [],
      9: [],
      "Uper structure": [],
      "No avoid notes": [],
      "Minor pentatonic": [],
      add9: [],
      69: [],
    },
  },
  Dominants: {
    Mixolydian: {
      Triad: [],
      7: [],
      9: [],
      "Uper structure": [],
      "No avoid notes": [],
      pent_M: [],
      add9: [],
      69: [],
      "Minor pentatonic": [],
    },
    Phrygian: {
      Triad: [],
      _7: [],
      _9: [],
      "Uper structure": [],
      "No avoid notes": [],
      "Minor pentatonic": [],
      add9: [],
      69: [],
    },
  },
  Mediant: {
    all: {
      Triad: [],
      _7: [],
      _9: [],
      "Uper structure": [],
      "No avoid notes": [],
      add9: [],
      69: [],
    },
  },
};

export const { Tonics, Subdominants, Dominants, Mediant } = MUSIC_FUCTIONS;

export const MUSIC_FUCTIONS_NAMES = Object.keys(MUSIC_FUCTIONS);
