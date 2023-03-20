import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useFavorite } from '../../contexts/FavoriteContext';
import { useUser } from '../../contexts/UserContext';
import { saveFavoritesToStorage } from '../../utils/search/favoriteUtils';

import GifMasonry from './GifMasonry';
import GifItem from './GifItem';

import './Search.scss';


const SearchResult = () => {
    const {
        favorites,
        setFavorites,
        searchResults,
        hasMoreData,
        handleInfiniteScrollWrapper,
        handleCloseResults,
        openResults,
    } = useFavorite();

    const { loggedInUser } = useUser();
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

            saveFavoritesToStorage(loggedInUser, newFavorites);
            return newFavorites;
        });
    };


    return (
        // Modal to display search results
        <Modal open={openResults} onClose={handleCloseResults}>
            {/* Scrollable container for search results */}
            <Box id="scrollableDiv" >
                {/* InfiniteScroll component to load more data when scrolling reaches the end */}
                <InfiniteScroll
                    dataLength={searchResults.length}
                    next={handleInfiniteScrollWrapper}
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
                    <GifMasonry>
                        {searchResults.map((result) => {
                            const isFavorited = favorites.has(result.id);
                            return (
                                <GifItem
                                    key={result.id}
                                    result={result}
                                    isFavorited={isFavorited}
                                    handleFavorite={handleFavorite}
                                />
                            );
                        })}
                    </GifMasonry>
                </InfiniteScroll>
            </Box>
        </Modal>
    );
};

export default SearchResult;
