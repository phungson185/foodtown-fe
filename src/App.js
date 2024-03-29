import './index.css';
import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home';
import Profile from './pages/Profile';
import Auth from './pages/Auth/Auth';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ProductList from './pages/ProductList/ProductList';
import Admin from './pages/Admin/Admin';
import Cart from './pages/Cart';
import BlogDetail from './pages/Home/BlogDetail/BlogDetail';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './actions/auth';
import { ADMIN, USER } from './constants/role';
import Login from './pages/Admin/Login/Login';
import Order from './pages/Order/Order';

function App() {
  const role = localStorage.getItem('role') ?? USER;
  const user = useSelector((state) => state.auth.authData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const UserRoutes = () => {
    if (role === ADMIN) {
      return (
        <BrowserRouter>
          <Navbar user={user} />
          <Routes>
            <Route path="/admin" exact element={<Admin user={user} />} />
            <Route path="/admin/login" exact element={<Login />} />
            <Route path="/product/:id" exact element={<ProductDetail />} />
            <Route path="/blog/:id" exact element={<BlogDetail user={user} />} />
            <Route path="/product/" exact element={<ProductList />} />
            <Route path="/admin/login" exact element={<Login />} />
            <Route path="*" exact element={<Navigate replace to="/admin" />} />
          </Routes>
        </BrowserRouter>
      );
    } else {
      return (
        <BrowserRouter>
          <Navbar user={user} cart={cart} setCart={setCart} />
          <Routes>
            <Route path="/" exact element={<Home setCart={setCart} />} />
            <Route path="/profile" exact element={<Profile />} />
            <Route path="/auth" exact element={<Auth />} />
            <Route path="/product/:id" exact element={<ProductDetail />} />
            <Route path="/blog/:id" exact element={<BlogDetail user={user} />} />
            <Route path="/product" exact element={<ProductList />} />
            <Route path="/order" exact element={<Order />} />
            <Route path="/admin/login" exact element={<Login />} />
            <Route path="/cart" exact element={<Cart cart={cart} setCart={setCart} user={user} />} />
            <Route path="*" exact element={<Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>
      );
    }
  };

  return <UserRoutes />;
}

export default App;
