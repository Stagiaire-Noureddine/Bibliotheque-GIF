import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchGiphy, handleInfiniteScroll } from '../utils/search/searchUtils';

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [openResults, setOpenResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    performSearch(searchQuery);
  };

  const performSearch = async (query) => {
    setOffset(0);
    setSearchResults([]);
    setHasMoreData(true);

    try {
      const newData = await searchGiphy(query, 0);
      setSearchResults((prevResults) => [...prevResults, ...newData]);
      setOffset((prevOffset) => prevOffset + 12);

      if (newData.length === 0) {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error('Error fetching data from Giphy API:', error);
    }

    setOpenResults(true);
    searchParams.set('q', query);
    navigate({ search: searchParams.toString() });
  };
  
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInfiniteScrollWrapper = () => {
    handleInfiniteScroll(searchQuery, offset, setSearchResults, setOffset, setHasMoreData);
  };

  const handleCloseResults = () => {
    setOpenResults(false);
  };

  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q !== searchQuery) {
      setSearchQuery(q);
      performSearch(q);
    } else if (!q) {
      setOpenResults(false);
    }
  }, [searchParams]);
  
  useEffect(() => {
    if (searchParams.has('q')) {
      setOpenResults(true);
    }
  }, []);
  

  return {
    searchResults,
    offset,
    hasMoreData,
    handleSearchQueryChange,
    handleSubmit,
    handleInfiniteScrollWrapper,
    openResults,
    handleCloseResults
  };
};
