import { profile } from '../data/profile';
import './Skills.css';

export function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <div className="section__head">
          <p className="section__index">02 — Skills</p>
          <h2 className="section__title">What I work with</h2>
          <p className="section__lead">
            Fifteen years centred on the .NET platform, extended over time into cloud
            infrastructure, automation and enough front-end to be useful on a full-stack team.
          </p>
        </div>

        <div className="skills__grid">
          {profile.skills.map((group) => (
            <div className="skills__group" key={group.name}>
              <h3 className="skills__group-name">{group.name}</h3>
              <ul className="skills__list">
                {group.skills.map((skill) => (
                  <li className="chip" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
