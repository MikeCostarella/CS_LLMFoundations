import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import SyllabusPage from "./components/SyllabusPage";
import UnitPage from "./components/UnitPage";
import CapstonePage from "./components/CapstonePage";
import ResourcesPage from "./components/ResourcesPage";
import SearchPage from "./components/SearchPage";
import SearchBox from "./components/SearchBox";
import BuildStamp from "./components/BuildStamp";
import MainMenu from "./components/MainMenu";
import { UNIT_BY_ID, UNITS, validateRegistry } from "./data/units";
import { COURSE } from "./data/course";

// Hash-based routing: no router dependency, and it works on GitHub Pages
// project sites without any 404 rewriting. A route may carry a query:
// "#/search?q=lora" or "#/u/u05?s=lab", where s names a section to scroll to.
type Route =
  | { page: "home" }
  | { page: "syllabus" }
  | { page: "capstone" }
  | { page: "resources" }
  | { page: "search"; query: string }
  | { page: "unit"; id: string };

interface Location {
  route: Route;
  section: string | null;
  nonce: number;
}

function parseHash(nonce: number): Location {
  const raw = window.location.hash;
  const qi = raw.indexOf("?");
  const path = qi === -1 ? raw : raw.slice(0, qi);
  const params = new URLSearchParams(qi === -1 ? "" : raw.slice(qi + 1));

  const route = ((): Route => {
    const m = /^#\/u\/([a-z0-9]+)$/.exec(path);
    if (m && UNIT_BY_ID[m[1]]) return { page: "unit", id: m[1] };
    if (path === "#/syllabus") return { page: "syllabus" };
    if (path === "#/capstone") return { page: "capstone" };
    if (path === "#/resources") return { page: "resources" };
    if (path === "#/search") return { page: "search", query: params.get("q") ?? "" };
    return { page: "home" };
  })();

  return { route, section: params.get("s"), nonce };
}

function useLocation(): Location {
  const [loc, setLoc] = useState<Location>(() => parseHash(0));
  useEffect(() => {
    let n = 0;
    const onHash = () => setLoc(parseHash(++n));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return loc;
}

const TOP_LINKS: { href: string; label: string; page: Route["page"] }[] = [
  { href: "#/", label: "Home", page: "home" },
  { href: "#/syllabus", label: "Syllabus", page: "syllabus" },
  { href: "#/capstone", label: "Capstone", page: "capstone" },
  { href: "#/resources", label: "Resources", page: "resources" },
];

export default function App() {
  const { route, section, nonce } = useLocation();
  const activeId = route.page === "unit" ? route.id : null;
  const problems = import.meta.env.DEV ? validateRegistry() : [];

  useEffect(() => {
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ block: "start", behavior: "smooth" });
        el.classList.add("section-flash");
        const t = window.setTimeout(() => el.classList.remove("section-flash"), 1600);
        return () => window.clearTimeout(t);
      }
    }
    if (nonce > 0) window.scrollTo(0, 0);
    return;
  }, [route, section, nonce]);

  return (
    <div className="app">
      <header className="masthead">
        <MainMenu />
        <a className="brand" href="#/">
          <h1>&#128300; {COURSE.siteTitle}</h1>
          <div className="sub">Self-directed · Draft · inside the model</div>
        </a>
        <SearchBox />
        <nav className="top-links">
          {TOP_LINKS.map((l) => (
            <a key={l.href} href={l.href} className={route.page === l.page ? "on" : ""}>
              {l.label}
            </a>
          ))}
        </nav>
        <BuildStamp />
      </header>

      <div className="body">
        <aside className="sidebar">
          <div className="nav-unit">
            <div className="nav-unit-title">Units</div>
            {UNITS.map((u) => (
              <a
                key={u.id}
                href={`#/u/${u.id}`}
                className={"nav-mod" + (u.id === activeId ? " on" : "")}
              >
                <span className="nm-no">{u.number}</span> {u.title}
              </a>
            ))}
          </div>
          <div className="nav-unit">
            <div className="nav-unit-title">Finish</div>
            <a href="#/capstone" className={"nav-mod" + (route.page === "capstone" ? " on" : "")}>
              <span className="nm-no">★</span> Capstone
            </a>
          </div>
        </aside>

        <main className="content">
          {problems.length > 0 && (
            <div className="callout callout-warning">
              <b>Registry problems ({problems.length})</b>
              <ul className="topics">
                {problems.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {route.page === "home" && <HomePage />}
          {route.page === "syllabus" && <SyllabusPage />}
          {route.page === "capstone" && <CapstonePage />}
          {route.page === "resources" && <ResourcesPage />}
          {route.page === "search" && <SearchPage query={route.query} />}
          {route.page === "unit" && <UnitPage unit={UNIT_BY_ID[route.id]} />}
        </main>
      </div>

      <footer className="footer">
        <span>
          Course by {COURSE.author} ·{" "}
          <a className="contact-link" href={`mailto:${COURSE.contactEmail}`}>
            {COURSE.contactEmail}
          </a>{" "}
          · Content{" "}
          <a className="contact-link" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="license noreferrer">
            CC BY-NC-SA 4.0
          </a>
          , code{" "}
          <a className="contact-link" href="https://github.com/MikeCostarella/CS_LLMFoundations/blob/main/LICENSE.md" target="_blank" rel="noreferrer">
            MIT
          </a>
        </span>
        <BuildStamp />
      </footer>
    </div>
  );
}
