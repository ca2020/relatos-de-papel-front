import { useLocation, useNavigate } from "react-router-dom";

function OrderConfirmation() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="text-center p-10">
                <h2 className="text-2xl font-bold text-red-600">❌ No hay datos del pedido.</h2>
                <button onClick={() => navigate("/home")} className="text-indigo-600 underline mt-4 block">
                    Volver al inicio
                </button>
            </div>
        );
    }

    const { books, user, subtotal, shipping, total } = state;
    const orderId = Math.floor(Math.random() * 1000000 + 100000);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">¡Gracias por tu compra, {user.name}!</h1>
            <p className="text-gray-700 mb-2 text-center">Tu pedido ha sido recibido con éxito.</p>
            <p className="text-gray-700 mb-4 text-center">
                Número de pedido: <span className="font-semibold">#{orderId}</span>
            </p>
            <p className="text-gray-600 mb-6 text-center">
                Enviaremos una confirmación a <strong>{user.email}</strong>.
            </p>

            <div className="bg-white rounded-lg shadow p-6 w-full max-w-md mb-6">
                {books.map((item, index) => (
                    <div key={index} className="border-b pb-4 mb-4">
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                        <p className="text-sm text-gray-800 font-medium">
                            Total: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
                <div className="text-sm text-gray-600 mb-2">Subtotal: ${subtotal.toFixed(2)}</div>
                <div className="text-sm text-gray-600 mb-2">Envío: ${shipping.toFixed(2)}</div>
                <div className="text-right font-bold text-lg">Total: ${total.toFixed(2)}</div>
            </div>

            <button
                onClick={() => navigate("/home")}
                className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-6 rounded"
            >
                Volver al inicio
            </button>
        </div>
    );
}

export default OrderConfirmation;
