// The search index: every piece of the course flattened into documents the
// engine (lib/search.ts) can rank. Derived entirely from the registry, so a
// new unit, lab or self-check is searchable with no extra step.

import { CAPSTONE, COURSE } from "./course";
import { UNITS } from "./units";
import { RESOURCES } from "./resources";

export type SearchKind = "unit" | "lab" | "check" | "page" | "resource";

export interface SearchDoc {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle?: string;
  kicker?: string;
  keywords?: string[];
  body: string;
  href: string;
  external?: boolean;
}

export const KIND_LABEL: Record<SearchKind, string> = {
  unit: "Unit",
  lab: "Lab",
  check: "Self-check",
  page: "Page",
  resource: "Resource",
};

export const KIND_ORDER: SearchKind[] = ["unit", "lab", "check", "page", "resource"];

function build(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const u of UNITS) {
    docs.push({
      id: `unit-${u.id}`,
      kind: "unit",
      title: u.title,
      subtitle: u.goal,
      kicker: `Unit ${u.number}`,
      keywords: u.lessons,
      body: [u.goal, ...u.lessons].join(" "),
      href: `#/u/${u.id}`,
    });
    docs.push({
      id: `lab-${u.id}`,
      kind: "lab",
      title: `Lab ${u.number} — ${u.lab.title}`,
      subtitle: `Unit ${u.number} — ${u.title}`,
      kicker: `labs/${u.lab.notebook}`,
      body: [...u.lab.parts.map((p) => p.text), u.lab.expect, u.lab.stretch ?? ""].join(" "),
      href: `#/u/${u.id}?s=lab`,
    });
    u.selfCheck.forEach((c, i) => {
      docs.push({
        id: `check-${u.id}-${i}`,
        kind: "check",
        title: c.q,
        subtitle: `Unit ${u.number} — ${u.title}`,
        kicker: "Self-check",
        body: c.q,
        href: `#/u/${u.id}?s=self-check`,
      });
    });
  }

  docs.push(
    {
      id: "page-home",
      kind: "page",
      title: "Why this course",
      subtitle: COURSE.tagline,
      kicker: "Home",
      body: [...COURSE.purpose, ...COURSE.prerequisites].join(" "),
      href: "#/",
    },
    {
      id: "page-outcomes",
      kind: "page",
      title: "Learning outcomes",
      kicker: "Syllabus",
      keywords: [...COURSE.outcomes],
      body: COURSE.outcomes.join(" "),
      href: "#/syllabus?s=outcomes",
    },
    {
      id: "page-tools",
      kind: "page",
      title: "Tools and compute",
      kicker: "Syllabus",
      body: COURSE.tools.join(" "),
      href: "#/syllabus?s=tools",
    },
    {
      id: "page-capstone",
      kind: "page",
      title: `Capstone — ${CAPSTONE.title}`,
      kicker: "Capstone",
      body: [
        ...CAPSTONE.steps.map((s) => `${s.label} ${s.text}`),
        ...CAPSTONE.deliverables,
        ...CAPSTONE.rubric.map((r) => `${r.label} ${r.text}`),
      ].join(" "),
      href: "#/capstone",
    },
  );

  for (const r of RESOURCES) {
    docs.push({
      id: `res-${r.id}`,
      kind: "resource",
      title: r.label,
      subtitle: r.why,
      kicker: r.category,
      body: r.why,
      href: r.url,
      external: true,
    });
  }

  return docs;
}

export const SEARCH_DOCS: SearchDoc[] = build();
