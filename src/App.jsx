import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ColorProvider } from "./context/ColorContext";
import GlobalNavbar from "./components/GlobalNavbar";
import HomePage from "./pages/HomePage";
import CategoryPortfolioPage from "./pages/CategoryPortfolioPage";
import ClientsPage from "./pages/ClientsPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import ServicesPage from "./pages/ServicesPage";

const App = () => (
  <Router>
    <ColorProvider>
      <GlobalNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/branding"
          element={<CategoryPortfolioPage categoryId="branding" />}
        />
        <Route
          path="/production"
          element={<CategoryPortfolioPage categoryId="production" />}
        />
        <Route
          path="/design"
          element={<CategoryPortfolioPage categoryId="design" />}
        />
        <Route
          path="/events"
          element={<CategoryPortfolioPage categoryId="events" />}
        />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/:clientSlug" element={<ClientDetailPage />} />
        <Route path="/client" element={<Navigate to="/clients" replace />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/marketing" element={<Navigate to="/design" replace />} />
        <Route path="/pr" element={<Navigate to="/branding" replace />} />
        <Route path="/web" element={<Navigate to="/events" replace />} />
      </Routes>
    </ColorProvider>
  </Router>
);

export default App;
