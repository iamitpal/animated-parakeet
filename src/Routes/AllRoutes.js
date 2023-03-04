import { Route, Routes } from "react-router-dom";

import Homepage from "../Pages/Home/Home";
import { ProductInfo } from "../Components/productInfo";
import Payment from "../Components/SahilComponents/payment/index";
import Form from "../Components/LogInPages/Form";
import { Cart } from "../Components/Cart/Cart";

import Navbar from "../Components/SahilComponents/Navbar/Navbar";
import Footer from "../Components/SahilComponents/Footer/Footer";

import OrderMedicinesPage from "../Pages/OrderMedicines/OrderMedicinesPage";
import PrivateRoute from "./PrivateRoute";

export const AllRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/login" element={<Form />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />

        <Route path="/ordermedicine" element={<OrderMedicinesPage />} />
      </Routes>
      <Footer />
    </div>
  );
};
