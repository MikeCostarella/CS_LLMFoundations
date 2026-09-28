import { cmeLink } from "../data/course";
import { prevNext } from "../data/units";
import type { UnitDef } from "../data/types";
import ColabBadge from "./ColabBadge";

export default function UnitPage({ unit }: { unit: UnitDef }) {
  const { prev, next } = prevNext(unit);
  const deeper = [...unit.cme.map(cmeLink), ...(unit.goDeeper ?? [])];

  return (
    <article className="module-page">
      <div className="crumbs">
        <a href="#/syllabus">Syllabus</a> <span>›</span> Unit {unit.number}
      </div>
      <h1>
        <span className="mod-no">Unit {unit.number}</span>
        {unit.title}
      </h1>
      <p className="mod-subtitle">
        <b>Goal:</b> {unit.goal}
      </p>

      <section id="lessons">
        <h2>Lessons</h2>
        <ol className="topics">
          {unit.lessons.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ol>
      </section>

      <section className="lab" id="lab">
        <h2>Lab {unit.number} — {unit.lab.title}</h2>
        <ColabBadge notebook={unit.lab.notebook} />
        {unit.lab.parts.map((p, i) => (
          <p key={i}>
            {p.label && <b>{p.label}: </b>}
            {p.text}
          </p>
        ))}
        {unit.lab.stretch && (
          <p>
            <b>Optional stretch:</b> {unit.lab.stretch}
          </p>
        )}
        <p className="lab-deliverable">
          <b>You should see:</b> {unit.lab.expect}
        </p>
      </section>

      <section id="self-check">
        <h2>Self-check</h2>
        {unit.selfCheck.map((c, i) => (
          <details className="self-check" key={i}>
            <summary>{c.q}</summary>
            <p>{c.a}</p>
          </details>
        ))}
      </section>

      <section id="go-deeper">
        <h2>Go deeper</h2>
        <ul className="readings">
          {deeper.map((d) => (
            <li key={d.label}>
              <a href={d.url} target="_blank" rel="noreferrer">
                {d.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <nav className="pager">
        {prev ? (
          <a href={`#/u/${prev.id}`}>← Unit {prev.number}: {prev.title}</a>
        ) : (
          <a href="#/">← Course home</a>
        )}
        {next ? (
          <a href={`#/u/${next.id}`}>Unit {next.number}: {next.title} →</a>
        ) : (
          <a href="#/capstone">Capstone →</a>
        )}
      </nav>
    </article>
  );
}
