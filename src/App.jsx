import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Cart,
  Auth,
  Home,
  Error,
  Login,
  Register,
  ProductList,
  Product,
  Category,
  GetData,
  OrderPage,
  Account,
  AccountPage,
  MyOrder,
} from "./components/index.js";
import { ProtectedRoute, UserRoute } from "./utils/ProtectedRoute";

// css
import "./App.css";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<ProductList />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Cart />} />
            <Route path="category/:id" element={<Category />} />
            <Route path="*" element={<Error />} />
          </Route>
          <Route
            path="/account"
            element={
              <UserRoute>
                <Account />
              </UserRoute>
            }
          >
            <Route index element={<AccountPage />} />
          </Route>
          <Route
            path="/order"
            element={
              <UserRoute>
                <OrderPage />
              </UserRoute>
            }
          >
            <Route index element={<MyOrder />} />
          </Route>

          <Route
            path="/auth"
            element={
              <ProtectedRoute>
                <Auth />
              </ProtectedRoute>
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
