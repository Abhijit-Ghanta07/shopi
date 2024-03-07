import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Error,
  Login,
  Register,
  SingleProduct,
  Category,
  MyOrder,
  ProductList,
  Loading,
} from "./components/index.js";

// lazy components
const HomePage = lazy(() => import("./pages/Home.jsx"));
const AuthPage = lazy(() => import("./pages/Auth.jsx"));
const CartPage = lazy(() => import("./pages/Cart.jsx"));
const OrderPage = lazy(() => import("./pages/Order.jsx"));
const AccountPage = lazy(() => import("./pages/Account.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
import { GuestProtected, UserProtected } from "./utils/ProtectedRoute";
import GetData from "./data/Getdata.jsx";
import { Profile, ResetPass } from "./components/account/accountIndex.js";
// css
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <HomePage />
            </Suspense>
          }
        >
          <Route index element={<ProductList />} />
          <Route path="category/:id" element={<Category />} />
          <Route path="/*" element={<Error />} />
        </Route>
        <Route
          path="/product"
          element={
            <Suspense fallback={<Loading />}>
              <ProductPage />
            </Suspense>
          }
        >
          <Route path=":id" element={<SingleProduct />} />
        </Route>
        <Route
          path="/cart"
          element={
            <Suspense fallback={<Loading />}>
              <CartPage />
            </Suspense>
          }
        />
        <Route path="/wishlist" element={<CartPage />} />
        <Route
          path="/account"
          element={
            <Suspense fallback={<Loading />}>
              <GuestProtected>
                <AccountPage />
              </GuestProtected>
            </Suspense>
          }
        >
          <Route index element={<Profile />} />
          <Route path="order" element={<MyOrder />} />
          <Route path="change" element={<ResetPass />} />
        </Route>
        <Route
          path="/order"
          element={
            <Suspense fallback={<Loading />}>
              <GuestProtected>
                <OrderPage />
              </GuestProtected>
            </Suspense>
          }
        >
          <Route index element={<MyOrder />} />
        </Route>

        <Route
          path="/auth"
          element={
            <Suspense fallback={<Loading />}>
              <UserProtected>
                <AuthPage />
              </UserProtected>
            </Suspense>
          }
        >
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/not" element={<Error />} />
        <Route path="/*" element={<Error />} />
      </Routes>

      <GetData />
    </>
  );
}

export default App;
