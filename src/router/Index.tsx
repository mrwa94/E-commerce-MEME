import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Cart from '../pages/Cart'
import AdminRouter from './AdminRouter'
import Products from '../pages/Products'
import Services from '../pages/Services'
import Favorite from '../pages/Favorite'
import ContactUs from '../pages/ContactUs'
import ErrorPage from '../pages/ErrorPage'
import ProtectedRouter from './ProtectedRouter'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Login from '../components/register/Login'
import ProductsDetails from '../pages/ProductsDetails'
import Register from '../components/register/Register'
import ListUsers from '../components/adminDashboard/ListUsers'
import RestPassword from '../components/register/RestPassword'
import ActiveAccount from '../components/register/ActiveAccount'
import ForgetPassword from '../components/register/ForgetPassword'
import NewProducts from '../components/adminDashboard/NewProducts'
import { LogoutUser } from '../components/userDashboard/LogoutUser'
import ListOrder from '../components/adminDashboard/ListOrder'
import UserProfile from '../components/userDashboard/UserProfile'
import UserOrders from '../components/userDashboard/UserOrders'
import AdminProfile from '../components/adminDashboard/ProfileAdmin'
import { AdminLogout } from '../components/adminDashboard/AdminLogout'
import ListCatergories from '../components/adminDashboard/ListCatergories'

const Index = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/Products" element={<Products />}></Route>
        <Route path="/Product/:slug" element={<ProductsDetails />}></Route>
        <Route path="/services" element={<Services />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/users/activate/:token" element={<ActiveAccount />}></Route>
        <Route path="/*" element={<ErrorPage />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route path="//users/reset-password/:token" element={<RestPassword />}></Route>

        {/* //user should login to show those pages by protected router */}
        {/* Admin Profile */}
        <Route path="/profile" element={<AdminRouter />}>
          <Route path="admin" element={<AdminProfile />}></Route>
          <Route path="adminProfile" element={<AdminProfile />}></Route>
          <Route path="AdminLogout" element={<AdminLogout />}></Route>
          <Route path="NewProducts" element={<NewProducts />}></Route>
          <Route path="ListCatergories" element={<ListCatergories />}></Route>
          <Route path="ListOrder" element={<ListOrder />}></Route>
          <Route path="ListUsers" element={<ListUsers />}></Route>
        </Route>
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

        {/* user profile */}
        <Route path="/profile" element={<ProtectedRouter />}>
          <Route path="visitor" element={<UserProfile />}></Route>
          <Route path="userprofile" element={<UserProfile />}></Route>
          <Route path="userOrders" element={<UserOrders />}></Route>
          <Route path="userLogout" element={<LogoutUser />}></Route>
        </Route>
      </Routes>
      <Footer />
    </Router>
  )
}

export default Index
