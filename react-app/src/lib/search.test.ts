// The search engine is the one piece of this site with logic a type checker
// cannot verify: term matching, an AND requirement across terms, and a ranking
// order. The site tests it with assertions that pin behaviour, not scores.

import { describe, expect, it } from "vitest";
import { normalize, queryTerms, search, tokenize } from "./search";
import { SEARCH_DOCS } from "../data/searchIndex";

describe("normalize", () => {
  it("lowercases and strips punctuation", () =>
    expect(normalize("Registry — the ARCHITECTURE!")).toBe("registry the architecture"));

  it("folds diacritics so accented input still matches", () =>
    expect(normalize("naïve café")).toBe("naive cafe"));

  it("is empty for input with nothing to match", () => expect(normalize("--- ???")).toBe(""));
});

describe("tokenize", () => {
  it("splits on anything that is not a letter or digit", () =>
    expect(tokenize("point-in-polygon, v2")).toEqual(["point", "in", "polygon", "v2"]));

  it("is an empty list rather than a list of empties", () => expect(tokenize("   ")).toEqual([]));
});

describe("queryTerms", () => {
  it("drops stop words", () => expect(queryTerms("the loss as a number")).toEqual(["loss", "number"]));

  it("de-duplicates repeated terms", () =>
    expect(queryTerms("gradient gradient")).toEqual(["gradient"]));

  it("keeps stop words when the query is nothing else", () =>
    expect(queryTerms("how to")).toEqual(["how", "to"]));
});

describe("search", () => {
  it("finds nothing for a term that appears nowhere", () =>
    expect(search("zzzznope")).toHaveLength(0));

  it("finds nothing for an empty query", () => expect(search("   ")).toHaveLength(0));

  it("requires every term to match — this is AND, not OR", () => {
    expect(search("attention").length).toBeGreaterThan(0);
    expect(search("attention zzzznope")).toHaveLength(0);
  });

  it("matches a prefix in either direction", () => {
    // "tokeniz" should reach "tokenizer"; "embeddings" should reach "embedding".
    expect(search("tokeniz").length).toBeGreaterThan(0);
    expect(search("embeddings").length).toBeGreaterThan(0);
  });

  it("ranks a title match above a passing mention", () => {
    const hits = search("attention and the transformer");
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].doc.title.toLowerCase()).toContain("attention");
  });

  it("honours the limit", () => expect(search("the", 3).length).toBeLessThanOrEqual(3));

  it("marks the matched words in the snippet", () => {
    const [hit] = search("quantization");
    expect(hit).toBeDefined();
    const marked = hit.snippet.filter((p) => p.hit).map((p) => p.text.toLowerCase());
    expect(marked.join(" ")).toContain("quantization");
  });
});

// Registry invariants the search index depends on.
describe("the index the engine is built on", () => {
  it("has a unique id for every document", () => {
    const ids = new Set(SEARCH_DOCS.map((d) => d.id));
    expect(ids.size).toBe(SEARCH_DOCS.length);
  });

  it("gives every document somewhere to go", () => {
    for (const d of SEARCH_DOCS) {
      expect(d.href.length).toBeGreaterThan(0);
      if (d.external) expect(d.href).toMatch(/^https?:\/\//);
      else expect(d.href.startsWith("#/")).toBe(true);
    }
  });

  it("gives every document a title", () => {
    for (const d of SEARCH_DOCS) expect(d.title.trim()).not.toBe("");
  });
});

describe("the unit registry", () => {
  it("passes its own integrity checks", async () => {
    const { validateRegistry } = await import("../data/units");
    expect(validateRegistry()).toEqual([]);
  });
});
