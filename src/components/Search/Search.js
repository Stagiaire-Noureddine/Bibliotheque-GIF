import { useFavorite } from '../../contexts/FavoriteContext';

import SearchResult from './SearchResult';
import SearchFavorite from './SearchFavorite';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import './Search.scss';

const Search = () => {
    const {
        handleSearchQueryChange,
        handleSubmit,
    } = useFavorite();

    return (
        // Form for searching GIFs
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={1} alignItems="center" className="search-container">
                <Grid item xs={10} sm={10}>
                    <TextField
                        label="Recherche un GIF"
                        type="text"
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
            <SearchResult />
            <SearchFavorite />
        </Box>
    );
};

export default Search;
