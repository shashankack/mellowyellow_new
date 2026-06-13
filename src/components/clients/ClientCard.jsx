import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MediaImage from "../MediaImage";
import { getClientPath } from "../../data/clients";
import { clientsFadeUp } from "./clientsMotion";

const ClientCard = ({ client, variant = "featured" }) => (
  <motion.article
    className={`clients-page__card clients-page__card--${variant}`}
    variants={clientsFadeUp}
  >
    <Link
      to={getClientPath(client.slug)}
      className="clients-page__card-media"
      aria-label={`View ${client.title}`}
    >
      <MediaImage
        src={client.thumbnail}
        alt={client.title}
        loading="lazy"
        wrapperClassName="media-shell--fill clients-page__card-shell"
        className="clients-page__card-img"
      />
      <span className="clients-page__card-overlay" aria-hidden="true" />
    </Link>
    <div className="clients-page__card-meta">
      <h3>
        <Link to={getClientPath(client.slug)}>{client.title}</Link>
      </h3>
      <p>{client.description}</p>
    </div>
  </motion.article>
);

export default ClientCard;
