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

export const UNIFIED_MUSIC_KEYS = NOTES_FROM_C.map((majorNote, index) => {
  const minorNoteIndex = (index + 9) % NOTES_FROM_C.length;
  const minorNote = NOTES_FROM_C[minorNoteIndex];

  const originalValue = `${majorNote}/${minorNote}m`;

  const replacements = {
    "D#/Cm": "Eb/Cm",
    "G#/Fm": "Ab/Fm",
    "C#/A#m": "Db/Bbm",
    "A#/Gm": "Bb/Gm",
  };

  const label = replacements[originalValue] || originalValue;

  return {
    majorNote,
    label,
  };
});

export const getNotesStartingFrom = (tuneNote, notesArray = NOTES_FROM_C) => {
  const startIndex = notesArray.indexOf(tuneNote);

  if (startIndex === -1) {
    throw new Error(`Note "${tuneNote}" not exist in data base`);
  }

  return [...notesArray.slice(startIndex), ...notesArray.slice(0, startIndex)];
};

export const intervals = {
  _1: [0, "1"],
  _m2: [1, "m2"],
  _M2: [2, "M2"],
  _m3: [3, "m3"],
  _M3: [4, "M3"],
  _4: [5, "4"],
  _T: [6, "T"],
  _5: [7, "5"],
  _m6: [8, "m6"],
  _M6: [9, "M6"],
  _m7: [10, "m7"],
  _M7: [11, "M7"],
  _8: [12, "8"],
  _m9: [13, "m9"],
  _M9: [14, "M9"],
  _m10: [15, "m10"],
  _M10: [16, "M10"],
  _11: [17, "11"],
  _TT: [18, "TT"],
  _12: [19, "12"],
  _m13: [20, "m13"],
  _M13: [21, "M13"],
  _m14: [22, "m14"],
  _M14: [23, "M14"],
};
export const {
  _1,
  _m2,
  _M2,
  _m3,
  _M3,
  _4,
  _T,
  _5,
  _m6,
  _M6,
  _m7,
  _M7,
  _8,
  _m9,
  _M9,
  _m10,
  _M10,
  _11,
  _TT,
  _12,
  _m13,
  _M13,
  _m14,
  _M14,
} = intervals;

export const notesSets = {
  M: { template: [_1, _M3, _5], setName: "M" },
  M7: { template: [_1, _M3, _5, _M7], setName: "M7" },
  M_add9: { template: [_1, _M3, _5, _M9], setName: "M(add9)" },
  Dominant: { template: [_1, _M3, _5, _m7], setName: "Dominant" },
  m7b5: { template: [_1, _m3, _T, _m7], setName: "m7b5" },
  dim7: { template: [_1, _m3, _T, _M6], setName: "dim7" },
  m: { template: [_1, _m3, _5], setName: "m" },
  m7: { template: [_1, _m3, _5, _m7], setName: "m7" },
  m_M7: { template: [_1, _m3, _5, _M7], setName: "m(M7)" },
  m_add9: { template: [_1, _m3, _5, _M9], setName: "m(add9)" },
  set_T_S: { template: [_1, _M2, _M3, _5, _M6, _M7], setName: "set-T" },
  set_D: { template: [_1, _M2, _M3, _5, _M6, _m7], setName: "set-D" },
  pent: { template: [_1, _M2, _M3, _5, _M6], setName: "pentatonic" },
};

export const {
  M,
  M7,
  M_add9,
  Dominant,
  m7b5,
  dim7,
  m,
  m7,
  m_M7,
  m_add9,
  set_T_S,
  set_D,
  pent,
} = notesSets;

export const notesSetsInFunctionContexts = [
  {
    FunctionContextName: "Tonics",

    notesSets: [
      {
        getNotesSetName: (keyNotes) =>
          `${keyNotes[_1[0]]}M7 / ${keyNotes[_M6[0]]}m upper structure`,
        notesSets: M7,
        keyDegree: _1,
        notesMarkers: [
          {
            getMarkerName: (keyNotes) =>
              `${keyNotes[_1[0]]}M7 1 / ${keyNotes[_M6[0]]}m 3`,
            keyDegree: _1,
          },
          {
            getMarkerName: (keyNotes) =>
              `${keyNotes[_1[0]]}M7 3 / ${keyNotes[_M6[0]]}m 5`,
            keyDegree: _M3,
          },
          {
            getMarkerName: (keyNotes) =>
              `${keyNotes[_1[0]]}M7 5 / ${keyNotes[_M6[0]]}m 7`,
            keyDegree: _5,
          },
          {
            getMarkerName: (keyNotes) =>
              `${keyNotes[_1[0]]}M7 7 / ${keyNotes[_M6[0]]}m 9`,
            keyDegree: _M7,
          },
        ],
      },
      {
        getNotesSetName: (keyNotes) => {
          const txt1 = keyNotes[_1[0]];
          return `${txt1}M7 upper structure`;
        },
        notesSets: m7,
        keyDegree: _M3,
        notesMarkers: [
          { getMarkerName: () => "Major Tonic 3", keyDegree: _M3 },
          { getMarkerName: () => "Major Tonic 5", keyDegree: _M3 },
          { getMarkerName: () => "Major Tonic 7", keyDegree: _M7 },
          { getMarkerName: () => "Major Tonic 9", keyDegree: _M9 },
        ],
      },
      {
        getNotesSetName: (keyNotes) => {
          const txt1 = keyNotes[_M6[0]];
          return `${txt1}m7`;
        },
        notesSets: m7,
        keyDegree: _M6,
        notesMarkers: [
          { getMarkerName: () => "minor Tonic 1", keyDegree: _M6 },
          { getMarkerName: () => "minor Tonic 3", keyDegree: _1 },
          { getMarkerName: () => "minor Tonic 5", keyDegree: _M3 },
          { getMarkerName: () => "minor Tonic 7", keyDegree: _5 },
        ],
      },
      {
        getNotesSetName: (keyNotes) => {
          const txt1 = keyNotes[_1[0]];
          const txt2 = keyNotes[_M6[0]];
          return `${txt1} Major pentatonic / ${txt2} minor pentatonic`;
        },
        notesSets: pent,
        keyDegree: _1,
        notesMarkers: [{ getMarkerName: () => "test", keyDegree: _M3 }],
      },
      {
        getNotesSetName: () => "No avoid notes",
        notesSets: set_T_S,
        keyDegree: _1,
        notesMarkers: [{ getMarkerName: () => "test", keyDegree: _M3 }],
      },
    ],
  },
  {
    FunctionContextName: "Subdominants",
    notesSets: [
      {
        getNotesSetName: () => "M7 / m upper structure",
        notesSets: M7,
        keyDegree: _4,
        notesMarkers: [{ getMarkerName: () => "test", keyDegree: _M3 }],
      },
      {
        getNotesSetName: () => "M upper structure",
        notesSets: m7,
        keyDegree: _M6,
        notesMarkers: [{ getMarkerName: () => "test", keyDegree: _M3 }],
      },
      {
        getNotesSetName: () => "m7",
        notesSets: m7,
        keyDegree: _M2,
        notesMarkers: [{ getMarkerName: () => "test", keyDegree: _M3 }],
      },
      {
        getNotesSetName: () => "Pentatonic",
        notesSets: pent,
        keyDegree: _4,
        notesMarkers: [{ getMarkerName: () => "test", keyDegree: _M3 }],
      },
      {
        getNotesSetName: () => "No avoid notes",
        notesSets: set_T_S,
        keyDegree: _4,
        notesMarkers: [{ getMarkerName: () => "test", keyDegree: _M3 }],
      },
    ],
  },
  {
    FunctionContextName: "Dominant",
    notesSets: [
      {
        getNotesSetName: () => "Dominant (Myxolydian)",
        notesSets: Dominant,
        keyDegree: _5,
        notesMarkers: [{ getMarkerName: () => "test", keyDegree: _M3 }],
      },
      {
        getNotesSetName: () => "Upper structure",
        notesSets: m7b5,
        keyDegree: _M7,
        notesMarkers: [{ getMarkerName: () => "test", keyDegree: _M3 }],
      },
      {
        getNotesSetName: () => "No avoid notes",
        notesSets: set_D,
        keyDegree: _5,
        notesMarkers: [{ getMarkerName: () => "test", keyDegree: _M3 }],
      },
    ],
  },
  {
    FunctionContextName: "Dominant in relative minor key",
    notesSets: [
      {
        getNotesSetName: () => "Dominant (Phrygian)",
        notesSets: Dominant,
        keyDegree: _M3,
      },
      {
        getNotesSetName: () => "Upper structure",
        notesSets: dim7,
        keyDegree: _M7,
      },
    ],
  },
  {
    FunctionContextName: "Phrygian",
    notesSets: [
      {
        getNotesSetName: () => "m7",
        notesSets: m7,
        keyDegree: _M3,
      },
      {
        getNotesSetName: () => "Pentatonic",
        notesSets: pent,
        keyDegree: _5,
      },
    ],
  },
];
