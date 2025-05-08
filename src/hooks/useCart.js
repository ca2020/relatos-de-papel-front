// src/hooks/useCart.js

import { useState } from 'react';

export function useCart() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (book) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === book.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === book.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...book, quantity: 1 }];
        });
    };

    const removeFromCart = (bookId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== bookId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const increaseQuantity = (bookId) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.id === bookId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (bookId) => {
        setCartItems((prevItems) =>
            prevItems.flatMap(item => {
                if (item.id === bookId) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return []; // Si baja a 0, eliminar el ítem
                    }
                }
                return item;
            })
        );
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity
    };
}
