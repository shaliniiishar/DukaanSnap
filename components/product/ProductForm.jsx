import { categories } from "../../data/categories";
import Button from "../common/Button";

const ProductForm = ({
  form,
  setForm,
  onSubmit,
  loading = false,
  buttonText = "Create Product",
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <form className="product-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">
          Product Name
        </label>

        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Cotton Kurti"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price</label>

          <input
            id="price"
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={handleChange}
            placeholder="799"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">
            Category
          </label>

          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add a short description of your product..."
          rows="5"
        />
      </div>

      <Button
        type="submit"
        fullWidth
        disabled={loading}
      >
        {loading ? "Creating Product..." : buttonText}
      </Button>
    </form>
  );
};

export default ProductForm;