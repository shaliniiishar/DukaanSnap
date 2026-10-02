import React from "react";
import { useState } from "react";
import { Share2 } from "lucide-react";

import { getProducts } from "../utils/storage";
import ProductGrid from "../components/product/ProductGrid";
import EmptyState from "../components/common/EmptyState";
import ShareModal from "../components/shop/ShareModal";

const MyShop = () => {
  const products = getProducts();
  const [showShare, setShowShare] = useState(false);

  return (
    <div className="page">
      <div className="shop-header">
        <div>
          <span className="eyebrow">
            YOUR DIGITAL CATALOG
          </span>

          <h1>My Shop</h1>

          <p>
            {products.length} product
            {products.length !== 1 ? "s" : ""}
          </p>
        </div>

        {products.length > 0 && (
          <button
            className="button button-primary"
            onClick={() => setShowShare(true)}
          >
            <Share2 size={17} />
            Share Shop
          </button>
        )}
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyState />
      )}

      <ShareModal
        open={showShare}
        onClose={() => setShowShare(false)}
      />
    </div>
  );
};

export default MyShop;