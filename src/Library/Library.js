import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import './Library.scss';

function Library() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Load the logged in user from localStorage when the component mounts
  useEffect(() => {
    const storedLoggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedLoggedInUser) {
      setLoggedInUser(storedLoggedInUser);
    }
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
      />
      <Search
      loggedInUser={loggedInUser}
      />
    </div>
  );
}

export default Library;
