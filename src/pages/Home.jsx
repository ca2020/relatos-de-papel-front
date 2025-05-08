// src/pages/Home.jsx

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BookList from "../components/BookList";
import Cart from "../components/Cart";
import Toast from "../components/Toast"; // <-- Importa Toast
import { useCart } from "../hooks/useCart";
import { books } from "../mocks/books";

function Home() {
    const { cartItems, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
    const [searchTerm, setSearchTerm] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(null); // <-- Estado para Toast

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => setToastMessage(null), 3000); // 3 segundos y desaparece
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
        <div className="relative">
            <Navbar
                cartItemCount={cartItems.length}
                onSearch={setSearchTerm}
                onCartToggle={() => setIsCartOpen(!isCartOpen)}
            />

            <div className="text-4xl text-blue-500 font-bold text-center my-6">
                Tailwind está funcionando 🎉
            </div>

            <BookList books={filteredBooks} onAddToCart={handleAddToCart} />

            {isCartOpen && (
                <div
                    onClick={() => setIsCartOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                ></div>
            )}

            {isCartOpen && (
                <Cart
                    cartItems={cartItems}
                    onRemoveItem={handleRemoveFromCart}
                    onIncreaseQuantity={increaseQuantity}
                    onDecreaseQuantity={decreaseQuantity}
                    onClose={() => setIsCartOpen(false)}
                    onClearCart={clearCart}
                />
            )}

            {toastMessage && <Toast message={toastMessage} />}
        </div>
    );
}

export default Home;
