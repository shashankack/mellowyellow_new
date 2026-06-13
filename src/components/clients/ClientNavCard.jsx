import { Link } from "react-router-dom";
import MediaImage from "../MediaImage";
import { getClientPath } from "../../data/clients";

const ClientNavCard = ({ client, direction }) => {
  if (!client) {
    return <div className="client-detail__nav-slot client-detail__nav-slot--empty" />;
  }

  const isPrev = direction === "prev";

  return (
    <Link
      to={getClientPath(client.slug)}
      className={`client-detail__nav-card client-detail__nav-card--${direction}`}
    >
      <span className="client-detail__nav-label">
        {isPrev ? "Previous client" : "Next client"}
      </span>
      <span className="client-detail__nav-body">
        {isPrev && <span className="client-detail__nav-arrow">←</span>}
        <MediaImage
          src={client.thumbnail}
          alt=""
          loading="lazy"
          wrapperClassName="media-shell--fill client-detail__nav-thumb-shell"
          className="client-detail__nav-thumb"
        />
        <span className="client-detail__nav-copy">
          <span className="client-detail__nav-title">{client.title}</span>
          <span className="client-detail__nav-meta">{client.description}</span>
        </span>
        {!isPrev && <span className="client-detail__nav-arrow">→</span>}
      </span>
    </Link>
  );
};

export default ClientNavCard;
