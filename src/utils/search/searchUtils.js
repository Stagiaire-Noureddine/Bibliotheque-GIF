import axios from 'axios';

export const searchGiphy = async (query, newOffset) => {
  const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;
  const API_BASE_URL = process.env.REACT_APP_GIPHY_API_BASE_URL;
  const url = `${API_BASE_URL}/search?api_key=${API_KEY}&q=${query}&limit=12&offset=${newOffset}&rating=g&lang=fr`;

  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data from Giphy API:', error);
  }
};

export const handleInfiniteScroll = async (searchQuery, offset, setSearchResults, setOffset, setHasMoreData) => {
  try {
    // Wrap the searchGiphy call and state updates inside setTimeout
    setTimeout(async () => {
      const newData = await searchGiphy(searchQuery, offset);
      setSearchResults((prevResults) => [...prevResults, ...newData]);
      setOffset((prevOffset) => prevOffset + 12);

      if (newData.length === 0) {
        setHasMoreData(false);
      }
    }, 1500); // Add a 1500ms delay
  } catch (error) {
    console.error('Error fetching data from Giphy API:', error);
  }
};

