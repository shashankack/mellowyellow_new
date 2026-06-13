import { useEffect, useMemo, useRef, useState } from "react";
import StaggeredMenu from "./StaggeredMenu";
import { useColor } from "../context/ColorContext";
import { themes } from "../config/themes";
import { portfolioCategories } from "../data/portfolio";
import "../styles/GlobalNavbar.scss";

const socialItems = [
  { label: "Instagram", link: "https://www.instagram.com/mellowyellowstudio/" },
  {
    label: "Social Dining",
    link: "https://www.instagram.com/socialdining.in/",
  },
  { label: "Email", link: "mailto:mellowyellowstudios09@gmail.com" },
  {
    label: "WhatsApp",
    link: "https://wa.me/+917760618621?text=Hi%2C%20I'm%20interested%20in%20your%20services",
  },
];

const SCROLL_THRESHOLD = 16;
const TOP_OFFSET = 48;

const GlobalNavbar = () => {
  const { theme, setTheme } = useColor();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const menuItems = useMemo(
    () => [
      { label: "Home", ariaLabel: "Go to home page", link: "/" },
      { label: "Clients", ariaLabel: "View our clients", link: "/clients" },
      { label: "Services", ariaLabel: "View our services", link: "/services" },
      ...portfolioCategories.map((category) => ({
        label: category.label,
        ariaLabel: `View ${category.label} work`,
        link: category.slug,
      })),
    ],
    [],
  );

  const menuTheme = useMemo(
    () => ({
      "--sm-accent": theme.backgroundColor,
      "--sm-panel-bg": theme.primaryColor,
      "--sm-panel-text": theme.secondaryColor,
      "--sm-header-bg": theme.secondaryColor,
      "--sm-header-text": theme.primaryColor,
    }),
    [theme.backgroundColor, theme.primaryColor, theme.secondaryColor],
  );

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        if (isMenuOpen || currentY <= TOP_OFFSET) {
          setIsVisible(true);
        } else if (currentY > lastScrollY.current + SCROLL_THRESHOLD) {
          setIsVisible(false);
        } else if (currentY < lastScrollY.current - SCROLL_THRESHOLD) {
          setIsVisible(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  const headerSlot = (
    <div className="global-navbar__actions">
      <span className="global-navbar__status" aria-hidden="true">
        Creative Studio
      </span>
      <div className="global-navbar__themes" aria-label="Choose theme">
        {themes.map((item, index) => {
          const isActive = theme.backgroundColor === item.backgroundColor;
          return (
            <button
              key={item.backgroundColor}
              type="button"
              className={`global-navbar__theme-swatch${isActive ? " is-active" : ""}`}
              style={{ backgroundColor: item.backgroundColor }}
              aria-label={`Theme ${index + 1}`}
              aria-pressed={isActive}
              onClick={(event) => {
                event.stopPropagation();
                setTheme(item);
              }}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <nav
      className={`global-navbar${isVisible ? "" : " is-hidden"}`}
      style={menuTheme}
      aria-label="Site navigation"
      aria-hidden={!isVisible && !isMenuOpen}
    >
      <StaggeredMenu
        isFixed
        position="right"
        className="global-navbar__menu"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering
        logoText="Mellow Yellow"
        logoLink="/"
        menuButtonColor={theme.primaryColor}
        openMenuButtonColor={theme.primaryColor}
        changeMenuColorOnOpen={false}
        colors={[theme.backgroundColor, theme.secondaryColor]}
        accentColor={theme.backgroundColor}
        headerSlot={headerSlot}
        onMenuOpen={() => {
          setIsMenuOpen(true);
          setIsVisible(true);
        }}
        onMenuClose={() => {
          setIsMenuOpen(false);
          if (window.scrollY > TOP_OFFSET) {
            setIsVisible(false);
          }
        }}
      />
    </nav>
  );
};

export default GlobalNavbar;
