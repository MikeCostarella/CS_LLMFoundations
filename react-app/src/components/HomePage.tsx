import { COURSE } from "../data/course";
import { LESSON_COUNT, SELF_CHECK_COUNT, UNIT_COUNT, UNITS } from "../data/units";
import CoursePath from "./CoursePath";

export default function HomePage() {
  return (
    <article className="home" id="top">
      <div className="draft-banner">
        <b>Draft.</b> Self-directed course design; no term or institution attached. Lab notebooks
        are stubs until each lab is built.
      </div>
      <p className="kicker">Self-directed · Math through code, no calculus</p>
      <h1>{COURSE.title}</h1>
      <p className="tagline">{COURSE.tagline}</p>

      <div className="stat-row">
        <span><b>{UNIT_COUNT}</b> units</span>
        <span><b>{LESSON_COUNT}</b> lessons</span>
        <span><b>{UNIT_COUNT}</b> Colab labs</span>
        <span><b>{SELF_CHECK_COUNT}</b> self-check questions</span>
        <span><b>1</b> capstone</span>
      </div>

      <section id="overview">
        <h2>Why this course</h2>
        {COURSE.purpose.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <section id="path">
        <h2>Course path</h2>
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

      <section id="units">
        <h2>The nine units</h2>
        <div className="unit-cards">
          {UNITS.map((u) => (
            <a className="unit-card" key={u.id} href={`#/u/${u.id}`}>
              <div className="uc-no">Unit {u.number}</div>
              <div className="uc-title">{u.title}</div>
              <div className="uc-theme">{u.goal}</div>
              <div className="uc-mods">
                {u.lessons.length} lessons · Lab {u.number} · CME 295 L{u.cme.join(", ")}
              </div>
            </a>
          ))}
          <a className="unit-card" href="#/capstone">
            <div className="uc-no">Capstone</div>
            <div className="uc-title">Build Your Own Mini Assistant</div>
            <div className="uc-theme">SFT → DPO → evaluation → model card, on one small model.</div>
          </a>
        </div>
      </section>
    </article>
  );
}
