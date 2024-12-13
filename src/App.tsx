import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LayoutAdmin from './layouts/LayoutAdmin';
import LayoutClient from './layouts/LayoutClient';
import Accessories from './pages/admin/Accessory/Accessories';
import AccessoriesForm from './pages/admin/Accessory/AccessoriesForm';
import Banners from './pages/admin/Banner/Banner';
import BannerForm from './pages/admin/Banner/BannerForm';
import Brands from './pages/admin/Brands/Brands';
import BrandsForm from './pages/admin/Brands/BrandsForm';
import Categories from './pages/admin/Categories/Categories';
import CategoryForm from './pages/admin/Categories/CategoriesForm';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import OrderForm from './pages/admin/Orders/OrderForm';
import Orders from './pages/admin/Orders/Orders';
import ProductForm from './pages/admin/Products/ProductForm';
import Products from './pages/admin/Products/Products';
import Cart from './pages/client/Cart/Cart';
import Home_Page from './pages/client/HomePage/HomePage';
import Checkout from './pages/client/Order/Checkout';
import ThankYouPage from './pages/client/Order/Thankyou';
import AccessoryDetail from './pages/client/Products/Accessory/AccessoryDetail';
import ListProducts from './pages/client/Products/ListProducts';
import ProductDetail from './pages/client/Products/ProductDetail';
import SearchPage from './pages/client/Products/SearchPage';
import Return from './pages/client/subItem/Return';
import SpDelivery from './pages/client/subItem/SpDelivery';
import SpPay from './pages/client/subItem/SpPay';
import SpPurchase from './pages/client/subItem/SpPurchase';
import TermsOfService from './pages/client/subItem/TermsOfService';
import Transport from './pages/client/subItem/Transport';
import './scss/App.scss';
import './scss/PaginationAntd.scss';
import ListAccessories from './pages/client/Products/Accessory/ListAccessories';
import LoginToAdmin from './pages/client/Auth/LoginToAdmin';

function App() {
  {/* <===== Sử dụng cho layout admin =====>*/ }
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes >
        <Route path='/admin' element={<LayoutAdmin />} >
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/products' element={<Products />} />
          <Route path='/admin/products-add' element={<ProductForm />} />
          <Route path='/admin/products-edit/:id' element={<ProductForm />} />
          <Route path='/admin/categories' element={<Categories />} />
          <Route path='/admin/categories-add' element={<CategoryForm />} />
          <Route path='/admin/categories-edit/:id' element={<CategoryForm />} />
          <Route path='/admin/banner' element={<Banners />} />
          <Route path='/admin/banner-add' element={<BannerForm />} />
          <Route path='/admin/banner-edit/:id' element={<BannerForm />} />
          <Route path='/admin/brands' element={<Brands />} />
          <Route path='/admin/brands-add' element={<BrandsForm />} />
          <Route path='/admin/brands-edit/:id' element={<BrandsForm />} />
          <Route path='/admin/orders' element={<Orders />} />
          <Route path='/admin/orders-edit/:id' element={<OrderForm />} />
          <Route path='/admin/accessories' element={<Accessories />} />
          <Route path='/admin/accessories-edit/:id' element={<AccessoriesForm />} />
          <Route path='/admin/accessories-add' element={<AccessoriesForm />} />
        </Route>

        <Route path='/' element={<LayoutClient />} >
          <Route index element={<Home_Page />} />
          <Route path='/xe-dap-the-thao' element={<ListProducts />} />
          <Route path='/phu-kien-xe-dap' element={<ListAccessories />} />
          <Route path='/xe-dap-the-thao/:slug' element={<ProductDetail />} />
          <Route path='/phu-kien-xe-dap/:slug' element={<AccessoryDetail />} />
          <Route path='/gio-hang' element={<Cart />} />
          <Route path='/thanh-toan/:id' element={<Checkout />} />
          <Route path="/thanh-toan/:id/cam-on" element={<ThankYouPage />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/huong-dan-thanh-toan" element={<SpPay />} />
          <Route path="/huong-dan-mua-hang" element={<SpPurchase />} />
          <Route path="/huong-dan-giao-nhan" element={<SpDelivery />} />
          <Route path="/chinh-sach-van-chuyen" element={<Transport />} />
          <Route path="/chinh-sach-doi-tra" element={<Return />} />
          <Route path="/dieu-khoan-dich-vu" element={<TermsOfService />} />

          <Route path="/VNG-BOSSBOSS2368/login-to-admin/by=LeDinhAnh" element={<LoginToAdmin />} />


        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
