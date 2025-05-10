import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

function Navbar({ cartItemCount, onSearch, onCartToggle }) {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { isDark, toggleTheme } = useTheme();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Busca en todos los campos desde Home
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-50 transition-colors duration-300">
            <div
                className="text-2xl font-bold text-indigo-700 dark:text-white cursor-pointer"
                onClick={() => navigate("/home")}
            >
                📚 Relatos de Papel
            </div>

            <div className="flex-grow max-w-2xl mx-auto w-full">
                <input
                    type="text"
                    placeholder="Buscar por título, autor o género..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                />
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="text-sm hover:underline dark:text-white"
                >
                    {isDark ? "☀️ Modo claro" : "🌙 Modo oscuro"}
                </button>
                <button
                    onClick={() => alert("Función de login aún no implementada")}
                    className="text-indigo-700 dark:text-indigo-300 font-medium hover:underline"
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
