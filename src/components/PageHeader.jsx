import "../styles/portfolio.scss";

const PageHeader = ({ eyebrow, title, description }) => (
  <header className="portfolio-header">
    <p className="portfolio-header__eyebrow">{eyebrow}</p>
    <h1 className="portfolio-header__title">{title}</h1>
    <p className="portfolio-header__description">{description}</p>
  </header>
);

export default PageHeader;
