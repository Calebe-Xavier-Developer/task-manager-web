import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './routes/home';
import RequireAuth from './components/RequireAuth';
import BoardsPage from './pages/BoardsPage';
import BoardDetailPage from './pages/BoardDetailPage';
import Register from './pages/Register';
import './styles/global.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<RequireAuth><Home/></RequireAuth>} />
        <Route path="/boards" element={<RequireAuth><BoardsPage/></RequireAuth>} />
        <Route path="/boards/:id" element={<RequireAuth><BoardDetailPage/></RequireAuth>} />
        <Route path="*" element={<Navigate to="/home"/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
