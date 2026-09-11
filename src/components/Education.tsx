import { profile } from '../data/profile';
import './Education.css';

export function Education() {
  return (
    <section id="education" className="section section--alt">
      <div className="container">
        <div className="section__head">
          <p className="section__index">04 — Education &amp; training</p>
          <h2 className="section__title">Still learning</h2>
          <p className="section__lead">
            A systems engineering degree, and a deliberate habit of going back to school — most
            recently on minimal APIs, microservices and cloud automation.
          </p>
        </div>

        <div className="education__grid">
          {profile.education.map((item) => (
            <article className="education__card" key={item.title}>
              <p className="education__period">{item.period}</p>
              <h3 className="education__title">{item.title}</h3>
              <p className="education__institution">{item.institution}</p>
              <p className="education__detail">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
