import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import reviewsData from "../data/reviewsData.js";

import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = reviewsData.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <>
        <Header />

        <div className="product-not-found">
          <h1>Produto não encontrado</h1>

          <Link to="/reviews" className="back-button">
            ← Voltar para Reviews
          </Link>
        </div>

        <Footer />
      </>
    );
  }

  const images =
    product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.productImage];

  const [currentImage, setCurrentImage] = useState(0);

  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <Header />

      <main className="product-page">

        <button
            className="back-page-button"
            onClick={() => navigate(-1)}
            >
         ← Voltar
        </button>

        <div className="product-container">

          {/* Imagem */}

          <div className="product-image-section">

            <div className="main-image">

                <button
                    className="image-arrow"
                    onClick={() =>
                        setCurrentImage(
                            currentImage === 0
                                ? images.length - 1
                                : currentImage - 1
                        )
                    }
                >
                    ❮
                </button>

                <img
                    src={images[currentImage]}
                    onClick={() => setLightboxOpen(true)}
                    alt={product.title}
                    className="product-image"
                />

                <button
                    className="image-arrow"
                    onClick={() =>
                        setCurrentImage(
                            (currentImage + 1) % images.length
                        )
                    }
                >
                    ❯
                </button>

            </div>

            <div className="thumbnail-list">

                {images.map((image, index) => (

                    <img
                        key={index}
                        src={image}
                        alt=""
                        className={
                            currentImage === index
                                ? "thumbnail active-thumbnail"
                                : "thumbnail"
                        }
                        onClick={() => setCurrentImage(index)}
                    />

                ))}

            </div>

          </div>

          {/* Informações */}

          <div className="product-info">

            <span className="product-category">
              {product.category}
            </span>

            <h1>{product.title}</h1>

            <div className="product-rating">
              ⭐ {product.rating}/10
            </div>

            <p className="product-summary">
              {product.summary}
            </p>

            <div className="product-price">
              R$ {product.price.toLocaleString("pt-BR")}
            </div>

            <a
              href={product.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-button"
            >
              Comprar no Mercado Livre
            </a>

          </div>

        </div>

        <section className="content-section">

          <h2>Introdução</h2>

          <p>{product.introduction}</p>

        </section>

        <section className="content-section">

          <h2>Especificações</h2>

          <div className="specifications">

            {Object.entries(product.specifications).map(([key, value]) => (

              <div
                key={key}
                className="spec-item"
              >
                <strong>{key}</strong>

                <span>{value}</span>

              </div>

            ))}

          </div>

        </section>

        <section className="content-section">

          <h2>Pontos positivos</h2>

          <ul>

            {product.pros.map((item, index) => (

              <li key={index}>{item}</li>

            ))}

          </ul>

        </section>

        <section className="content-section">

          <h2>Análise</h2>

          <p>{product.analysis}</p>

        </section>

        <section className="content-section">

          <h2>Conclusão</h2>

          <p>{product.verdict}</p>

        </section>

      </main>

            {
            lightboxOpen && (

            <div
                className="lightbox"
                onClick={() => setLightboxOpen(false)}
            >

                <div
                    className="lightbox-content"
                    onClick={(e)=>e.stopPropagation()}
                >

                    <button
                        className="lightbox-close"
                        onClick={()=>setLightboxOpen(false)}
                    >
                        ✕
                    </button>

                    <button
                        className="lightbox-arrow"
                        onClick={()=>

                            setCurrentImage(
                                currentImage===0
                                ? images.length-1
                                : currentImage-1
                            )

                        }
                    >
                        ❮
                    </button>

                    <img
                        src={images[currentImage]}
                        className="lightbox-image"
                        alt=""
                    />

                    <button
                        className="lightbox-arrow"
                        onClick={()=>

                            setCurrentImage(
                                (currentImage+1)%images.length
                            )

                        }
                    >
                        ❯
                    </button>

                </div>

            </div>

            )}

      <Footer />
    </>
  );
}

export default ProductPage;