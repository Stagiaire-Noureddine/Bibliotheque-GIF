import { useState, useEffect } from 'react';

import axios from 'axios';

import SearchResult from './SearchResult';
import SearchFavorite from './SearchFavorite';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import './Search.scss';


const Search = ({ loggedInUser }) => {
    // Set initial state for search query and search results
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openResults, setOpenResults] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMoreData, setHasMoreData] = useState(true);

    // State to store favorite GIFs using Set to avoid duplicates
    const [favorites, setFavorites] = useState(new Map());

    // Handle search query input changes
    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // This useEffect runs when the loggedInUser changes (i.e., on component mount and when a user logs in/out)
    useEffect(() => {
        // If there's a loggedInUser, try to get their favorites from localStorage
        const storedFavorites = loggedInUser && localStorage.getItem(`favorites-${loggedInUser.id}`);

        if (storedFavorites) {
            // Parse the JSON string stored in localStorage to get an array of favorites
            const parsedFavorites = JSON.parse(storedFavorites);
            // Create a new Map from the parsedFavorites array, using the same [id, gifData] structure
            const favoritesMap = new Map(parsedFavorites.map(([id, gifData]) => [id, gifData]));
            setFavorites(favoritesMap);
        } else {
            // If there are no storedFavorites, initialize the favorites state with an empty Map
            setFavorites(new Map());
        }
    }, [loggedInUser]); // The useEffect depends on the loggedInUser prop, so it's included in the dependency array

    // Search Giphy API and update search results
    const searchGiphy = async (query, newOffset) => {
        // API key and URL
        const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
        const API_BASE_URL = process.env.REACT_APP_GIPHY_API_BASE_URL;
        const url = `${API_BASE_URL}/search?api_key=${API_KEY}&q=${query}&limit=12&offset=${newOffset}&rating=g&lang=fr`;

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
                <Grid container spacing={1} alignItems="center" className="search-container">
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
                            placeholder="Rechercher des GIFs... (Appuyez sur Entrée)"
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
                favorites={favorites}
                setFavorites={setFavorites}
                loggedInUser={loggedInUser}
            />
            <SearchFavorite
                favorites={favorites}
                loggedInUser={loggedInUser}
            />
        </Box>
    );
};


export default Search;
