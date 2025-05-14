import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './routes/home';
import RequireAuth from './components/RequireAuth';
import BoardsPage from './pages/BoardsPage';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<RequireAuth><Home/></RequireAuth>} />
        <Route path="/boards" element={<RequireAuth><BoardsPage/></RequireAuth>} />
        <Route path="*" element={<Navigate to="/home"/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
