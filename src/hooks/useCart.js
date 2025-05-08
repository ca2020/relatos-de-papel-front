// src/hooks/useCart.js

import { useState } from 'react';

export function useCart() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (book) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === book.id);
            if (existingItem) {
                // Opcional: podrías aumentar cantidad si ya existe
                return prevItems;
            }
            return [...prevItems, book];
        });
    };

    const removeFromCart = (bookId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== bookId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart
    };
}
