import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import WhyConnectedCare from "@/pages/WhyConnectedCare";
import Scorecard from "@/pages/Scorecard";
import About from "@/pages/About";
import Resources from "@/pages/Resources";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/why-connected-care" element={<WhyConnectedCare />} />
        <Route path="/scorecard" element={<Scorecard />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </BrowserRouter>
  );
}

export default App;
