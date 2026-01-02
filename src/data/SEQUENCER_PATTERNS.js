export const SEQUENCER_PATTERNS = {
  linear: {
    steps: [1, 2, 3, 4],
    offset: 4,
  },
  thirds: {
    steps: [1, 3, 2, 4],
    offset: 2,
  },
  triplets: {
    steps: [1, 2, 3],
    offset: 1,
  },
  skipOne: {
    steps: [1, 3, 5],
    offset: 1,
  },
};

export default SEQUENCER_PATTERNS;
