import { useEffect, useRef, useState } from "react";
import { UNITS } from "../data/units";
import { COURSE } from "../data/course";
import BuildStamp from "./BuildStamp";

// Fleet hamburger accordion menu: one section open at a time, internal
// navigation plus external links, build stamp at the foot.

const EXTERNAL = [
  { label: "Before: Introduction to AI/ML", href: "https://mikecostarella.github.io/CS_IntroductionToAIML/" },
  { label: "After: Agentic AI Foundations", href: "https://mikecostarella.github.io/CS_AgenticAIFoundations/" },
  { label: "Stanford CME 295 lectures", href: "https://www.youtube.com/playlist?list=PLoROMvodv4rOCXd21gf0CF4xr35yINeOy" },
  { label: "Mike Costarella — Courses", href: COURSE.coursesUrl },
  { label: "GitHub repository", href: COURSE.repoUrl },
  { label: "Lab notebooks", href: `${COURSE.repoUrl}/tree/main/labs` },
];

export default function MainMenu() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>("view");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  const toggle = (id: string) => setSection((s) => (s === id ? null : id));

  const head = (id: string, label: string) => (
    <button
      className={"acc-head" + (section === id ? " open" : "")}
      aria-expanded={section === id}
      onClick={() => toggle(id)}
    >
      <span>{label}</span>
      <span className="chev">▾</span>
    </button>
  );

  return (
    <div className="main-menu" ref={ref}>
      <button
        className="menu-btn"
        aria-expanded={open}
        aria-label="Main menu"
        onClick={() => setOpen((v) => !v)}
      >
        ☰
      </button>
      {open && (
        <div className="menu-panel">
          <div className="acc-section">
            {head("view", "View")}
            {section === "view" && (
              <div className="acc-body">
                <a href="#/">Home</a>
                <a href="#/search">Search the course</a>
                <a href="#/syllabus">Syllabus</a>
                <a href="#/capstone">Capstone</a>
                <a href="#/resources">Resources</a>
              </div>
            )}
          </div>

          <div className="acc-section">
            {head("units", "Units")}
            {section === "units" && (
              <div className="acc-body">
                {UNITS.map((u) => (
                  <a key={u.id} href={`#/u/${u.id}`}>
                    {u.number}. {u.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="acc-section">
            {head("labs", "Labs")}
            {section === "labs" && (
              <div className="acc-body">
                {UNITS.map((u) => (
                  <a key={u.id} href={`#/u/${u.id}?s=lab`}>
                    Lab {u.number}. {u.lab.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="acc-section">
            {head("links", "Links")}
            {section === "links" && (
              <div className="acc-body">
                {EXTERNAL.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                    {l.label} ↗
                  </a>
                ))}
                <a href={`mailto:${COURSE.contactEmail}`}>Contact ✉</a>
              </div>
            )}
          </div>

          <div className="menu-foot">
            <BuildStamp />
          </div>
        </div>
      )}
    </div>
  );
}
