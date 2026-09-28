import { CAPSTONE, CME295, COURSE, colabUrl } from "../data/course";
import { UNITS } from "../data/units";
import CoursePath from "./CoursePath";

// The course plan, rendered from the same registry the unit pages use.
export default function SyllabusPage() {
  return (
    <article className="syllabus page">
      <h1>Syllabus</h1>
      <p className="syll-sub">
        Nine units plus a capstone. Each unit has a goal, lessons, a Colab lab, a self-check, and a
        "Go deeper" pointer. Work in order; later labs reuse what earlier ones build.
      </p>

      <section id="purpose">
        <h2>Purpose</h2>
        {COURSE.purpose.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <CoursePath />
      </section>

      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <ul className="topics">
          {COURSE.prerequisites.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section id="outcomes">
        <h2>Learning outcomes</h2>
        <p>By the end, you can:</p>
        <ol className="outcomes">
          {COURSE.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ol>
      </section>

      <section id="tools">
        <h2>Tools and compute</h2>
        <ul className="topics">
          {COURSE.tools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section id="units">
        <h2>Units and labs</h2>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Unit</th>
              <th>Title</th>
              <th>Lab notebook</th>
              <th>CME 295</th>
            </tr>
          </thead>
          <tbody>
            {UNITS.map((u) => (
              <tr key={u.id}>
                <td>{u.number}</td>
                <td>
                  <a href={`#/u/${u.id}`}>{u.title}</a>
                  <div className="sm-sub">{u.goal}</div>
                </td>
                <td>
                  <a href={colabUrl(u.lab.notebook)} target="_blank" rel="noreferrer">
                    <code>{u.lab.notebook}</code>
                  </a>
                </td>
                <td>L{u.cme.join(", ")}</td>
              </tr>
            ))}
            <tr>
              <td>★</td>
              <td>
                <a href="#/capstone">Capstone — {CAPSTONE.title}</a>
              </td>
              <td>
                <code>{CAPSTONE.notebook}</code>
              </td>
              <td>—</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="assessment">
        <h2>Assessment (self-directed)</h2>
        <ul className="topics">
          {COURSE.assessment.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section id="cme295">
        <h2>CME 295 mapping</h2>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>CME 295 lecture</th>
              <th>LLM Foundations</th>
            </tr>
          </thead>
          <tbody>
            {CME295.mapping.map((r) => (
              <tr key={r.lecture}>
                <td>{r.lecture}</td>
                <td>{r.here}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </article>
  );
}
