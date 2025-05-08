// src/pages/Home.jsx

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BookList from "../components/BookList";
import Cart from "../components/Cart";
import { useCart } from "../hooks/useCart";
import { books } from "../mocks/books";

function Home() {
    const { cartItems, addToCart, removeFromCart, clearCart } = useCart(); // <-- Agrega clearCart aquí
    const [searchTerm, setSearchTerm] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

            <BookList books={filteredBooks} onAddToCart={addToCart} />

            {/* --- Overlay --- */}
            {isCartOpen && (
                <div
                    onClick={() => setIsCartOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                ></div>
            )}

            {/* --- Carrito --- */}
            {isCartOpen && (
                <Cart
                    cartItems={cartItems}
                    onRemoveItem={removeFromCart}
                    onClose={() => setIsCartOpen(false)}
                    onClearCart={clearCart} // <-- Aquí pasamos clearCart
                />
            )}
        </div>
    );
}

export default Home;
