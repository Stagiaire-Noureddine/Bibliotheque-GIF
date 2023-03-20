import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const useUser = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return userContext;
};

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);


  const createUser = async (user) => {
    try {
      const response = await axios.post('http://localhost:4000/users', user);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const handleSignup = async (values, onSignupSuccess) => {
    if (values.password !== values.confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    const user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    const createdUser = await createUser(user);

    if (createdUser) {
      alert("Tu t'es inscrit avec succès !");
      onSignupSuccess();
    } else {
      alert("Erreur lors de l'inscription !");
    }
  };

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const userCookie = Cookies.get('loggedInUser');
      if (userCookie) {
        const user = JSON.parse(userCookie);
        setLoggedInUser(user);
      }
      setLoading(false);
    };

    fetchLoggedInUser();
  }, []);


  const handleUserLogin = (user, rememberMe) => {
    try {
      console.log("Remember me:", rememberMe);
      const expiresIn = rememberMe ? 30 : null; // 30 days if rememberMe is true
      console.log("Remember me bis:", rememberMe);
      Cookies.set('loggedInUser', JSON.stringify(user), { expires: expiresIn });
      setLoggedInUser(user);
      setIsSignedIn(true);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      // await axios.post('http://localhost:4000/logout');
      // console.log('POST request to /logout sent');
      Cookies.remove('loggedInUser');
      setLoggedInUser(null);
      console.log('User logged out successfully');
    } catch (error) {
      console.error(error);
    }
  };  

  const resetSignedIn = () => {
    setIsSignedIn(false);
  };

  return (
    <UserContext.Provider value={{ loggedInUser, handleUserLogin, handleLogout, loading, handleSignup, isSignedIn, resetSignedIn }}>
      {children}
    </UserContext.Provider>
  );
};
