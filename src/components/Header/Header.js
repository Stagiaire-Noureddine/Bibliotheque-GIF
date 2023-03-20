import { useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LinearProgress from '@mui/material/LinearProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

import { useUser } from '../../contexts/UserContext';
import { useModalState } from '../../hooks/useModalState';
import { useTabsState } from '../../hooks/useTabsState';
import { useMenuState } from '../../hooks/useMenuState';

const Header = () => {
  const { loggedInUser, handleUserLogin, handleLogout, loading, isSignedIn, resetSignedIn  } = useUser();
  const [openModal, handleOpenModal, handleCloseModal] = useModalState(false);
  const [selectedTab, handleChangeTab] = useTabsState(0);
  const [menuAnchorEl, handleMenuOpen, handleMenuClose] = useMenuState(null);

  const handleUserSignup = () => {
    handleChangeTab(null, 0);
  };

  useEffect(() => {
    if (isSignedIn) {
      handleCloseModal();
      resetSignedIn();
    }
  }, [isSignedIn, resetSignedIn, handleCloseModal]);

  return (
    <header>
      {loading ? (
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
                onClick={loggedInUser ? handleMenuOpen : handleOpenModal}
              >
                {loggedInUser ? <MenuIcon /> : 'Connexion'}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Typography
            variant="p"
            component="h2"
            sx={{ textAlign: 'center', margin: 3 }}
          >
            Le site pour trouver et sauvegarder tes GIFs préférés !
          </Typography>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
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
              }}
            >
              <Tabs value={selectedTab} onChange={handleChangeTab}>
                <Tab label="Connexion" />
                <Tab label="Inscription" />
              </Tabs>
              {selectedTab === 0 && (
                <SignInForm
                  onLogin={handleUserLogin}
                />
              )}
              {selectedTab === 1 && (
                <SignUpForm
                  onClose={handleCloseModal}
                  onSignupSuccess={handleUserSignup}
                />
              )}
            </Box>
          </Modal>
          {loggedInUser && (
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
            </Menu>
          )}
        </>
      )}
    </header>
  );
};

export default Header;