import { CAPSTONE } from "../data/course";
import ColabBadge from "./ColabBadge";

export default function CapstonePage() {
  return (
    <article className="page">
      <h1>Capstone — {CAPSTONE.title}</h1>
      <p className="lede">{CAPSTONE.intro}</p>

      <section id="pipeline">
        <ol className="outcomes">
          {CAPSTONE.steps.map((s) => (
            <li key={s.label}>
              <b>{s.label}</b> {s.text}
            </li>
          ))}
        </ol>
        <ColabBadge notebook={CAPSTONE.notebook} />
      </section>

      <section id="deliverables">
        <h2>Deliverables</h2>
        <ul className="topics">
          {CAPSTONE.deliverables.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>

      <section id="rubric">
        <h2>Rubric</h2>
        <div className="card-grid">
          {CAPSTONE.rubric.map((r) => (
            <div className="card" key={r.label}>
              <h3>{r.label}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      <nav className="pager">
        <a href="#/u/u09">← Unit 9: Bridge to Agents</a>
        <a href="https://mikecostarella.github.io/CS_AgenticAIFoundations/" target="_blank" rel="noreferrer">
          Next course: Agentic AI Foundations ↗
        </a>
      </nav>
    </article>
  );
}
