import React from "react";
import { ArrowLeft, CheckCircle2, Edit3, ShoppingBag } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/helpers";
import Button from "../components/common/Button";

const ProductPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  if (!product) {
    return (
      <div className="page empty-state">
        <h2>No product to preview</h2>

        <Link
          to="/add-product"
          className="button button-primary"
        >
          Add Product
        </Link>
      </div>
    );
  }

  return (
    <div className="page narrow-page">
      <Link to="/add-product" className="back-link">
        <ArrowLeft size={18} />
        Back to Edit
      </Link>

      <div className="page-heading">
        <span className="eyebrow">
          STEP 3
        </span>

        <h1>Product Preview</h1>

        <p>
          This is how your product will appear in your
          digital catalog.
        </p>
      </div>

      <div className="preview-card">
        <div className="preview-image">
          <img
            src={product.imageUrl}
            alt={product.name}
          />
        </div>

        <div className="preview-info">
          <span className="category-badge">
            {product.category}
          </span>

          <h2>{product.name}</h2>

          <div className="preview-price">
            {formatPrice(product.price)}
          </div>

          <p>
            {product.description ||
              "No description added."}
          </p>

          <div className="preview-confirm">
            <CheckCircle2 size={18} />
            Cloudinary image ready for your shop
          </div>

          <div className="preview-actions">
            <Button
              variant="secondary"
              onClick={() =>
                navigate("/add-product")
              }
            >
              <Edit3 size={17} />
              Edit
            </Button>

            <Button
              onClick={() =>
                navigate("/shop")
              }
            >
              <ShoppingBag size={17} />
              Add to Shop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;