import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BookList from "../components/BookList";
import Cart from "../components/Cart";
import Toast from "../components/Toast";
import { useCart } from "../hooks/useCart";
import { books } from "../mocks/books";
import { useTheme } from "../hooks/useTheme";

function Home() {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const [searchTerm, setSearchTerm] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [filterGenre, setFilterGenre] = useState("Todos");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 8;

    const { isDark } = useTheme();

    const filteredBooks = books
        .filter((book) => {
            const term = searchTerm.toLowerCase();
            return (
                book.title.toLowerCase().includes(term) ||
                book.author.toLowerCase().includes(term) ||
                book.genre.toLowerCase().includes(term)
            );
        })
        .filter((book) =>
            filterGenre === "Todos" ? true : book.genre === filterGenre
        )
        .sort((a, b) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleAddToCart = (book) => {
        addToCart(book);
        showToast(`"${book.title}" añadido al carrito ✅`);
    };

    const handleRemoveFromCart = (bookId) => {
        removeFromCart(bookId);
        showToast(`Producto eliminado del carrito ❌`);
    };

    return (
        <div className={`${isDark ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"} relative min-h-screen`}>
            <Navbar
                cartItemCount={cartItems.length}
                onSearch={(term) => {
                    setSearchTerm(term);
                    setCurrentPage(1);
                }}
                onCartToggle={() => setIsCartOpen(!isCartOpen)}
            />

            {/* Filtros */}
            <div className="flex flex-wrap gap-2 px-6 mt-6 mb-4">
                <button
                    onClick={() => {
                        setFilterGenre("Todos");
                        setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full border text-sm transition ${
                        filterGenre === "Todos"
                            ? "bg-indigo-600 text-white shadow"
                            : "bg-white hover:bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                    }`}
                >
                    Todos
                </button>
                {[
                    "Realismo Mágico",
                    "Distopía",
                    "Fábula",
                    "Clásico"
                ].map((g) => (
                    <button
                        key={g}
                        onClick={() => {
                            setFilterGenre(g);
                            setCurrentPage(1);
                        }}
                        className={`px-4 py-2 rounded-full border text-sm transition ${
                            filterGenre === g
                                ? "bg-indigo-600 text-white shadow"
                                : "bg-white hover:bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                        }`}
                    >
                        {g}
                    </button>
                ))}

                <button
                    onClick={() => {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        setCurrentPage(1);
                    }}
                    className="ml-auto bg-gray-100 dark:bg-gray-800 dark:text-white px-4 py-2 rounded text-sm"
                >
                    Precio: {sortOrder === "asc" ? "↑" : "↓"}
                </button>
            </div>

            <div className="px-6 max-w-screen-xl mx-auto">
                <BookList books={currentBooks} onAddToCart={handleAddToCart} />
            </div>

            <div className="flex justify-center items-center space-x-2 my-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-full border text-sm ${
                            page === currentPage
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {isCartOpen && (
                <>
                    <div
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    ></div>
                    <Cart
                        cartItems={cartItems}
                        onRemoveItem={handleRemoveFromCart}
                        onIncreaseQuantity={increaseQuantity}
                        onDecreaseQuantity={decreaseQuantity}
                        onClose={() => setIsCartOpen(false)}
                        onClearCart={clearCart}
                    />
                </>
            )}

            {toastMessage && <Toast message={toastMessage} />}
        </div>
    );
}

export default Home;
