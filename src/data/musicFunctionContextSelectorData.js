import {
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
} from "./intervals";

import { harmonicFunctionDescription } from ".";

const musicFunctionContextSelectorData = [
  {
    id: "tonics",
    FunctionContextName: "Realese",
    harmonicFunctionDescription: harmonicFunctionDescription.RELEASE,
    majorRoot: _1,
    majorIntervals: [_1, _M3, _5],
    minorRoot: _M6,
    minorIntervals: [_1, _m3, _5],
    shapes: [
      {
        id: "tonics-root_1-shape_M7",
        getNotesSetName: (rootNote) => `${rootNote}M7`,
        rootSemitone: _1,
        chordShapeId: "M7",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [
              [1, _1],
              [3, _M3],
              [5, _5],
              [7, _M7],
            ],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 3,
            usedTones: [
              [3, _1],
              [5, _M3],
              [7, _5],
              [9, _M7],
            ],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "tonics-root_M3-shape_m7",
        getNotesSetName: (rootNote) => `${rootNote}m7`,
        rootSemitone: _M3,
        chordShapeId: "m7",
        colorProfile: {
          major: {
            exposedTone: 3,
            usedTones: [
              [3, _1],
              [5, _m3],
              [7, _5],
              [9, _m7],
            ],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 5,
            usedTones: [
              [5, _1],
              [7, _m3],
              [9, _5],
              [11, _m7],
            ],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "tonics-root_M6-shape_m7",
        getNotesSetName: (rootNote) => `${rootNote}m7`,
        rootSemitone: _M6,
        chordShapeId: "m7",
        colorProfile: {
          major: {
            exposedTone: 13,
            usedTones: [
              [1, _m3],
              [3, _5],
              [5, _m7],
              [13, _1],
            ],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 1,
            usedTones: [
              [1, _m3],
              [3, _5],
              [5, _m7],
              [7, _1],
            ],
            avoidNotes: [13],
          },
        },
      },
      // {
      //   id: "tonics-root_1-shape_M_add9",
      //   getNotesSetName: (rootNote) => `${rootNote}M(add9)`,
      //   rootSemitone: _1,
      //   chordShapeId: "M_add9",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [9]],
      //       avoidNotes: [11],
      //     },
      //     minor: {
      //       exposedTone: 3,
      //       usedTones: [[3], [5], [7], [11]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "tonics-root_1-shape_M9",
      //   getNotesSetName: (rootNote) => `${rootNote}M9`,
      //   rootSemitone: _1,
      //   chordShapeId: "M9",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [7], [9]],
      //       avoidNotes: [11],
      //     },
      //     minor: {
      //       exposedTone: 3,
      //       usedTones: [[3], [5], [7], [9], [11]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "tonics-root_1-shape_m_add9",
      //   getNotesSetName: (rootNote) => `${rootNote}m(add9)`,
      //   rootSemitone: _M6,
      //   chordShapeId: "m_add9",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 13,
      //       usedTones: [[1], [3], [7], [13]],
      //       avoidNotes: [11],
      //     },
      //     minor: {
      //       exposedTone: 3,
      //       usedTones: [[1], [3], [5], [9]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "tonics-root_1-shape_major_pent",
      //   getNotesSetName: (rootNote) => `${rootNote} Major pentatonic`,
      //   rootSemitone: _1,
      //   chordShapeId: "major_pent",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [9], [13]],
      //       avoidNotes: [11],
      //     },
      //     minor: {
      //       exposedTone: 3,
      //       usedTones: [[1], [3], [5], [7], [11]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "tonics-root_M6-shape_minor_pent",
      //   getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
      //   rootSemitone: _M6,
      //   chordShapeId: "minor_pent",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 13,
      //       usedTones: [[1], [3], [5], [9], [13]],
      //       avoidNotes: [11],
      //     },
      //     minor: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [7], [11]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "tonics-root_M3-shape_minor_pent",
      //   getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
      //   rootSemitone: _M3,
      //   chordShapeId: "minor_pent",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 3,
      //       usedTones: [[5], [7], [9], [13]],
      //       avoidNotes: [11],
      //     },
      //     minor: {
      //       exposedTone: 5,
      //       usedTones: [[1], [5], [7], [9], [11]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "tonics-root_1-shape_no_avoid_notes_t_s_major",
      //   getNotesSetName: () => '"No avoid notes"',
      //   rootSemitone: _1,
      //   chordShapeId: "no_avoid_notes_t_s_major",
      //   colorProfile: {
      //     major: {
      //       usedTones: [[1], [3], [5], [7], [9], [13]],
      //       avoidNotes: [11],
      //     },
      //     minor: {
      //       usedTones: [[1], [3], [5], [7], [9], [11]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "tonics-root_1-shape_ionian",
      //   getNotesSetName: (rootNote) => `${rootNote} Ionian Scale`,
      //   rootSemitone: _1,
      //   chordShapeId: "ionian",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [7], [9], [11], [13]],
      //       avoidNotes: [11],
      //     },
      //     minor: {
      //       exposedTone: 3,
      //       usedTones: [[1], [3], [5], [7], [9], [11], [13]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "tonics-root_M6-shape_aeolian",
      //   getNotesSetName: (rootNote) => `${rootNote} Aeolian Scale`,
      //   rootSemitone: _M6,
      //   chordShapeId: "aeolian",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 13,
      //       usedTones: [[1], [3], [5], [7], [9], [11], [13]],
      //       avoidNotes: [11],
      //     },
      //     minor: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [7], [9], [11], [13]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "tonics-root_M6-shape_dorian",
      //   getNotesSetName: (rootNote) => `${rootNote} Dorian Scale`,
      //   rootSemitone: _M6,
      //   chordShapeId: "dorian",
      //   colorProfile: {
      //     minor: {
      //       exposedTone: 1,
      //       usedTones: [[3], [5], [7], [9], [11], [13]],
      //       alteredTones: [13],
      //     },
      //   },
      // },
    ],
  },
  {
    id: "subdominants",
    FunctionContextName: "Motion",
    harmonicFunctionDescription: harmonicFunctionDescription.MOTION,
    majorRoot: _4,
    majorIntervals: [_1, _M3, _5],
    minorRoot: _M2,
    minorIntervals: [_1, _m3, _5],
    shapes: [
      {
        id: "subdominants-root_4-shape_M7",
        getNotesSetName: (rootNote) => `${rootNote}M7`,
        rootSemitone: _4,
        chordShapeId: "M7",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [[1], [3], [5], [7]],
          },
          minor: {
            exposedTone: 3,
            usedTones: [[3], [5], [7], [9]],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "subdominants-root_M6-shape_m7",
        getNotesSetName: (rootNote) => `${rootNote}m7`,
        rootSemitone: _M6,
        chordShapeId: "m7",
        colorProfile: {
          major: {
            exposedTone: 3,
            usedTones: [[3], [5], [7], [9]],
          },
          minor: {
            exposedTone: 5,
            usedTones: [[5], [7], [9], [11]],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "subdominants-root_M2-shape_m7",
        getNotesSetName: (rootNote) => `${rootNote}m7`,
        rootSemitone: _M2,
        chordShapeId: "m7",
        colorProfile: {
          major: {
            exposedTone: 13,
            usedTones: [[1], [3], [5], [13]],
          },
          minor: {
            exposedTone: 1,
            usedTones: [[1], [3], [5], [7]],
            avoidNotes: [13],
          },
        },
      },
      // {
      //   id: "subdominants-root_4-shape_M_add9",
      //   getNotesSetName: (rootNote) => `${rootNote}M(add9)`,
      //   rootSemitone: _4,
      //   chordShapeId: "M_add9",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [9]],
      //     },
      //     minor: {
      //       exposedTone: 3,
      //       usedTones: [[3], [5], [7], [11]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "subdominants-root_4-shape_major_pent",
      //   getNotesSetName: (rootNote) => `${rootNote} Major pentatonic`,
      //   rootSemitone: _4,
      //   chordShapeId: "major_pent",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [9], [13]],
      //     },
      //     minor: {
      //       exposedTone: 3,
      //       usedTones: [[1], [3], [5], [7], [11]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "subdominants-root_M2-shape_minor_pent",
      //   getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
      //   rootSemitone: _M2,
      //   chordShapeId: "minor_pent",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 13,
      //       usedTones: [[1], [3], [5], [9], [13]],
      //     },
      //     minor: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [7], [11]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "subdominants-root_M6-shape_minor_pent",
      //   getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
      //   rootSemitone: _M6,
      //   chordShapeId: "minor_pent",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 3,
      //       usedTones: [[5], [7], [9], [13]],
      //     },
      //     minor: {
      //       exposedTone: 5,
      //       usedTones: [[1], [5], [7], [9], [11]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "subdominants-root_4-shape_no_avoid_notes_t_s_major",
      //   getNotesSetName: () => '"No avoid notes"',
      //   rootSemitone: _4,
      //   chordShapeId: "no_avoid_notes_t_s_major",
      //   colorProfile: {
      //     major: {
      //       usedTones: [[1], [3], [5], [7], [9], [13]],
      //     },
      //     minor: {
      //       usedTones: [[1], [3], [5], [7], [9], [11]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "subdominants-root_4-shape_lydian",
      //   getNotesSetName: (rootNote) => `${rootNote} Lydian Scale`,
      //   rootSemitone: _4,
      //   chordShapeId: "lydian",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [7], [9], [11], [13]],
      //     },
      //     minor: {
      //       exposedTone: 3,
      //       usedTones: [[1], [3], [5], [7], [9], [11], [13]],
      //       avoidNotes: [13],
      //     },
      //   },
      // },
      // {
      //   id: "subdominants-root_M2-shape_dorian",
      //   getNotesSetName: (rootNote) => `${rootNote} Dorian Scale`,
      //   rootSemitone: _M2,
      //   chordShapeId: "dorian",
      //   colorProfile: {
      //     minor: {
      //       exposedTone: 1,
      //       usedTones: [[3], [5], [7], [9], [11], [13]],
      //     },
      //   },
      // },
    ],
  },
  {
    id: "dominant",
    FunctionContextName: "Tension to Major",
    harmonicFunctionDescription: harmonicFunctionDescription.TENSION,
    majorRoot: _5,
    majorIntervals: [_1, _M3, _5],
    shapes: [
      {
        id: "dominant-root_5-shape-dominant",
        getNotesSetName: (rootNote) => `${rootNote}7`,
        rootSemitone: _5,
        chordShapeId: "dominant",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [[1], [3], [5], [7]],
          },
        },
      },
      {
        id: "dominant-root_5-shape-m7b5",
        getNotesSetName: (rootNote) => `${rootNote}m7b5`,
        rootSemitone: _M7,
        chordShapeId: "m7b5",
        colorProfile: {
          major: {
            exposedTone: 3,
            usedTones: [[3], [5], [7], [9]],
          },
        },
      },
      {
        id: "dominant-root_5-shape-dim7",
        getNotesSetName: (rootNote) => `${rootNote}dim7`,
        rootSemitone: _M7,
        chordShapeId: "dim7",
        colorProfile: {
          major: {
            exposedTone: 3,
            usedTones: [[3], [5], [7], [9]],
            alteredTones: [9],
          },
        },
      },
      // {
      //   id: "dominant-root_5-shape-mixolydian",
      //   getNotesSetName: (rootNote) => `${rootNote} Mixolydian Scale`,
      //   rootSemitone: _5,
      //   chordShapeId: "mixolydian",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [7], [9], [11], [13]],
      //       avoidNotes: [11],
      //     },
      //   },
      // },
      // {
      //   id: "dominant-root_5-shape-major_pent",
      //   getNotesSetName: (rootNote) => `${rootNote} Major pentatonic`,
      //   rootSemitone: _5,
      //   chordShapeId: "major_pent",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [9], [13]],
      //     },
      //   },
      // },
      // {
      //   id: "dominant-root_5-shape-minor_pent",
      //   getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
      //   rootSemitone: _M3,
      //   chordShapeId: "minor_pent",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 13,
      //       usedTones: [[1], [3], [5], [9], [13]],
      //     },
      //   },
      // },
      // {
      //   id: "dominant-root_5-shape-minor_pent-2",
      //   getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
      //   rootSemitone: _5,
      //   chordShapeId: "minor_pent",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [5], [7], [9], [11]],
      //       avoidNotes: [11],
      //       alteredTones: [9],
      //     },
      //   },
      // },
    ],
  },
  {
    id: "dominant-ph",
    FunctionContextName: "Tension to minor",
    harmonicFunctionDescription: harmonicFunctionDescription.TENSION,
    majorRoot: _M3,
    majorIntervals: [_1, _M3, _5],
    shapes: [
      {
        id: "dominantPh-root_M3-shape-Dominant",
        getNotesSetName: (rootNote) => `${rootNote}7`,
        rootSemitone: _M3,
        chordShapeId: "dominant",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [3, 5, 7],
          },
        },
      },
      {
        id: "dominantPh-root_M7-shape-dim7",
        getNotesSetName: (rootNote) => `${rootNote}dim7`,
        rootSemitone: _M7,
        chordShapeId: "dim7",
        colorProfile: {
          major: {
            exposedTone: 3,
            usedTones: [[3], [5], [7], [9]],
          },
        },
      },
      {
        id: "dominantPh-root_M3-shape-7b9",
        getNotesSetName: (rootNote) => `${rootNote}7b9`,
        rootSemitone: _M3,
        chordShapeId: "7b9",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [[1], [3], [5], [7], [9]],
            alteredTones: [9],
          },
        },
      },
      // {
      //   id: "dominantPh-root_M3-shape-phrygianDominant",
      //   getNotesSetName: (rootNote) => `${rootNote} Phrygian Dominant Scale`,
      //   rootSemitone: _M3,
      //   chordShapeId: "phrygian_dominant",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [7], [9], [11], [13]],
      //       avoidNotes: [11],
      //     },
      //   },
      // },
      // {
      //   id: "dominantPh-root_M3-shape-mixolydian",
      //   getNotesSetName: (rootNote) => `${rootNote} Mixolydian Scale`,
      //   rootSemitone: _M3,
      //   chordShapeId: "mixolydian",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [3], [5], [7], [9], [11], [13]],
      //       avoidNotes: [11],
      //     },
      //   },
      // },
      // {
      //   id: "tonics-root_M6-shape_minor_pent",
      //   getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
      //   rootSemitone: _M3,
      //   chordShapeId: "minor_pent",
      //   colorProfile: {
      //     major: {
      //       exposedTone: 1,
      //       usedTones: [[1], [5], [7], [9], [11]],
      //       alteredTones: [9],
      //     },
      //   },
      // },
    ],
  },
];

export default musicFunctionContextSelectorData;
