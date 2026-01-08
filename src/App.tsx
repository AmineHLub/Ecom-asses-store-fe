import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import ProductListDashboard from './components/ProductListDashboard';
import LoadingLogo from './assets/LoadingLogo';
import NotFoundPage from './components/NotFoundPage';
import ProductPage from './components/ProductPage';

function App() {


    return (
      <BrowserRouter>
    <div className="App">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <LoadingLogo className="w-16 h-16 mb-4" />
          <p className='mt-5'>Loading products...</p>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<ProductListDashboard />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
    </BrowserRouter>
  );
}

export default App;