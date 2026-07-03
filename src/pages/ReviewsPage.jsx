import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ReviewCard from "../components/ReviewCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";

import reviewsData from "../data/reviewsData.js";
import "./ReviewsPage.css";

function ReviewsPage() {
  const [searchParams] = useSearchParams();

  const initialCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const categories = [...new Set(reviewsData.map((review) => review.category))];

  const filteredReviews = useMemo(() => {
    return reviewsData.filter((review) => {
      const matchesSearch =
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.summary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory || review.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Todas as Reviews & Produtos</title>

        <meta
          name="description"
          content="Análises técnicas detalhadas dos melhores produtos do mercado."
        />
      </Helmet>

      <div className="min-h-screen">
        <Header />

        <section>
          <div className="container">

            {/* HEADER */}
            <motion.div
              className="reviews-header"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="reviews-title">
                Todas as Reviews & Produtos
              </h1>

              <p className="reviews-subtitle">
                Análises técnicas detalhadas dos melhores produtos do mercado.
              </p>
            </motion.div>

            {/* SEARCH */}
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
            />

            {/* CATEGORY FILTER */}
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* REVIEWS */}
            {filteredReviews.length > 0 ? (
              <div className="reviews-grid">
                {filteredReviews.map((review, index) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Nenhuma review encontrada.</p>

                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                  }}
                >
                  Limpar filtros
                </button>
              </div>
            )}

          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default ReviewsPage;