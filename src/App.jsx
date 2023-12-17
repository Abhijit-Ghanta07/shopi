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
  Order,
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
            <Route path="*" element={<Error />} />
            <Route path="category/:id" element={<Category />} />
          </Route>
          <Route
            path="/order"
            element={
              <UserRoute>
                <Order />
              </UserRoute>
            }
          />

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
    </>
  );
}

export default App;
