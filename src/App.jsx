import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Error,
  Login,
  Register,
  SingleProduct,
  Category,
  Account,
  MyOrder,
  Loader,
} from "./components/index.js";
import {
  HomePage,
  AuthPage,
  CartPage,
  OrderPage,
  AccountPage,
  ProductPage,
} from "./pages/pages.js";
import { GuestProtected, UserProtected } from "./utils/ProtectedRoute";
import GetData from "./data/Getdata.jsx";
const ProductList = lazy(() =>
  import("./components/productsList/ProductList.jsx")
);
// css
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<ProductList />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="*" element={<Error />} />
          </Route>
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
            <Route index element={<Account />} />
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

          <Route path="/not" element={<Error />} />
        </Routes>
      </Router>
      <GetData />
    </>
  );
}

export default App;
