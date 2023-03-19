export const getStoredFavorites = (loggedInUser) => {
    if (!loggedInUser) return new Map();
    const storedFavorites = localStorage.getItem(`favorites-${loggedInUser.id}`);
    if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        return new Map(parsedFavorites.map(([id, gifData]) => [id, gifData]));
    }
    return new Map();
};

export const saveFavoritesToStorage = (loggedInUser, favorites) => {
    if (loggedInUser) {
        localStorage.setItem(`favorites-${loggedInUser.id}`, JSON.stringify(Array.from(favorites.entries())));
    }
};
