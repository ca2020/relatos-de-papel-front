import { useEffect, useState } from "react";

const STORAGE_KEY = "relatos_cart";

export function useCart() {
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    // Actualizar el localStorage cada vez que cambia el carrito
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (book) => {
        setCartItems((prev) => {
            const exists = prev.find((item) => item.id === book.id);
            if (exists) {
                return prev.map((item) =>
                    item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...book, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const increaseQuantity = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id) => {
        setCartItems((prev) =>
            prev.flatMap((item) =>
                item.id === id
                    ? item.quantity > 1
                        ? [{ ...item, quantity: item.quantity - 1 }]
                        : []
                    : [item]
            )
        );
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
    };
}
