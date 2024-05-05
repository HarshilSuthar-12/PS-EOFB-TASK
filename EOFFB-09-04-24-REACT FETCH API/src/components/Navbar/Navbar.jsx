// import React, { useEffect, useState } from 'react';
// import myLogo from '../Images/3E-logo_tm_full-color_rgb_1.png'; // Import the logo image
// import '../css/Globals.css';
// import Logout from '../Login/Logout';

// function Navbar({loginButton, isAuthenticated}) {
//   const [theme, setTheme] = useState('light');

//   // Function to toggle dark mode
//   const toggleDarkMode = () => {
//     const root = document.documentElement;
//     const currentMode = root.getAttribute('data-theme');

//     if (currentMode === 'dark') {
//       root.setAttribute('data-theme', 'light');
//       localStorage.setItem('theme', 'light'); // Store preference in localStorage
//       setTheme('light');
//     } else {
//       root.setAttribute('data-theme', 'dark');
//       localStorage.setItem('theme', 'dark'); // Store preference in localStorage
//       setTheme('dark');
//     }
//   };

//   useEffect(() => {
//     // Function to set the theme based on user's preference stored in localStorage
//     const setThemeFromStorage = () => {
//       const savedTheme = localStorage.getItem('theme');
//       const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

//       if (savedTheme) {
//         document.documentElement.setAttribute('data-theme', savedTheme);
//         setTheme(savedTheme);
//       } else if (prefersDarkMode) {
//         document.documentElement.setAttribute('data-theme', 'dark');
//         setTheme('dark');
//       }
//     };

//     // Call setThemeFromStorage when the page loads
//     setThemeFromStorage();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const name = localStorage.getItem("name");
//   const email = localStorage.getItem("username");


//   return (
//     <nav className="navbar">
//       {/* Use the imported logo image */}
//       <img src={myLogo} alt="My Logo" />
//       <div className="nav-items">
//         <h1 className="navbar-title">Employee OFF-Boarding</h1>
//       </div>
//       <div className="nav_username">
//         {/* <h3>{name}</h3> */}
        
//         {loginButton && !isAuthenticated ? loginButton : <h3><i class="fa-solid fa-user"></i>{email} </h3>}

//       {/* <Logout /> */}
//       </div>
//       {/* Assuming this toggle is for dark mode */}
//       {/* <i id="toggle-dark-mode" className="fa-solid fa-circle-half-stroke" onClick={toggleDarkMode}></i> */}
//     </nav>
//   );
// }

// export default Navbar;








import React, { useEffect, useState } from 'react';
import myLogo from '../Images/3E-logo_tm_full-color_rgb_1.png'; // Import the logo image
import '../css/Globals.css';
import Logout from '../Login/Logout';

function Navbar({loginButton, isAuthenticated, logout}) { // Pass logout function as prop
  const [theme, setTheme] = useState('light');

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const root = document.documentElement;
    const currentMode = root.getAttribute('data-theme');

    if (currentMode === 'dark') {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light'); // Store preference in localStorage
      setTheme('light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark'); // Store preference in localStorage
      setTheme('dark');
    }
  };

  useEffect(() => {
    // Function to set the theme based on user's preference stored in localStorage
    const setThemeFromStorage = () => {
      const savedTheme = localStorage.getItem('theme');
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        setTheme(savedTheme);
      } else if (prefersDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        setTheme('dark');
      }
    };

    // Call setThemeFromStorage when the page loads
    setThemeFromStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("username");


  return (
    <nav className="navbar">
      {/* Use the imported logo image */}
      <img src={myLogo} alt="My Logo" />
      <div className="nav-items">
        <h1 className="navbar-title">Employee OFF-Boarding</h1>
      </div>
      <div className="nav_username">
        {/* <h3>{name}</h3> */}
        
        {loginButton && !isAuthenticated ? loginButton : (
          <>
            <h3><i className="fa-solid fa-user"></i>{email} </h3>
            {/* Render Logout component and pass the logout function as a prop */}
            {/* <Logout logout={logout} /> */}
          </>
        )}

      </div>
      {/* Assuming this toggle is for dark mode */}
      {/* <i id="toggle-dark-mode" className="fa-solid fa-circle-half-stroke" onClick={toggleDarkMode}></i> */}
    </nav>
  );
}

export default Navbar;
