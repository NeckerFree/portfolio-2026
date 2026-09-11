import { useState } from 'react';

import { VISIBLE_ROLES, profile } from '../data/profile';
import { ChevronDownIcon } from './Icons';
import './Experience.css';

export function Experience() {
  const [expanded, setExpanded] = useState(false);

  const roles = profile.experience;
  const shown = expanded ? roles : roles.slice(0, VISIBLE_ROLES);
  const remaining = roles.length - VISIBLE_ROLES;

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section__head">
          <p className="section__index">03 — Experience</p>
          <h2 className="section__title">Where I have built</h2>
          <p className="section__lead">
            Enterprise .NET across airlines, insurance, banking, telecoms and the Colombian public
            sector — as a developer, a senior engineer and a technical lead.
          </p>
        </div>

        {/* Two-column card grid, reverse-chronological reading left-to-right
            then down a row — so the default 4-role view lands as a clean 2x2. */}
        <ol className="timeline">
          {shown.map((role) => (
            <li className="timeline__card" key={`${role.company}-${role.period}`}>
              <span className="timeline__year">{role.start}</span>

              <div className="timeline__header">
                <h3 className="timeline__role">{role.title}</h3>
                <p className="timeline__company">
                  {role.company}
                  {role.project && <span className="timeline__project"> — {role.project}</span>}
                </p>
                <p className="timeline__meta">
                  <span>{role.period}</span>
                  <span className="timeline__dot" aria-hidden>
                    ·
                  </span>
                  <span>{role.location}</span>
                </p>
              </div>

              <ul className="timeline__highlights">
                {role.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <ul className="timeline__stack" aria-label={`Stack at ${role.company}`}>
                {role.stack.map((tech) => (
                  <li className="chip" key={tech}>
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {remaining > 0 && (
          <button
            type="button"
            className={`btn btn--ghost experience__toggle${
              expanded ? ' experience__toggle--open' : ''
            }`}
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show recent roles only' : `Show ${remaining} earlier roles`}
            <ChevronDownIcon size={17} />
          </button>
        )}
      </div>
    </section>
  );
}
