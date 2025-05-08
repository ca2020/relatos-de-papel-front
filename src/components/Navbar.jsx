// src/components/Navbar.jsx

import { useState } from "react";

function Navbar({ cartItemCount, onSearch, onCartToggle }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo" onClick={() => window.location.href = "/home"}>
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

            <div className="navbar__cart" onClick={onCartToggle}>
                🛒 <span className="navbar__cart-count">{cartItemCount}</span>
            </div>
        </nav>
    );
}

export default Navbar;
