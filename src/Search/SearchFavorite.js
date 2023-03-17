import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import './Search.scss';

const SearchFavorite = ({ favorites, loggedInUser }) => {
    // Convert the map entries to an array of objects with id and url properties for easier rendering
    const favoritedGifs = Array.from(favorites.entries()).map(([id, gifData]) => ({ id, url: gifData.images.fixed_height.url }));

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
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 700: 3, 1200: 4 }} gutter="16px">
                {/* Masonry component for fixed-width columns with consistent vertical spacing */}
                <Masonry gutter="16px">
                    {favoritedGifs.map(gif => (
                        <div key={gif.id}>
                            <img className="gif" src={gif.url} alt={gif.id} />
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
};

export default SearchFavorite;