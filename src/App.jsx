import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'

import './App.css'
import AdminLayout from './components/admin-view/layout';
import AdminDashboard from './pages/admin-view/dashboard';
import AdminOrders from './pages/admin-view/orders';
import AdminProducts from './pages/admin-view/products';
import ShoppingLayout from './components/shopping-view/layout';
import ShoppingHome from './pages/shopping-view/home';
import ShoppingListing from './pages/shopping-view/listing';
import ShoppingCheckout from './pages/shopping-view/checkout';
import ShoppingAccount from './pages/shopping-view/account';
import CheckAuth from './components/common/check-auth';
import PageNotFound from './pages/not-found';
import UnAuthPage from './pages/un-auth-page';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from "@/components/ui/skeleton"


function App() {
  
  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch]);

  if (isLoading) {
    return <Skeleton className="w-[600px] h-[600px] rounded-full" />
  }

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path='login' element={<AuthLogin />}></Route>
          <Route path='register' element={<AuthRegister />}></Route>
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard />}></Route>
          <Route path='orders' element={<AdminOrders />}></Route>
          <Route path='products' element={<AdminProducts />}></Route>
        </Route>
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<ShoppingHome />}></Route>
          <Route path='listing' element={<ShoppingListing />}></Route>
          <Route path='checkout' element={<ShoppingCheckout />}></Route>
          <Route path='account' element={<ShoppingAccount />}></Route>
        </Route>
        <Route path='**' element={<PageNotFound />}></Route>
        <Route path='/un-auth-page' element={<UnAuthPage />}></Route>
      </Routes>
    </div>    
  )
}

export default App
