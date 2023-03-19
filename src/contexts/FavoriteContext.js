import { createContext, useContext, useState } from 'react';
import { useSearch } from '../hooks/useSearch';

const FavoriteContext = createContext();

export const useFavorite = () => {
  return useContext(FavoriteContext);
};

export const FavoriteProvider = ({ children, loggedInUser }) => {
  const search = useSearch();
  const [favorites, setFavorites] = useState(new Map());

  const value = {
    ...search,
    favorites,
    setFavorites,
    loggedInUser,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};
