import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ cartItemCount, onSearch, onSearchFieldChange, onCartToggle }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchField, setSearchField] = useState("title");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleFieldChange = (e) => {
        const field = e.target.value;
        setSearchField(field);
        onSearchFieldChange(field);
    };

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-50">
            <div className="text-2xl font-bold text-indigo-700 cursor-pointer" onClick={() => navigate("/home")}>
                📚 Relatos de Papel
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 flex-grow max-w-2xl mx-auto w-full">
                <select
                    value={searchField}
                    onChange={handleFieldChange}
                    className="px-3 py-2 border rounded-md bg-white"
                >
                    <option value="title">Título</option>
                    <option value="author">Autor</option>
                    <option value="genre">Género</option>
                </select>
                <input
                    type="text"
                    placeholder={`Buscar por ${searchField}...`}
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => alert("Función de login aún no implementada")}
                    className="text-indigo-700 font-medium hover:underline"
                >
                    Iniciar sesión
                </button>
                <div onClick={onCartToggle} className="relative cursor-pointer text-2xl">
                    🛒
                    {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {cartItemCount}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
