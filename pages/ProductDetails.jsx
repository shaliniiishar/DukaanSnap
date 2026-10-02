import React from "react";
import { useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Trash2,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { getProducts, deleteProduct, updateProduct } from "../utils/storage";
import { formatPrice } from "../utils/helpers";

import Button from "../components/common/Button";
import ConfirmDialog from "../components/common/ConfirmDialog";
import ProductForm from "../components/product/ProductForm";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = getProducts().find(
    (item) => item.id === id
  );

  const [editing, setEditing] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    category: product?.category || "",
    description: product?.description || "",
  });

  if (!product) {
    return (
      <div className="page empty-state">
        <h2>Product not found</h2>

        <Link
          to="/shop"
          className="button button-primary"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteProduct(id);
    navigate("/shop");
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    updateProduct(id, form);

    setEditing(false);

    window.location.reload();
  };

  return (
    <div className="page narrow-page">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={18} />
        Back to Shop
      </Link>

      {editing ? (
        <div className="card edit-card">
          <div className="page-heading">
            <span className="eyebrow">
              EDIT PRODUCT
            </span>

            <h1>Edit Product</h1>

            <p>
              Update your product information.
            </p>
          </div>

          <div className="edit-image">
            <img
              src={product.imageUrl}
              alt={product.name}
            />
          </div>

          <ProductForm
            form={form}
            setForm={setForm}
            onSubmit={handleUpdate}
            buttonText="Save Changes"
          />

          <Button
            variant="secondary"
            fullWidth
            onClick={() => setEditing(false)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <div className="detail-card">
            <div className="detail-image">
              <img
                src={product.imageUrl}
                alt={product.name}
              />
            </div>

            <div className="detail-info">
              <span className="category-badge">
                {product.category}
              </span>

              <h1>{product.name}</h1>

              <div className="detail-price">
                {formatPrice(product.price)}
              </div>

              <p>
                {product.description ||
                  "No description added."}
              </p>

              <div className="detail-actions">
                <Button
                  onClick={() => setEditing(true)}
                >
                  <Edit3 size={17} />
                  Edit Product
                </Button>

                <Button
                  variant="danger"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash2 size={17} />
                  Delete Product
                </Button>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            fullWidth
            onClick={() => navigate("/shop")}
          >
            Back to Shop
          </Button>
        </>
      )}

      <ConfirmDialog
        open={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default ProductDetails;