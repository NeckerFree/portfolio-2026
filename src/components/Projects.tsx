import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from './ProjectCard';
import './Projects.css';

export function Projects() {
  const { projects, status } = useProjects();

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section__head">
          <p className="section__index">01 — Projects</p>
          <h2 className="section__title">Selected work</h2>
          <p className="section__lead">
            Pinned repositories from my GitHub profile. Descriptions, topics and activity are read
            live from the GitHub API, so this list reflects the repositories as they are right now.
          </p>

          <p
            className={`projects__freshness projects__freshness--${status}`}
            role="status"
            aria-live="polite"
          >
            {status === 'loading' && 'Checking GitHub for the latest…'}
            {status === 'live' && 'Live from the GitHub API'}
            {status === 'snapshot' &&
              'Showing a saved copy — GitHub could not be reached just now, so details may be slightly out of date.'}
          </p>
        </div>

        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <p className="projects__more">
          More repositories, including forks and experiments, live on{' '}
          <a href="https://github.com/NeckerFree" target="_blank" rel="noreferrer noopener">
            my GitHub profile
          </a>
          .
        </p>
      </div>
    </section>
  );
}
