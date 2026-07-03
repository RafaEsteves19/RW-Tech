import { Link } from "react-router-dom";
import "./HomePage.css";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ReviewCard from "../components/ReviewCard.jsx";

import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import reviewsData from "../data/reviewsData.js";

function HomePage() {
  const categories = [
    { name: "Todos" },
    { name: "Smartphones" },
    { name: "Laptops" },
    { name: "Acessórios" },
    { name: "Smartwatches" },
    { name: "Fones" }
  ];

  // Seleciona as reviews com maiores notas
  const featuredReviews = [...reviewsData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="home">
      <Header />

      {/* HERO */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>
          Análises Técnicas que Você Pode Confiar
        </h1>

        <p>
          Reviews detalhados e imparciais baseados em testes reais.
        </p>
      </motion.section>

      {/* CATEGORIES */}
      <section className="section">
        <h2>Categorias</h2>

        <div className="category-filter">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={
                category.name === "Todos"
                  ? "/reviews"
                  : `/reviews?category=${encodeURIComponent(category.name)}`
              }
              className="category-button"
              style={
                category.name === "Todos"
                  ? {
                      backgroundColor: "#2563eb",
                      color: "#fff",
                      borderColor: "#2563eb",
                      boxShadow: "0 8px 20px rgba(59,130,246,0.25)"
                    }
                  : {}
              }
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED REVIEWS */}
      <section className="section">
        <div className="section-header">
          <div className="products-title">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Produtos Recomendados
          </div>

          <Link
            to="/reviews"
            className="view-all"
          >
            Ver todas →
          </Link>
        </div>

        <div className="reviews-grid">
          {featuredReviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={review}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="hero">
        <h2>
          Encontre o produto ideal para você
        </h2>

        <p>
          Veja análises completas, comparações e recomendações.
        </p>

        <Link
          to="/reviews"
          className="btn"
        >
          Explorar Reviews & Produtos
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;