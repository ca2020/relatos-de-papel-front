import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

function Checkout() {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();

    const [form, setForm] = useState({
        name: "",
        address: "",
        email: "",
        paymentMethod: "Tarjeta",
        cardNumber: "",
        expiry: "",
        cvc: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 5;
    const total = subtotal + shipping;

    const handleSubmit = (e) => {
        e.preventDefault();
        const orderData = {
            books: cartItems,
            user: form,
            subtotal,
            shipping,
            total,
        };
        clearCart();
        navigate("/order-confirmation", { state: orderData });
    };

    return (
        <div className="bg-gray-50 min-h-screen flex justify-center items-center px-4 py-8">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-md w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 p-8"
            >
                {/* FORMULARIO */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-indigo-600">Finalizar compra</h2>

                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Nombre completo" className="w-full border px-4 py-2 rounded" />
                    <input type="text" name="address" value={form.address} onChange={handleChange} required placeholder="Dirección de envío" className="w-full border px-4 py-2 rounded" />
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Correo electrónico" className="w-full border px-4 py-2 rounded" />

                    <div>
                        <p className="font-semibold text-gray-700 mb-2">Selecciona método de pago</p>
                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="paymentMethod" value="Tarjeta" checked={form.paymentMethod === "Tarjeta"} onChange={handleChange} />
                                Tarjeta de Crédito
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="Número de tarjeta" className="border px-2 py-1 rounded" />
                                <input type="text" name="expiry" value={form.expiry} onChange={handleChange} placeholder="Vencimiento" className="border px-2 py-1 rounded" />
                                <input type="text" name="cvc" value={form.cvc} onChange={handleChange} placeholder="CVC" className="border px-2 py-1 rounded" />
                            </div>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="paymentMethod" value="PayPal" checked={form.paymentMethod === "PayPal"} onChange={handleChange} />
                                PayPal
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                        Confirmar y pagar
                    </button>
                </div>

                {/* RESUMEN */}
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Libros añadidos</h3>
                    <ul className="space-y-2 mb-4">
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex justify-between">
                                <span>{item.title} x {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <hr className="my-2" />
                    <p className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></p>
                    <p className="flex justify-between"><span>Envío</span><span>${shipping.toFixed(2)}</span></p>
                    <p className="flex justify-between font-bold text-lg mt-4"><span>Total</span><span>${total.toFixed(2)}</span></p>
                </div>
            </form>
        </div>
    );
}

export default Checkout;
