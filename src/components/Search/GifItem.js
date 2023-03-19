import { FavoriteBorderOutlined, FavoriteOutlined } from '@mui/icons-material';

const GifItem = ({ result, isFavorited, handleFavorite }) => {
  return (
    <div key={result.id} className="gifContainer">
      <img className="gif" src={result.images.fixed_height.url} alt={result.title} />
      <div className="gifOverlay">
        {isFavorited ? (
          <FavoriteOutlined
            style={{ color: 'red' }}
            onClick={() => handleFavorite(result)} 
          />
        ) : (
          <FavoriteBorderOutlined
            style={{ color: 'red' }}
            onClick={() => handleFavorite(result)}
          />
        )}
      </div>
    </div>
  );
};

export default GifItem;
