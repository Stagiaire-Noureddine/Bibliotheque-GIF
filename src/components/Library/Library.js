import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import Search from '../Search/Search';

// import auth from '../../utils/auth';
import { FavoriteProvider } from '../../contexts/FavoriteContext';

import './Library.scss';

function Library() {
  const [loggedInUser, setLoggedInUser] = useState(null); // Stores the logged in user
  const [loading, setLoading] = useState(true); // Controls loading of the user status from localStorage

  // Load the logged in user from localStorage when the component mounts
  useEffect(() => {
    const storedLoggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedLoggedInUser) {
      setLoggedInUser(storedLoggedInUser);
    }
      // After fetching the data, set loading to false
    setLoading(false);
  }, []);

  const handleUserLogin = (user) => {
    setLoggedInUser(user);
  };
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return (
    <div className="Library">
      <Header
        loggedInUser={loggedInUser}
        onUserLogin={handleUserLogin}
        onLogout={handleLogout}
        loading={loading}
      />
      <FavoriteProvider loggedInUser={loggedInUser}>
      <Search
      loggedInUser={loggedInUser}
      />
      </FavoriteProvider>
    </div>
  );
}

export default Library;
