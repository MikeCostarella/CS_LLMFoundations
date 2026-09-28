import { COURSE } from "../data/course";

// Python Programming → Introduction to AI/ML → LLM Foundations → Agentic AI Foundations
export default function CoursePath() {
  return (
    <div className="agent-loop" aria-label="Course path">
      {COURSE.path.map((c, i) => (
        <span key={c.title} className="path-step">
          {i > 0 && <span className="arrow">→ </span>}
          {c.url ? (
            <a className="step step-link" href={c.url} target="_blank" rel="noreferrer">
              {c.title}
            </a>
          ) : (
            <span className="step step-here">{c.title}</span>
          )}
        </span>
      ))}
    </div>
  );
}
