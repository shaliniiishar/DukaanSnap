import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";
import { formatPrice } from "../../utils/helpers";
import { deleteProduct } from "../../utils/storage";

const ProductCard = ({ product }) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) return;

    deleteProduct(product.id);

    // Refresh only the shop view
    window.location.reload();
  };

  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </div>

      <div className="product-card-content">
        <span className="category-badge">
          {product.category}
        </span>

        <h3>{product.name}</h3>

        <strong>
          {formatPrice(product.price)}
        </strong>

        <div className="product-card-actions">
          <Link
            to={`/product/${product.id}`}
            className="view-product-button"
          >
            <Eye size={17} />
            View
          </Link>

          <button
            type="button"
            className="delete-product-button"
            onClick={handleDelete}
          >
            <Trash2 size={17} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;