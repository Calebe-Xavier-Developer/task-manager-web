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
import PrivateLayout from './layouts/PrivateLayout';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<RequireAuth><PrivateLayout /></RequireAuth>}>
          <Route path="/home" element={<Home/>} />
          <Route path="/boards" element={<BoardsPage/>} />
          <Route path="/boards/:id" element={<BoardDetailPage/>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login"/>} /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
