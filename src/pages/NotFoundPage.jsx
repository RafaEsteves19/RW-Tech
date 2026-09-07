import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <Header />

      <main className="not-found-content">

        <div className="not-found-number">
          404
        </div>

        <h1>
          Página não encontrada
        </h1>

        <p>
          A página que você está procurando não existe,
          foi movida ou não está mais disponível.
        </p>

        <div className="not-found-actions">

          <button
            className="not-found-back"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} />
            Voltar
          </button>

          <Link
            to="/"
            className="not-found-home"
          >
            <Home size={18} />
            Ir para o início
          </Link>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default NotFoundPage;