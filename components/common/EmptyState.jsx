import { PackagePlus } from "lucide-react";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <PackagePlus size={32} />
      </div>

      <h3>Your shop is empty</h3>

      <p>
        Add your first product and start building your
        digital catalog.
      </p>

      <Link to="/add-product" className="button button-primary">
        + Add Product
      </Link>
    </div>
  );
};

export default EmptyState;