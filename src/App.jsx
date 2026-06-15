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
import NotFoundPage from "./pages/NotFoundPage";

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
          path="/pr"
          element={<CategoryPortfolioPage categoryId="pr" />}
        />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/:clientSlug" element={<ClientDetailPage />} />
        <Route path="/client" element={<Navigate to="/clients" replace />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/marketing" element={<Navigate to="/design" replace />} />
        <Route path="/events" element={<Navigate to="/pr" replace />} />
        <Route path="/web" element={<Navigate to="/pr" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ColorProvider>
  </Router>
);

export default App;
