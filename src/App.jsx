import { Suspense, lazy } from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Login,
  Register,
  SingleProduct,
  MyOrder,
  Loading,
  Home,
  ToastModal,
} from "./components/index.js";

// lazy components
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));
const OrderPage = lazy(() => import("./pages/OrderPage.jsx"));
const AccountPage = lazy(() => import("./pages/AccountPage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const CategoryPage = lazy(() => import("./pages/CategoryPage.jsx"));
import { GuestProtected, UserProtected } from "./utils/ProtectedRoute";
import { Profile, ResetPass } from "./components/account/accountIndex.js";
import GetData from "./data/Getdata.jsx";
// css
import "./sass/main.scss";
import "./App.css";

const SuspenseLayout = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ScrollRestoration />
      <Outlet />
    </Suspense>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SuspenseLayout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<HomePage />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/product" element={<ProductPage />}>
        <Route path=":id" element={<SingleProduct />} />
      </Route>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<CartPage />} />
      <Route
        path="/account"
        element={
          <GuestProtected>
            <AccountPage />
          </GuestProtected>
        }
      >
        <Route index element={<Profile />} />
        <Route path="order" element={<MyOrder />} />
        <Route path="change" element={<ResetPass />} />
      </Route>
      <Route
        path="/order"
        element={
          <GuestProtected>
            <OrderPage />
          </GuestProtected>
        }
      >
        <Route index element={<MyOrder />} />
      </Route>

      <Route
        path="/auth"
        element={
          <UserProtected>
            <AuthPage />
          </UserProtected>
        }
      >
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/not_found" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
      <ToastModal />
      <GetData />
    </>
  );
}

export default App;
