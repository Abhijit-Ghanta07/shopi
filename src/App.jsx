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
  ProductList,
  SingleProduct,
  Category,
  Account,
  MyOrder,
} from "./components/index.js";
import {
  HomePage,
  AuthPage,
  CartPage,
  OrderPage,
  AccountPage,
} from "./pages/pages.js";
import { GuestProtected, UserProtected } from "./utils/ProtectedRoute";
import GetData from "./data/Getdata.jsx";
// css
import "./App.css";
import { useEffect } from "react";
function App() {
  // const { pathname } = useLocation();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [pathname]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<ProductList />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<CartPage />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="*" element={<Error />} />
          </Route>
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
