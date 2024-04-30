import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage'; // Adjust the path as needed
import Login from './components/Login/Login'; // Adjust the path as needed
import ErrorBoundary from './components/ErrorBoundry';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

const App = () => {
  return (
    <>
    <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/Homepage" element={<ProtectedRoute component={<Homepage />} />} />
        
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
    </>
  );
}

export default App;
