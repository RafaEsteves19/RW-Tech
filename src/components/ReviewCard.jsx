import { Link } from "react-router-dom";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  const categoryColors = {
    Smartphones: "smartphones",
    Laptops: "laptops",
    Acessórios: "accessories",
    Fones: "headphones",
    Smartwatches: "smartwatches"
  };

  return (
    <div className="review-card">

      <Link
        to={`/product/${review.id}`}
        className="review-link"
      >

        <div className="review-image">
          <img
            src={review.productImage}
            alt={review.title}
          />

          <span
            className={`category ${categoryColors[review.category] || "default"}`}
          >
            {review.category}
          </span>
        </div>

        <div className="review-content">

          <h3>{review.title}</h3>

          <div className="rating">
            ⭐ {review.rating}
          </div>

          <p className="summary">
            {review.summary}
          </p>

          <div className="read-more">
            Ver análise →
          </div>

        </div>

      </Link>

    </div>
  );
}

export default ReviewCard;