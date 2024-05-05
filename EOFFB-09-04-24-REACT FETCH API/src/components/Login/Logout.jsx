import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook for navigation

function Logout({ logout }) {
  const history = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function passed as prop
    history.push('/login'); // Redirect to the login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
