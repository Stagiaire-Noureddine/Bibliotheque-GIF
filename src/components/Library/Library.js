import Header from '../Header/Header';
import Search from '../Search/Search';

import { ThemeProvider } from '@mui/material/styles';
import darkTheme from '../../utils/theme/muiTheme';

// import auth from '../../utils/auth';
import { FavoriteProvider } from '../../contexts/FavoriteContext';
import { UserProvider } from '../../contexts/UserContext';


function Library() {

  return (
    <ThemeProvider theme={darkTheme}>
      <UserProvider>
        <div className="Library">
          <Header />
          <FavoriteProvider>
            <Search />
          </FavoriteProvider>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default Library;
