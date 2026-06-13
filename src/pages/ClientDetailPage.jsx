import { useCallback, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ClientGallery from "../components/clients/ClientGallery";
import ClientNavCard from "../components/clients/ClientNavCard";
import ClientsPageShell from "../components/clients/ClientsPageShell";
import MediaImage from "../components/MediaImage";
import MediaPreviewModal from "../components/MediaPreviewModal";
import {
  allClients,
  CLIENTS_INDEX_PATH,
  getClientBySlug,
  getClientNeighbors,
  getClientPath,
  getClientServices,
  getRelatedClients,
} from "../data/clients";
import { clientsFadeUp, clientsStagger } from "../components/clients/clientsMotion";
import "../styles/ClientsPage.scss";
import "../styles/ClientDetailPage.scss";

const ClientDetailPage = () => {
  const { clientSlug } = useParams();
  const client = getClientBySlug(clientSlug);
  const [preview, setPreview] = useState(null);

  const openPreview = useCallback((item) => setPreview(item), []);
  const closePreview = useCallback(() => setPreview(null), []);

  if (!client) {
    return <Navigate to={CLIENTS_INDEX_PATH} replace />;
  }

  const { prev, next, index } = getClientNeighbors(client.slug);
  const services = getClientServices(client);
  const related = getRelatedClients(client);
  const showGallery = client.images.length > 1;
  const position = String(index + 1).padStart(2, "0");
  const total = String(allClients.length).padStart(2, "0");

  return (
    <ClientsPageShell className="clients-page--detail">
      <div className="client-detail">
        <header className="client-detail__top clients-page__inset">
          <Link to={CLIENTS_INDEX_PATH} className="clients-page__back">
            ← All clients
          </Link>
          <span className="client-detail__position">
            {position}
            <span className="client-detail__position-sep">/</span>
            {total}
          </span>
        </header>

        <section className="client-detail__hero clients-page__inset">
          <motion.div
            className="client-detail__intro"
            initial="hidden"
            animate="visible"
            variants={clientsStagger}
          >
            <motion.p className="clients-page__eyebrow" variants={clientsFadeUp}>
              {client.group === "featured" ? "Featured client" : "Archive client"}
            </motion.p>
            <motion.h1 className="client-detail__title" variants={clientsFadeUp}>
              {client.title}
            </motion.h1>

            <motion.ul className="client-detail__tags" variants={clientsFadeUp}>
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </motion.ul>

            <motion.p className="client-detail__summary" variants={clientsFadeUp}>
              {client.summary ?? client.description}
            </motion.p>

            <motion.div className="client-detail__stats" variants={clientsFadeUp}>
              <span>{client.images.length} visuals</span>
              <span>{client.group === "featured" ? "Recent work" : "Legacy roster"}</span>
            </motion.div>
          </motion.div>

          <motion.button
            type="button"
            className="client-detail__cover"
            variants={clientsFadeUp}
            initial="hidden"
            animate="visible"
            aria-label={`Preview ${client.title}`}
            onClick={() =>
              openPreview({
                type: "image",
                src: client.content,
                title: client.title,
                description: client.description,
              })
            }
          >
            <MediaImage
              src={client.content}
              alt={client.title}
              wrapperClassName="media-shell--fill client-detail__cover-shell"
              className="client-detail__cover-img"
            />
            <span className="client-detail__cover-hint">View full size</span>
          </motion.button>
        </section>

        {showGallery && (
          <section className="client-detail__work">
            <header className="client-detail__work-header clients-page__inset">
              <p className="clients-page__eyebrow">Deliverables</p>
              <h2>Project gallery</h2>
              <p className="client-detail__work-note">
                Tap any image to open a full-screen preview.
              </p>
            </header>

            <ClientGallery client={client} onPreview={openPreview} />
          </section>
        )}

        {related.length > 0 && (
          <section className="client-detail__related clients-page__inset">
            <header className="client-detail__related-header">
              <p className="clients-page__eyebrow">Explore</p>
              <h2>More in {client.group === "featured" ? "recent work" : "the archive"}</h2>
            </header>

            <div className="client-detail__related-grid">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={getClientPath(item.slug)}
                  className="client-detail__related-card"
                >
                  <MediaImage
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    wrapperClassName="media-shell--fill client-detail__related-shell"
                    className="client-detail__related-img"
                  />
                  <span className="client-detail__related-meta">
                    <span className="client-detail__related-title">{item.title}</span>
                    <span className="client-detail__related-tags">{item.description}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="client-detail__footer clients-page__inset">
          <ClientNavCard client={prev} direction="prev" />
          <ClientNavCard client={next} direction="next" />
        </footer>
      </div>

      <MediaPreviewModal preview={preview} onClose={closePreview} />
    </ClientsPageShell>
  );
};

export default ClientDetailPage;
