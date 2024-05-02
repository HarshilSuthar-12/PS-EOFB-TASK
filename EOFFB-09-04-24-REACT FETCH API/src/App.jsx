import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/Homepage'; // Adjust the path as needed
import Login from './components/Login/Login'; // Adjust the path as needed
import ErrorBoundary from './components/ErrorBoundry';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CombinedSection from './components/combineSection/CombineSceiotn';

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
