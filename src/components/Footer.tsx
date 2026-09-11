import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          © {new Date().getFullYear()} Elio Cortés · Built with React, TypeScript and Vite
        </p>
        <div className="footer__links">
          <a
            href="https://github.com/NeckerFree/portfolio-2026"
            target="_blank"
            rel="noreferrer noopener"
          >
            Source
          </a>
          <a href="#home">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
