import { useState } from 'react';

export const useTabsState = (initialSelectedTab = 0) => {
  const [selectedTab, setSelectedTab] = useState(initialSelectedTab);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return [selectedTab, handleChangeTab];
};