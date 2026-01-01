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
    FunctionContextName: "Tonics",
    harmonicFunctionDescription: harmonicFunctionDescription.RELEASE,
    majorRoot: _1,
    minorRoot: _M6,
    shapes: [
      {
        id: "tonics-root_1-shape_M7",
        getNotesSetName: (rootNote) => `${rootNote}M7`,
        rootSemitone: _1,
        chordShapeId: "M7",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 3,
            usedTones: [3, 5, 7, 9],
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
            usedTones: [3, 5, 7, 9],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 5,
            usedTones: [5, 7, 9, 11],
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
            usedTones: [1, 3, 5, 13],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "tonics-root_1-shape_M_add9",
        getNotesSetName: (rootNote) => `${rootNote}M(add9)`,
        rootSemitone: _1,
        chordShapeId: "M_add9",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 9],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 3,
            usedTones: [3, 5, 7, 11],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "tonics-root_1-shape_major_pent",
        getNotesSetName: (rootNote) => `${rootNote} Major pentatonic`,
        rootSemitone: _1,
        chordShapeId: "major_pent",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 9, 13],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 3,
            usedTones: [1, 3, 5, 7, 11],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "tonics-root_M6-shape_minor_pent",
        getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
        rootSemitone: _M6,
        chordShapeId: "minor_pent",
        colorProfile: {
          major: {
            exposedTone: 13,
            usedTones: [1, 3, 5, 9, 13],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7, 11],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "tonics-root_M3-shape_minor_pent",
        getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
        rootSemitone: _M3,
        chordShapeId: "minor_pent",
        colorProfile: {
          major: {
            exposedTone: 3,
            usedTones: [5, 7, 9, 13],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 5,
            usedTones: [1, 5, 7, 9, 11],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "tonics-root_1-shape_no_avoid_notes_t_s_major",
        getNotesSetName: () => 'Unified "no avoid notes"',
        rootSemitone: _1,
        chordShapeId: "no_avoid_notes_t_s_major",
        colorProfile: {
          major: {
            usedTones: [1, 3, 5, 7, 9, 13],
            avoidNotes: [11],
          },
          minor: {
            usedTones: [1, 3, 5, 7, 9, 11],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "tonics-root_1-shape_ionian",
        getNotesSetName: (rootNote) => `${rootNote} Ionian`,
        rootSemitone: _1,
        chordShapeId: "ionian",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7, 9, 11, 13],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 3,
            usedTones: [1, 3, 5, 7, 9, 11, 13],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "tonics-root_M6-shape_aeolian",
        getNotesSetName: (rootNote) => `${rootNote} Aeolian`,
        rootSemitone: _M6,
        chordShapeId: "aeolian",
        colorProfile: {
          major: {
            exposedTone: 13,
            usedTones: [1, 3, 5, 7, 9, 11, 13],
            avoidNotes: [11],
          },
          minor: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7, 9, 11, 13],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "tonics-root_M6-shape_dorian",
        getNotesSetName: (rootNote) => `${rootNote} Dorian`,
        rootSemitone: _M6,
        chordShapeId: "dorian",
        colorProfile: {
          minor: {
            exposedTone: 1,
            usedTones: [3, 5, 7, 9, 11, 13],
            alteredTones: [13],
          },
        },
      },
    ],
  },
  {
    id: "subdominants",
    FunctionContextName: "Subdominants",
    harmonicFunctionDescription: harmonicFunctionDescription.MOTION,
    majorRoot: _4,
    minorRoot: _M2,
    shapes: [
      {
        id: "subdominants-root_4-shape_M7",
        getNotesSetName: (rootNote) => `${rootNote}M7`,
        rootSemitone: _4,
        chordShapeId: "M7",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7],
          },
          minor: {
            exposedTone: 3,
            usedTones: [3, 5, 7, 9],
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
            usedTones: [3, 5, 7, 9],
          },
          minor: {
            exposedTone: 5,
            usedTones: [5, 7, 9, 11],
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
            usedTones: [1, 3, 5, 13],
          },
          minor: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "subdominants-root_4-shape_M_add9",
        getNotesSetName: (rootNote) => `${rootNote}M(add9)`,
        rootSemitone: _4,
        chordShapeId: "M_add9",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 9],
          },
          minor: {
            exposedTone: 3,
            usedTones: [3, 5, 7, 11],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "subdominants-root_4-shape_major_pent",
        getNotesSetName: (rootNote) => `${rootNote} Major pentatonic`,
        rootSemitone: _4,
        chordShapeId: "major_pent",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 9, 13],
          },
          minor: {
            exposedTone: 3,
            usedTones: [1, 3, 5, 7, 11],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "subdominants-root_M2-shape_minor_pent",
        getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
        rootSemitone: _M2,
        chordShapeId: "minor_pent",
        colorProfile: {
          major: {
            exposedTone: 13,
            usedTones: [1, 3, 5, 9, 13],
          },
          minor: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7, 11],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "subdominants-root_M6-shape_minor_pent",
        getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
        rootSemitone: _M6,
        chordShapeId: "minor_pent",
        colorProfile: {
          major: {
            exposedTone: 3,
            usedTones: [5, 7, 9, 13],
          },
          minor: {
            exposedTone: 5,
            usedTones: [1, 5, 7, 9, 11],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "subdominants-root_4-shape_no_avoid_notes_t_s_major",
        getNotesSetName: () => 'Unified "no avoid notes"',
        rootSemitone: _4,
        chordShapeId: "no_avoid_notes_t_s_major",
        colorProfile: {
          major: {
            usedTones: [1, 3, 5, 7, 9, 13],
          },
          minor: {
            usedTones: [1, 3, 5, 7, 9, 11],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "subdominants-root_4-shape_lydian",
        getNotesSetName: (rootNote) => `${rootNote} Lydian`,
        rootSemitone: _4,
        chordShapeId: "lydian",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7, 9, 11, 13],
          },
          minor: {
            exposedTone: 3,
            usedTones: [1, 3, 5, 7, 9, 11, 13],
            avoidNotes: [13],
          },
        },
      },
      {
        id: "subdominants-root_M2-shape_dorian",
        getNotesSetName: (rootNote) => `${rootNote} Dorian`,
        rootSemitone: _M2,
        chordShapeId: "dorian",
        colorProfile: {
          minor: {
            exposedTone: 1,
            usedTones: [3, 5, 7, 9, 11, 13],
          },
        },
      },
    ],
  },
  {
    id: "dominant",
    FunctionContextName: "Dominant",
    harmonicFunctionDescription: harmonicFunctionDescription.TENSION,
    majorRoot: _5,
    shapes: [
      {
        id: "dominant-root_5-shape-Dominant",
        getNotesSetName: (rootNote) => `${rootNote}7`,
        rootSemitone: _5,
        chordShapeId: "dominant",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7],
          },
        },
      },
      {
        id: "dominant-root_M7-shape-m7b5",
        getNotesSetName: (rootNote) => `${rootNote}m7b5`,
        rootSemitone: _M7,
        chordShapeId: "m7b5",
        colorProfile: {
          major: {
            exposedTone: 3,
            usedTones: [3, 5, 7, 9],
          },
        },
      },
      {
        id: "dominant-root_5-shape-mixolydian",
        getNotesSetName: (rootNote) => `${rootNote} Mixolydian`,
        rootSemitone: _5,
        chordShapeId: "mixolydian",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7, 9, 11, 13],
            avoidNotes: [11],
          },
        },
      },
      {
        id: "dominant-root_5-shape-major_pent",
        getNotesSetName: (rootNote) => `${rootNote} Major pentatonic`,
        rootSemitone: _5,
        chordShapeId: "major_pent",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 9, 13],
          },
        },
      },
      {
        id: "dominant-root_M3-shape-minor_pent",
        getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
        rootSemitone: _M3,
        chordShapeId: "minor_pent",
        colorProfile: {
          major: {
            exposedTone: 13,
            usedTones: [1, 3, 5, 9, 13],
          },
        },
      },
      {
        id: "dominant-root_5-shape-minor_pent",
        getNotesSetName: (rootNote) => `${rootNote} minor pentatonic`,
        rootSemitone: _5,
        chordShapeId: "minor_pent",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 5, 7, 9, 11],
            avoidNotes: [11],
            alteredTones: [9],
          },
        },
      },
    ],
  },
  {
    id: "dominant-ph",
    FunctionContextName: "Phrygian Dominant",
    harmonicFunctionDescription: harmonicFunctionDescription.TENSION,
    majorRoot: _M3,
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
            usedTones: [3, 5, 7, 9],
          },
        },
      },
      {
        id: "dominantPh-root_M3-shape-phrygianDominant",
        getNotesSetName: (rootNote) => `${rootNote} Phrygian Dominant`,
        rootSemitone: _M3,
        chordShapeId: "phrygian_dominant",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7, 9, 11, 13],
            avoidNotes: [11],
          },
        },
      },
      {
        id: "dominantPh-root_M3-shape-mixolydian",
        getNotesSetName: (rootNote) => `${rootNote} Mixolydian`,
        rootSemitone: _M3,
        chordShapeId: "mixolydian",
        colorProfile: {
          major: {
            exposedTone: 1,
            usedTones: [1, 3, 5, 7, 9, 11, 13],
            avoidNotes: [11],
          },
        },
      },
    ],
  },
];

export default musicFunctionContextSelectorData;
