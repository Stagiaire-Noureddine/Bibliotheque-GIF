import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useFormState } from '../../hooks/useFormState';
import { useUser } from '../../contexts/UserContext';
import { getUserByEmailAndPassword } from '../../utils/api/authApi';


const SignInForm = () => {
    const { handleUserLogin } = useUser();
    const [values, handleChange, handlePasswordVisibility] = useFormState({
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
    });

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const user = await getUserByEmailAndPassword(values.email, values.password);
          if (user) {
            await handleUserLogin(user, values.rememberMe);
            console.log('rememberMe', values.rememberMe);
          } else {
            setError("Nom d'utilisateur ou mot de passe incorrect !");
          }
        } catch (error) {
          console.error(error);
        }
      };

    const handleClickShowPassword = () => {
        handlePasswordVisibility(values, handleChange);
    };


    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 400,
                margin: '0 auto',
                padding: 2,
            }}
            onSubmit={handleSubmit}
        >
            {error && <Typography color="error">{error}</Typography>}
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Connexion
            </Typography>
            <TextField
                label="Email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Password"
                type={values.showPassword ? 'text' : 'password'}
                name="password"
                value={values.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                                onClick={handleClickShowPassword}
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={values.rememberMe}
                        onChange={handleChange}
                        name="rememberMe"
                    />
                }
                label="Remember me"
            />
            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                Se connecter
            </Button>
        </Box>
    );
};

export default SignInForm;
