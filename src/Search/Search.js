import { useState } from 'react';

import axios from 'axios';

import SearchResult from './SearchResult';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import './Search.scss';


const Search = () => {
    // Set initial state for search query and search results
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openResults, setOpenResults] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);


    // Handle search query input changes
    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Search Giphy API and update search results
    const searchGiphy = async (query, newOffset) => {
        // API key and URL
        const API_KEY = 'LV727P1jkkTgTG4upLr10e3Jwy6zJUCq';
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12&offset=${newOffset}&rating=g&lang=fr`;

        // Fetch data from Giphy API
        try {
            const response = await axios.get(url);
            const newData = response.data.data;

            // Update search results and offset state
            setSearchResults((prevResults) => [...prevResults, ...newData]);
            setOffset((prevOffset) => prevOffset + 10);

            // Check if more data is available
            if (newData.length === 0) {
                setHasMoreData(false);
            }
        } catch (error) {
            console.error('Error fetching data from Giphy API:', error);
        }
    };

    // Open/Close search result modal
    const handleOpenResults = () => {
        setOpenResults(true);
    };
    const handleCloseResults = () => {
        setOpenResults(false);
    };


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset state values
        setOffset(0);
        setSearchResults([]);
        setHasMoreData(true);

        // Perform search and open result modal
        searchGiphy(searchQuery, 0);
        handleOpenResults();
    };

    return (
        // Form for searching GIFs
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={10} sm={10}>
                    <TextField
                        label="Recherche un GIF"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={2} sm={2}>
                    <Button type="submit" variant="contained">
                        Chercher
                    </Button>
                </Grid>
            </Grid>
            {/* Display search results in a modal */}
            <SearchResult
                results={searchResults}
                open={openResults}
                onClose={() => handleCloseResults()}
                fetchMoreData={() => setTimeout(() => searchGiphy(searchQuery, offset), 1500)}
                hasMoreData={hasMoreData}
            />
        </Box>
    );
};

export default Search;
