import './index.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth';
import ProductDetail from './pages/ProductDetail/ProductDetail'
import ProductList from './pages/ProductList/ProductList';
import Admin from './pages/Admin/Admin';
import BlogDetail from './pages/Home/BlogDetail/BlogDetail';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './actions/auth';
import { ADMIN, USER } from './constants/role';
import Login from './pages/Admin/Login/Login';
import Order from './pages/Order/Order';

function App() {

  const role = localStorage.getItem('role');
  const user = useSelector(state => state.auth.authData);
  const dispatch = useDispatch();
  console.log(role);
  console.log(user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  const UserRoutes = () => {
    if (role !== USER) {
      return (
        <BrowserRouter>
          <Navbar user={user}/>
          <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/admin" exact element={<Admin user={user}/>} />
              <Route path="/admin/login" exact element={<Login />} />
              <Route path="/product/:id" exact element={<ProductDetail />} />
              <Route path="/blog/:id" exact element={<BlogDetail user={user}/>} />
              <Route path="/product/" exact element={<ProductList />} />
              <Route path="/admin/login" exact element={<Login />} />
              <Route path="*" exact element={<Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>
      )
    } else {
      return (
        <BrowserRouter>
          <Navbar user={user}/>
          <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/auth" exact element={<Auth />} />
              <Route path="/product/:id" exact element={<ProductDetail />} />
              <Route path="/blog/:id" exact element={<BlogDetail user={user}/>} />
              <Route path="/product" exact element={<ProductList />} />
              <Route path="/order" exact element={<Order />} />
              <Route path="/admin/login" exact element={<Login />} />
              <Route path="*" exact element={<Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>
      )
    }
  }
    
  return (
   <UserRoutes />
  );
}

export default App;
