import React from 'react';
import { createBrowserHistory } from 'history';



const Logout = () => {
//   const history = useHistory();
const history = createBrowserHistory();

  const handleLogout = () => {
    history.push('/');
  };

  return (
    <div className='aside'>
    <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
