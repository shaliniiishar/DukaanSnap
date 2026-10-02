import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { getProducts } from "../utils/storage";
import ProductGrid from "../components/product/ProductGrid";
import EmptyState from "../components/common/EmptyState";

const Home = () => {
  const products = getProducts();
  const recentProducts = products.slice(0, 3);

  return (
    <div className="page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="cloudinary-pill">
            <Sparkles size={16} />
            Powered by Cloudinary
          </div>

          <h1>
            Create your digital shop
            <span> in minutes.</span>
          </h1>

          <p>
            Upload your products, enhance their images
            with Cloudinary, add simple details and
            create a beautiful digital catalog.
          </p>

          <Link
            to="/add-product"
            className="button button-primary hero-button"
          >
            + Add Product
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="hero-cloudinary-card">
          <Link to="/add-product" className="mini-step">
  <span>01</span>
  Upload
</Link>

          <div className="mini-arrow">→</div>

          <Link to="/add-product" className="mini-step active">
  <span>02</span>
  Enhance
</Link>

          <div className="mini-arrow">→</div>

          <Link to="/shop" className="mini-step">
  <span>03</span>
  Sell
</Link>

          <div className="cloudinary-message">
            <CheckCircle2 size={18} />
            Cloudinary optimizes your product image
          </div>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total Products</span>
          <strong>{products.length}</strong>
        </div>

        <div className="stat-card">
          <span>Shop Status</span>
          <strong className="active-status">
            ● Shop Active
          </strong>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <h2>Recent Products</h2>
            <p>Your latest catalog items</p>
          </div>

          {products.length > 0 && (
            <Link to="/shop" className="text-link">
              View All →
            </Link>
          )}
        </div>

        {recentProducts.length > 0 ? (
          <ProductGrid products={recentProducts} />
        ) : (
          <EmptyState />
        )}
      </section>

      <section className="cloudinary-feature">
        <div>
          <span className="feature-label">
            CLOUDINARY IMAGE TRANSFORMATION
          </span>

          <h2>
            One photo.
            <br />
            Multiple possibilities.
          </h2>

          <p>
            DukaanSnap uses Cloudinary to transform
            ordinary product photos into clean,
            optimized images ready for digital commerce.
          </p>
        </div>

        <div className="feature-list">
          <div>
            <CheckCircle2 size={19} />
            Smart crop & resize
          </div>

          <div>
            <CheckCircle2 size={19} />
            Automatic image quality
          </div>

          <div>
            <CheckCircle2 size={19} />
            Automatic format delivery
          </div>

          <div>
            <CheckCircle2 size={19} />
            Responsive image delivery
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;