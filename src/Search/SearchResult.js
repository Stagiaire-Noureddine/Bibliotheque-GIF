import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import './Search.scss';


const SearchResult = ({ results, open, onClose, fetchMoreData, hasMoreData }) => {

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
                    {/* ResponsiveMasonry component for responsive grid layout */}
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 2, 700: 3, 1200: 4 }}
                        gutter="16px"
                    >
                        {/* Masonry component for fixed-width columns with consistent vertical spacing */}
                        <Masonry gutter="16px">
                            {results.map((result) => (
                                // Render each GIF in a div
                                <div key={result.id} >
                                    <img className="gif"
                                        // Set the src attribute to the fixed height URL from Giphy API result
                                        src={result.images.fixed_height.url}
                                        alt={result.title}
                                    />
                                </div>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>


                </InfiniteScroll>
            </Box>
        </Modal>
    );
};

export default SearchResult;
