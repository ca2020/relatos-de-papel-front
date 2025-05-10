
import { useState, useEffect } from 'react';

const CART_KEY = 'relatos_de_papel_cart';

export function useCart() {
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

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
                    return item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : [];
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
