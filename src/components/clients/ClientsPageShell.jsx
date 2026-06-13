import { useColor } from "../../context/ColorContext";

const ClientsPageShell = ({ className = "", children }) => {
  const { theme } = useColor();

  const pageTheme = {
    "--page-bg": theme.secondaryColor,
    "--page-text": theme.primaryColor,
    "--page-accent": theme.backgroundColor,
  };

  return (
    <div className={`clients-page${className ? ` ${className}` : ""}`} style={pageTheme}>
      {children}
    </div>
  );
};

export default ClientsPageShell;
