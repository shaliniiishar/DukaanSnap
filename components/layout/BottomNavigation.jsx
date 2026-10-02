import { Home, Plus, Store } from "lucide-react";
import { NavLink } from "react-router-dom";

const BottomNavigation = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/">
        <Home size={21} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/add-product" className="add-nav-button">
        <Plus size={24} />
        <span>Add</span>
      </NavLink>

      <NavLink to="/shop">
        <Store size={21} />
        <span>My Shop</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavigation;