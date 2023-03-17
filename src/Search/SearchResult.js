import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import './Search.scss';


const SearchResult = ({ results, open, onClose, fetchMoreData, hasMoreData, favorites, setFavorites, loggedInUser }) => {
    // Handle favoriting/unfavoriting a GIF by adding/removing its ID to/from the favorites Set
    const handleFavorite = (result) => {
        if (!loggedInUser) {
            alert("Tu dois être connecté pour ajouter des GIFs à tes favoris.");
            return;
        }
        setFavorites((prevFavorites) => {
            const newFavorites = new Map(prevFavorites);

            if (newFavorites.has(result.id)) {
                newFavorites.delete(result.id);
            } else {
                newFavorites.set(result.id, { userId: loggedInUser.id, ...result });
            }

            // Store the updated favorites for the current user in localStorage
            localStorage.setItem(`favorites-${loggedInUser.id}`, JSON.stringify(Array.from(newFavorites.entries())));
            return newFavorites;
        });
    };

    return (
        // Modal to display search results
        <Modal open={open} onClose={onClose}>
            {/* Scrollable container for search results */}
            <Box id="scrollableDiv" >
                {/* InfiniteScroll component to load more data when scrolling reaches the end */}
                <InfiniteScroll
                    dataLength={results.length}
                    next={fetchMoreData}
                    hasMore={hasMoreData}
                    loader={
                        // Loader to display when fetching more data
                        <Box className="loaderBox" >
                            <CircularProgress />
                        </Box>
                    }
                    scrollableTarget="scrollableDiv"
                >
                    {/* Masonry component for fixed-width columns with consistent vertical spacing */}
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 700: 3, 1200: 4 }}
                        gutter="16px"
                    >
                        {/* Masonry component for fixed-width columns with consistent vertical spacing */}
                        <Masonry gutter="16px">
                            {results.map((result) => {
                                // Check if the current GIF is favorited
                                const isFavorited = favorites.has(result.id);
                                return (
                                    <div key={result.id} className="gifContainer">
                                        <img className="gif" src={result.images.fixed_height.url} alt={result.title} />
                                        {/* Overlay for favoriting/unfavoriting a GIF */}
                                        <div className="gifOverlay" onClick={() => handleFavorite(result)}>
                                            {/* Display the appropriate favorite icon based on the favorited state */}
                                            {isFavorited ? (
                                                <FavoriteOutlined style={{ color: 'red' }} />
                                            ) : (
                                                <FavoriteBorderOutlined style={{ color: 'red' }} />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </Masonry>
                    </ResponsiveMasonry>
                </InfiniteScroll>
            </Box>
        </Modal>
    );
};

export default SearchResult;
