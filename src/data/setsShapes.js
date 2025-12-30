export const setsShapes = [
  {
    id: "M",
    label: "Major",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 4],
          [1, 7],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 4],
          [1, 7],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 4],
          [2, 7],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "M7",
    label: "Major 7th",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 4],
          [1, 7],
          [2, 11],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 4],
          [1, 7],
          [2, 11],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: ["A2"],
        shape: [
          [0, 0],
          [1, 4],
          [2, 7],
          [2, 11],
          [3, 12],
        ],
      },
      {
        notAllowedOnStrings: ["E1"],
        shape: [
          [0, 0],
          [1, 4],
          [2, 7],
          [3, 11],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "M_add9",
    label: "Major add9",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [0, 4],
          [1, 7],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [1, 4],
          [1, 7],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 2],
          [1, 4],
          [2, 7],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "M9",
    label: "Major 9",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [0, 4],
          [1, 7],
          [2, 11],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [1, 4],
          [1, 7],
          [2, 11],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 2],
          [1, 4],
          [2, 7],
          [2, 11],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "Dominant",
    label: "Dominant",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 4],
          [1, 7],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 4],
          [1, 7],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 4],
          [2, 7],
          [2, 10],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "m7b5",
    label: "m7b5 (Half-dim)",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 3],
          [1, 6],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 3],
          [2, 6],
          [2, 10],
          [3, 15],
        ],
      },
    ],
  },
  {
    id: "dim7",
    label: "Diminished 7",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 3],
          [1, 6],
          [1, 9],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 3],
          [1, 6],
          [2, 9],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 3],
          [2, 6],
          [2, 9],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "m",
    label: "Minor",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 3],
          [1, 7],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 3],
          [1, 7],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 3],
          [2, 7],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "m7",
    label: "Minor 7th",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 3],
          [1, 7],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 3],
          [1, 7],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 3],
          [2, 7],
          [2, 10],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "m_add9",
    label: "Minor add9",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [0, 3],
          [1, 7],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [1, 3],
          [1, 7],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 2],
          [1, 3],
          [2, 7],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "m9",
    label: "Minor 9",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [0, 3],
          [1, 7],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [1, 3],
          [1, 7],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 2],
          [1, 3],
          [2, 7],
          [2, 10],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "minorPent",
    label: "Minor Pentatonic",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 3],
          [1, 5],
          [1, 7],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 3],
          [1, 5],
          [1, 7],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 3],
          [1, 5],
          [2, 7],
          [2, 10],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "majorPent",
    label: "Major Pentatonic",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [0, 4],
          [1, 7],
          [1, 9],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [1, 4],
          [1, 7],
          [2, 9],
          [2, 12],
        ],
      },
    ],
  },
  {
    id: "ionian",
    label: "Ionian Scale",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [0, -8],
          [1, 5],
          [1, 7],
          [1, -3],
          [2, 11],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [1, 4],
          [1, 5],
          [1, 7],
          [2, 9],
          [2, 11],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 2],
          [1, 4],
          [1, 5],
          [2, 7],
          [2, 9],
          [2, 11],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "aeolian",
    label: "Aeolian Scale",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [0, 3],
          [1, 5],
          [1, 7],
          [1, 8],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [1, 3],
          [1, 5],
          [1, 7],
          [2, 8],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 2],
          [1, 3],
          [1, 5],
          [2, 7],
          [2, 8],
          [2, 10],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "dorian",
    label: "Dorian Scale",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [0, 3],
          [1, 5],
          [1, 7],
          [1, 9],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [1, 3],
          [1, 5],
          [1, 7],
          [2, 9],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 2],
          [1, 3],
          [1, 5],
          [2, 7],
          [2, 9],
          [2, 10],
          [3, 12],
        ],
      },
    ],
  },
  {
    id: "lydian",
    label: "Lydian Scale",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [0, 4],
          [1, 6],
          [1, 7],
          [1, 9],
          [2, 11],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [1, 4],
          [1, 6],
          [1, 7],
          [2, 9],
          [2, 11],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 14],
          [1, 4],
          [2, 18],
          [2, 19],
          [2, 9],
          [3, 23],
          [3, 24],
        ],
      },
    ],
  },
  {
    id: "mixolydian",
    label: "Mixolydian Scale",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [0, 4],
          [1, 5],
          [1, 7],
          [1, 9],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 2],
          [1, 4],
          [1, 5],
          [1, 7],
          [2, 9],
          [2, 10],
          [2, 12],
        ],
      },
    ],
  },
  {
    id: "phrygian",
    label: "Phrygian Scale",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 1],
          [0, 3],
          [1, 5],
          [1, 7],
          [2, 10],
          [2, 12],
          [2, 13],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 1],
          [1, 15],
          [1, 5],
          [1, 7],
          [2, 20],
          [2, 10],
          [2, 12],
        ],
      },
    ],
  },
  {
    id: "phrygianDominant",
    label: "Phrygian Dominant",
    shapes: [
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 1],
          [0, 4],
          [1, 5],
          [1, 7],
          [1, 8],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [0, 1],
          [1, 16],
          [1, 5],
          [1, 7],
          [2, 20],
          [2, 10],
          [2, 12],
        ],
      },
      {
        notAllowedOnStrings: [],
        shape: [
          [0, 0],
          [1, 13],
          [1, 16],
          [1, 5],
          [2, 19],
          [2, 20],
          [2, 10],
          [3, 24],
        ],
      },
    ],
  },
];
