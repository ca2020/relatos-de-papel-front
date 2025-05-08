// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ cartItemCount, onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); // función pasada desde Home para filtrar libros
    };

    const handleLogoClick = () => {
        navigate("/home");
    };

    const handleCheckoutClick = () => {
        navigate("/checkout");
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo" onClick={handleLogoClick}>
                📚 Relatos de Papel
            </div>

            <div className="navbar__search">
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>

            <div className="navbar__cart" onClick={handleCheckoutClick}>
                🛒 <span className="navbar__cart-count">{cartItemCount}</span>
            </div>
        </nav>
    );
}

export default Navbar;
