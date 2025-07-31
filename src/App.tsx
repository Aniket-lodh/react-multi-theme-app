import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Helmet } from "react-helmet";

const App: React.FC = () => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>MultiTheme App - React Assessment</title>
      <meta name="description" content="A React multi-theme switcher application" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@300;400;700;900&family=Pacifico:wght@400&display=swap"
        rel="stylesheet"
      />

      <link
        rel="preload"
        href="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self'; connect-src 'self' https://dummyjson.com; img-src 'self' https: data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self';"
      />
    </Helmet>

    <BrowserRouter>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </>
);

export default App;
