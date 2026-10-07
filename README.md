# LLM Foundations

A self-directed course on how transformers work, how large language models are
trained, aligned, and taught to reason, and how to measure whether any of it
worked. The scope roughly parallels Stanford's CME 295 (Transformers & Large
Language Models), taught as math through code with no calculus.

**Status:** Draft. Self-directed; no term or institution attached.

**Live site:** https://mikecostarella.github.io/CS_LLMFoundations/

## Where it sits

```
Python Programming  ->  Introduction to AI/ML  ->  LLM Foundations  ->  Agentic AI Foundations
```

Introduction to AI/ML stops at how an LLM is made. Agentic AI Foundations
starts from using LLMs to build agents. This course fills the gap.

The full plan is in [`COURSE_PLAN.md`](COURSE_PLAN.md).

## Labs

Every lab is a Jupyter notebook in [`labs/`](labs/) that runs on Google Colab's
free GPU tier. Each unit page on the site has an "Open in Colab" badge for its
notebook. The notebooks are stubs for now: titles, lab steps, and "you should
see…" checkpoints.

## The site

Built on the fleet pattern: a typed registry in `react-app/src/data` drives
navigation, the syllabus, the unit pages, and the search index. It uses hash
routing with section deep links and has a build stamp in the menu and footer.

| File | Drives |
|---|---|
| `react-app/src/data/units.ts` | The nine units: goal, lessons, lab, self-check, CME 295 lecture |
| `react-app/src/data/course.ts` | Purpose, prerequisites, outcomes, tools, capstone, CME 295 mapping |
| `react-app/src/data/resources.ts` | The Resources page |

```
cd C:\projects\CS_LLMFoundations\react-app
npm install
npm run dev
```

```
cd C:\projects\CS_LLMFoundations\react-app
npm test          # vitest
npm run build     # tsc -b && vite build
```

The notebooks sit outside `react-app/`, so they never enter the build or the
PWA precache. `vite.config.ts` also ignores `*.ipynb` for safety.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: install, test, build,
and publish to GitHub Pages. The build stamp shows which build is live.

## License

Course content: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
Code, including lab code samples: MIT. See [LICENSE.md](LICENSE.md) for details
and the attribution line to use when adapting the course.
