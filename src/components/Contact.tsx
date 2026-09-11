import { profile } from '../data/profile';
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from './Icons';
import './Contact.css';

export function Contact() {
  const { contact } = profile;

  const channels = [
    {
      icon: <MailIcon size={19} />,
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: <PhoneIcon size={19} />,
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/[^\d+]/g, '')}`,
    },
    {
      icon: <GitHubIcon size={19} />,
      label: 'GitHub',
      value: 'github.com/NeckerFree',
      href: contact.github,
      external: true,
    },
    {
      icon: <LinkedInIcon size={19} />,
      label: 'LinkedIn',
      value: 'in/elionelsoncortes',
      href: contact.linkedin,
      external: true,
    },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="contact__panel">
          <div className="contact__intro">
            <p className="section__index">05 — Contact</p>
            <h2 className="section__title">Let’s talk</h2>
            <p className="section__lead">
              Available for backend and full-stack work, remote or hybrid from Bogotá. The fastest
              way to reach me is email — I read everything.
            </p>
            <a className="btn btn--primary contact__cv" href={contact.cv} download>
              <DownloadIcon size={17} />
              Download my CV
            </a>
          </div>

          <ul className="contact__channels">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  className="contact__channel"
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                >
                  <span className="contact__icon" aria-hidden>
                    {channel.icon}
                  </span>
                  <span className="contact__text">
                    <span className="contact__label">{channel.label}</span>
                    <span className="contact__value">{channel.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
