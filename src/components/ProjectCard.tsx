import { formatStars, relativeTime } from '../lib/format';
import type { Project } from '../types';
import { ExternalIcon, GitHubIcon, SparkIcon, StarIcon } from './Icons';

/** Chips beyond this are collapsed into a "+N" so cards stay the same shape. */
const MAX_VISIBLE_TOOLS = 6;

export function ProjectCard({ project }: { project: Project }) {
  const visibleTools = project.tools.slice(0, MAX_VISIBLE_TOOLS);
  const hiddenCount = project.tools.length - visibleTools.length;
  const updated = relativeTime(project.updatedAt);

  return (
    <article className="card">
      <div className="card__body">
        <h3 className="card__title">
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer noopener">
              {project.label}
            </a>
          ) : (
            project.label
          )}
        </h3>

        {project.highlight && (
          <p className="card__highlight">
            <SparkIcon size={14} />
            {project.highlight}
          </p>
        )}

        <p className="card__description">{project.description}</p>

        <ul className="card__tools" aria-label={`Tools used in ${project.label}`}>
          {visibleTools.map((tool) => (
            <li className="chip" key={tool}>
              {tool}
            </li>
          ))}
          {hiddenCount > 0 && (
            <li className="chip chip--primary" title={project.tools.slice(MAX_VISIBLE_TOOLS).join(', ')}>
              +{hiddenCount}
            </li>
          )}
        </ul>
      </div>

      <div className="card__footer">
        <div className="card__meta">
          {project.stars > 0 && (
            <span className="card__stat">
              <StarIcon size={14} className="card__star" />
              {formatStars(project.stars)}
              <span className="visually-hidden">
                {project.stars === 1 ? 'star' : 'stars'} on GitHub
              </span>
            </span>
          )}
          {updated && <span className="card__stat card__stat--muted">Updated {updated}</span>}
        </div>

        <div className="card__links">
          {project.liveUrl && (
            <a
              className="card__link"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <ExternalIcon size={15} />
              Live
              <span className="visually-hidden"> demo of {project.label}</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              className="card__link"
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHubIcon size={15} />
              Code
              <span className="visually-hidden"> for {project.label} on GitHub</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
