import { useEffect } from 'react';

import { useFavorite } from '../../contexts/FavoriteContext';
import { useUser } from '../../contexts/UserContext';

import { getStoredFavorites, saveFavoritesToStorage } from '../../utils/search/favoriteUtils';

import GifMasonry from './GifMasonry';
import GifItem from './GifItem';

import './Search.scss';

const SearchFavorite = () => {
    const { favorites, setFavorites } = useFavorite();
    const { loggedInUser } = useUser();

    useEffect(() => {
        setFavorites(getStoredFavorites(loggedInUser));
    }, [loggedInUser]);

    // Convert the map entries to an array of objects with id and url properties for easier rendering
    const favoritedGifs = Array.from(favorites.entries()).map(([id, gifData]) => ({
        ...gifData,
        id,
      }));      

    const handleFavorite = (gif) => {
        setFavorites((prevFavorites) => {
            const newFavorites = new Map(prevFavorites);
            newFavorites.delete(gif.id);
            saveFavoritesToStorage(loggedInUser, newFavorites);
            return newFavorites;
        });
    };

    if (!loggedInUser) {
        return (
            <div className="searchFavorite">
                <h3>GIFs favoris :</h3>
                <p>Connecte-toi pour voir tes GIFs favoris.</p>
            </div>
        );
    }

    return (
        <div className="searchFavorite">
            <h3>GIFs favoris :</h3>
            {/* ResponsiveMasonry component for responsive grid layout */}
            <GifMasonry>
                    {favoritedGifs.map((gif) => (
                        <GifItem
                            key={gif.id}
                            result={gif}
                            isFavorited={true}
                            handleFavorite={handleFavorite}
                        />
                    ))}
            </GifMasonry>
        </div>
    );
};

export default SearchFavorite;
