import { profile } from '../data/profile';
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from './Icons';
import './Hero.css';

export function Hero() {
  const { contact } = profile;

  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span className="hero__status" aria-hidden />
            Open to backend &amp; full-stack roles
          </p>

          <h1 className="hero__name">{profile.name}</h1>

          <p className="hero__title">
            {profile.title} <span className="hero__title-sep">·</span>{' '}
            <span className="hero__title-stack">{profile.tagline}</span>
          </p>

          <p className="hero__location">
            <PinIcon size={15} />
            {profile.location}
          </p>

          <p className="hero__summary">{profile.summary}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#projects">
              View projects
            </a>
            <a className="btn btn--ghost" href={contact.cv} download>
              <DownloadIcon size={17} />
              Download CV
            </a>
          </div>

          <ul className="hero__links">
            <li>
              <a
                className="hero__link"
                href={contact.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                <GitHubIcon size={18} />
                GitHub
              </a>
            </li>
            <li>
              <a
                className="hero__link"
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                <LinkedInIcon size={18} />
                LinkedIn
              </a>
            </li>
            <li>
              <a className="hero__link" href={`mailto:${contact.email}`}>
                <MailIcon size={18} />
                Email
              </a>
            </li>
          </ul>
        </div>

        <div className="hero__aside">
          <div className="hero__portrait">
            <img
              src={profile.avatar}
              alt={`Portrait of ${profile.name}`}
              width={220}
              height={220}
              loading="eager"
              decoding="async"
            />
          </div>

          <dl className="hero__stats">
            {profile.stats.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
