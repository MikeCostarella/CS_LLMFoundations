import { colabUrl, notebookUrl } from "../data/course";

// "Open in Colab" badge, drawn in CSS so the site ships no badge image and
// makes no third-party image request. Notebooks live in /labs at the repo
// root, outside the Vite build, so they never enter the PWA precache.
export default function ColabBadge({ notebook }: { notebook: string }) {
  return (
    <div className="colab-row">
      <a className="colab-badge" href={colabUrl(notebook)} target="_blank" rel="noreferrer">
        <span className="cb-logo" aria-hidden="true">co</span>
        Open in Colab
      </a>
      <a className="nb-link" href={notebookUrl(notebook)} target="_blank" rel="noreferrer">
        labs/{notebook} ↗
      </a>
    </div>
  );
}
