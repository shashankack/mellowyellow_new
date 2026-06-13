import "../styles/portfolio.scss";
import MediaImage from "./MediaImage";

const ProjectGrid = ({ projects, variant = "branding" }) => {
  const cellClass = variant === "marketing" ? "lol2" : "lol1";

  return (
    <div className="portfolio-showcase">
      {projects.map((project) => (
        <section key={project.id} className="portfolio-project">
          <div className="portfolio-project__meta">
            <h2>{project.client}</h2>
            <p className="portfolio-project__services">{project.services}</p>
            <p className="portfolio-project__description">{project.description}</p>
          </div>
          <div className={`portfolio-project__grid ${variant}`}>
            {project.images.map((image, index) => (
              <div key={`${project.id}-${index}`} className={cellClass}>
                <MediaImage src={image} alt={`${project.client} ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProjectGrid;
