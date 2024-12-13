import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './scss/index.scss'

import App from './App'
import { AccessoryProvider } from './contexts/AccessoryContext'
import { BrandProvider } from './contexts/BrandContext'
import { CartProvider } from './contexts/CartContext'
import { CategoryProvider } from './contexts/CategoryContext'
import { OrderProvider } from './contexts/OrderContext'
import { ProductProvider } from './contexts/ProductContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <CategoryProvider>
          <BrandProvider>
            <ProductProvider>
              <AccessoryProvider>
                <CartProvider>
                  <OrderProvider>
                    <App />
                  </OrderProvider>
                </CartProvider>
              </AccessoryProvider>
            </ProductProvider>
          </BrandProvider>
        </CategoryProvider>
    </BrowserRouter>
  </StrictMode>,
)
