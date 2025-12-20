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

export const scales = {
  ionian: {
    name: "Ionian",
    modeNum: 1,
    intervals: [_1, M2, M3, _4, b5, M6, M7],
  },
  dorian: {
    name: "Dorian",
    modeNum: 2,
    intervals: [_1, M2, m3, _4, b5, M6, m7],
  },
  phrygian: {
    name: "Phrygian",
    modeNum: 3,
    intervals: [_1, m2, m3, _4, b5, m6, m7],
  },
  lydian: {
    name: "Lydian",
    modeNum: 4,
    intervals: [_1, M2, M3, _4, b5, M6, M7],
  },
  mixolydian: {
    name: "Mixolydian",
    modeNum: 5,
    intervals: [_1, M2, M3, _4, b5, M6, m7],
  },
  aeolian: {
    name: "Aeolian",
    modeNum: 6,
    intervals: [_1, M2, m3, _4, b5, m6, m7],
  },
  locrian: {
    name: "Locrian",
    modeNum: 7,
    intervals: [_1, m2, m3, _4, b5, m6, m7],
  },
  phrygianDominant: {
    name: "Phrygian Dominant",
    modeNum: 3,
    intervals: [_1, m2, M3, _4, b5, m6, m7],
  },
  pent_m: {
    name: "Minor Pentatonic",
    modeNum: 6,
    intervals: [_1, m3, _4, _5, m6, m7],
  },
  pent_M: {
    name: "Major Pentatonic",
    modeNum: 1,
    intervals: [],
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

export const noAvoidNotes = {
  T: [_1, m2, M2, m3, M3, b5, _5, m6, M6, m7, M7],
  S: [],
  D: [],
  Ph: [],
};

export const chordTemplates = {
  M: {
    _: [_1, M3, _5],
    _M7: [_1, M3, _5, M7],
    _M9: [_1, M3, _5, M7, M9],
    _add9: [_1, M3, _5, M9],
  },
  D: { _7: [_1, M3, _5, m7] },
  m: {
    _7b5: [_1, m3, b5, m7],
    _dim7: [_1, m3, b5, M6],
    _: [_1, m3, _5],
    _7: [_1, m3, _5, m7],
    __M7: [_1, m3, _5, M7],
    _add9: [_1, m3, _5, M9],
    _69: [_1, m3, M6, M9],
  },
};

export const { M, D, m } = chordTemplates;

export const MUSIC_FUCTIONS = {
  Tonics: {
    M: {
      sets: {
        triand: M._,
        _7: M._M7,
        _9: M._9,
        _add9: M._add9,
        up: m._7,
        noAvoidNotes: noAvoidNotes.T,
        pent_M: pent_M.intervals,
      },
    },
    m: {
      sets: {
        triand: m._,
        _7: m._7,
        _9: m._9,
        up: M._M7,
        noAvoidNotes: noAvoidNotes.T,
        pent_m: pent_m.intervals,
        add9: m._add9,
        _69: m._69,
      },
    },
  },
  Subdominants: {
    M: {
      sets: {
        triand: [],
        _9: chordTemplates.M,
        up: [],
        _7: chordTemplates.M,
        noAvoidNotes: [],
        pent_m: [],
        add9: [],
        _69: [],
      },
    },
    m: {
      sets: {
        triand: [],
        _7: [],
        _9: [],
        up: [],
        noAvoidNotes: [],
        pent_m: [],
        add9: [],
        _69: [],
      },
    },
  },
  Dominants: {
    mixo: {
      sets: {
        triand: [],
        _7: [],
        _9: [],
        up: [],
        noAvoidNotes: [],
        pent_M: [],
        add9: [],
        _69: [],
        pent_m: [],
      },
    },
    ph: {
      sets: {
        triand: [],
        _7: [],
        _9: [],
        up: [],
        noAvoidNotes: [],
        pent_m: [],
        add9: [],
        _69: [],
      },
    },
  },
  Mediant: {
    sets: {
      triand: [],
      _7: [],
      _9: [],
      up: [],
      noAvoidNotes_pent_m: [],
      add9: [],
      _69: [],
    },
  },
};

export const { Tonics, Subdominants, Dominants, Mediant } = MUSIC_FUCTIONS;

export const MUSIC_FUCTIONS_NAMES = Object.keys(MUSIC_FUCTIONS);

// export const getNotesStartingFrom = (tuneNote, notesArray = NOTES_FROM_C) => {
//   const startIndex = notesArray.indexOf(tuneNote);

//   if (startIndex === -1) {
//     throw new Error(`Note "${tuneNote}" not exist in data base`);
//   }

//   return [...notesArray.slice(startIndex), ...notesArray.slice(0, startIndex)];
// };
