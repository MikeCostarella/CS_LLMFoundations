// The course registry types. The whole site is driven by one typed registry
// (src/data/units.ts): navigation, the syllabus, every unit page, the
// home-page counts and the search index all derive from this single source.

export interface Link {
  label: string;
  url: string;
}

export interface SelfCheck {
  q: string;
  /** Revealed on demand on the unit page. */
  a: string;
}

export interface LabDef {
  title: string;
  /** Lab parts, in order. Most labs have one; some have Part A / Part B. */
  parts: { label?: string; text: string }[];
  /** Notebook file name inside /labs at the repo root, e.g. "unit01_tokens_embeddings.ipynb". */
  notebook: string;
  /** "You should see…" — the checkpoint a self-directed learner verifies against. */
  expect: string;
  /** Optional stretch goal. */
  stretch?: string;
}

export interface UnitDef {
  /** Stable id used in the URL hash, e.g. "u01". */
  id: string;
  number: number;
  title: string;
  goal: string;
  lessons: string[];
  lab: LabDef;
  selfCheck: SelfCheck[];
  /** CME 295 lecture(s) this unit parallels, e.g. [1] or [1, 7]. */
  cme: number[];
  /** Extra "Go deeper" pointers beyond the CME 295 lecture. */
  goDeeper?: Link[];
}
