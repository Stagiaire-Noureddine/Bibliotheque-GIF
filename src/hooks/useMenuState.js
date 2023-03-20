import { useState } from 'react';

export const useMenuState = (initialAnchorEl = null) => {
  const [anchorEl, setAnchorEl] = useState(initialAnchorEl);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return [anchorEl, openMenu, closeMenu];
};
