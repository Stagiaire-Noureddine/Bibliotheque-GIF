import { useState } from 'react';

import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const Search = () => {
  // Set initial state for search query and search results
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Handle search query input changes
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Search Giphy API and update search results
  const searchGiphy = async (query) => {
    const API_KEY = 'LV727P1jkkTgTG4upLr10e3Jwy6zJUCq';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=25&offset=0&rating=g&lang=en`;

    try {
      const response = await axios.get(url);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error fetching data from Giphy API:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    searchGiphy(searchQuery);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={1} alignItems="center">
    <Grid item xs={10} sm={11}>
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
    <Grid item xs={2} sm={1}>
      <Button type="submit" variant="contained">
        Search
      </Button>
    </Grid>
  </Grid>

      {/* Display search results in the Seach component for now until I create the corresponding component*/}
      <Box sx={{ marginTop: 4 }}>
        {searchResults.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            style={{ margin: 8 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Search;
