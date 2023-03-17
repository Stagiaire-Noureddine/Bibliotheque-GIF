import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/LinearProgress';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';


const Header = ({ loggedInUser, onUserLogin, onLogout, loading }) => {
  // State variables
  const [openModal, setOpenModal] = useState(false); // Controls modal open/close state
  const [selectedTab, setSelectedTab] = useState(0); // Controls selected tab in the modal
  const [menuAnchorEl, setMenuAnchorEl] = useState(null); // Stores the anchor element for the menu

  // Modal open/close handlers
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Tab change handler
  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Change tab to singin after successful signup
  const handleUserSignup = () => {
    setSelectedTab(0);
  };

  // handler login/logout call the onUserLogin/onLogout props
  const handleUserLogin = async (user) => {
    onUserLogin(user);
    await new Promise((resolve) => setTimeout(resolve, 0));
    setOpenModal(false);
  };  
  const handleLogout = () => {
    onLogout();
    handleMenuClose();
  }

  // Menu open/close handlers
  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget); // Sets the current target as the anchor element for the menu so we can position it correctly 
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <header>
     {loading ? ( // Render the loading indicator when loading
        <LinearProgress />
      ) : (
      <> 
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pick my GIFs
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={loggedInUser ? handleMenuOpen : handleOpenModal} // Show menu when logged in, show modal when logged out
          >
            {loggedInUser ? <MenuIcon /> : 'Connexion'} {/* Show menu icon when logged in, show "Connexion" text when logged out */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Typography variant="p" component="h2" sx={{ textAlign: 'center', margin: 3 }}>
        Le site pour trouver et sauvegarder tes GIFs préférés !
      </Typography>
      {/* Modal for the sign-in and sign-up forms */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}>
          {/* Tabs for switching between sign-in and sign-up forms */}
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Connexion" />
            <Tab label="Inscription" />
          </Tabs>
          {selectedTab === 0 && <SignInForm onLogin={handleUserLogin} />} {/* Render SignInForm when selectedTab is 0 (Connexion) and pass the handleUserLogin function as a prop */}
          {selectedTab === 1 && <SignUpForm onSignupSuccess={handleUserSignup} />} {/* Render SignUpForm when selectedTab is 1 (Inscription) and pass the handleUserSignup function as a prop */}
        </Box>
      </Modal>
      {/* Menu for the user to log out */}
      <Menu
        anchorEl={menuAnchorEl} // The anchor element for the menu
        open={Boolean(menuAnchorEl)} // Open the menu when menuAnchorEl is not null
        onClose={handleMenuClose} // Close the menu when clicking outside the menu
        onClick={handleMenuClose} // Close the menu when clicking a menu item
      >
        <MenuItem onClick={handleLogout}>Déconnexion</MenuItem> {/* Menu item to log out */}
      </Menu>
      </>
      )}
    </header>
  );
};

export default Header;
