import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Home from "../pages/Home";
import BookDetails from "../pages/BookDetails";
import Checkout from "../pages/Checkout";
import OrderConfirmation from "../pages/OrderConfirmation.jsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/book/:id" element={<BookDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default AppRouter;
