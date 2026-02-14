import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import AdminLogin from '../pages/admin/Login'
import MenuPage from '../pages/customer/MenuPage'
import CartPage from '../pages/customer/CartPage'
import OrderSuccess from '../pages/customer/OrderSuccess'
import Dashboard from '../pages/admin/Dashboard'
import MenuManager from '../pages/admin/MenuManager'
import OrdersPage from '../pages/admin/OrdersPage'
import ProtectedRoute from './ProtectedRoute'
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-success" element={<OrderSuccess />} /> 
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/admin/menu" element={<ProtectedRoute><MenuManager/></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute><OrdersPage/></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  )
}
export default AppRoutes
