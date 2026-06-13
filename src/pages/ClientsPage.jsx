import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ClientCard from "../components/clients/ClientCard";
import ClientsPageShell from "../components/clients/ClientsPageShell";
import {
  allClients,
  clientShowcase,
  legacyClients,
} from "../data/clients";
import { clientsFadeUp, clientsStagger } from "../components/clients/clientsMotion";
import "../styles/ClientsPage.scss";

const ClientsPage = () => (
  <ClientsPageShell>
    <header className="clients-page__hero clients-page__inset">
      <motion.div
        className="clients-page__hero-copy"
        initial="hidden"
        animate="visible"
        variants={clientsStagger}
      >
        <motion.p className="clients-page__eyebrow" variants={clientsFadeUp}>
          Partnerships
        </motion.p>
        <motion.h1 className="clients-page__title" variants={clientsFadeUp}>
          Clients we&apos;ve built with
        </motion.h1>
        <motion.p className="clients-page__description" variants={clientsFadeUp}>
          From hospitality launches to identity rollouts — a roster of brands
          we&apos;ve partnered with across branding, design, production, and
          events.
        </motion.p>
        <motion.p className="clients-page__stat" variants={clientsFadeUp}>
          {allClients.length} collaborations
        </motion.p>
      </motion.div>
    </header>

    <main className="clients-page__main">
      <section className="clients-page__section clients-page__inset">
        <header className="clients-page__section-header">
          <p className="clients-page__eyebrow">Featured</p>
          <h2>Recent partnerships</h2>
        </header>

        <motion.div
          className="clients-page__grid clients-page__grid--featured"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={clientsStagger}
        >
          {clientShowcase.map((client) => (
            <ClientCard key={client.id} client={client} variant="featured" />
          ))}
        </motion.div>
      </section>

      <section className="clients-page__section clients-page__inset">
        <header className="clients-page__section-header">
          <p className="clients-page__eyebrow">Archive</p>
          <h2>Extended roster</h2>
        </header>

        <motion.div
          className="clients-page__grid clients-page__grid--archive"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={clientsStagger}
        >
          {legacyClients.map((client) => (
            <ClientCard key={client.id} client={client} variant="archive" />
          ))}
        </motion.div>
      </section>
    </main>

    <footer className="clients-page__footer clients-page__inset">
      <Link to="/" className="clients-page__back">
        ← Back to home
      </Link>
      <Link to="/#portfolio" className="clients-page__back">
        Browse portfolio →
      </Link>
    </footer>
  </ClientsPageShell>
);

export default ClientsPage;
