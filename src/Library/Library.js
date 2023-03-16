import { useState } from 'react';

import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Search Giphy
      </Typography>
      <TextField
        label="Search Query"
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
        Search
      </Button>

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
