import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BookList from "../components/BookList";
import Cart from "../components/Cart";             // <-- Importa Cart
import { useCart } from "../hooks/useCart";
import { books } from "../mocks/books";

function Home() {
    const { cartItems, addToCart, removeFromCart } = useCart(); // <-- También obtenemos removeFromCart
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar cartItemCount={cartItems.length} onSearch={setSearchTerm} />

            <BookList books={filteredBooks} onAddToCart={addToCart} />

            <Cart cartItems={cartItems} onRemoveItem={removeFromCart} /> {/* <-- Aquí insertamos el carrito */}
        </div>
    );
}

export default Home;
