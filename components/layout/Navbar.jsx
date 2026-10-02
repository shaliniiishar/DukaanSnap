import { Link, NavLink } from "react-router-dom";
import { Store } from "lucide-react";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <Store size={21} />
          </div>

          <span>
            Dukaan<span>Snap</span>
          </span>
        </Link>

        <nav className="desktop-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add-product">Add Product</NavLink>
          <NavLink to="/shop">My Shop</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;