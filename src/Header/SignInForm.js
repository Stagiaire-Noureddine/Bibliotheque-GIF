import { useState, useEffect } from 'react';
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


const SignInForm = ({ onLogin }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        rememberMe: false,
        showPassword: false,
    });

    useEffect(() => {
        // Load the rememberMe value from localStorage when the component mounts
        const rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
        if (rememberMe !== null) {
            setValues((prevState) => ({ ...prevState, rememberMe }));

            const rememberedUser = JSON.parse(localStorage.getItem('rememberedUser'));
            if (rememberedUser) {
                setValues((prevState) => ({
                    ...prevState,
                    email: rememberedUser.email,
                    password: rememberedUser.password,
                }));
            }
        }

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Retrieve the list of registered users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        // Find the user with the matching email and password
        const user = users.find(
            (u) => u.email === values.email && u.password === values.password
        );

        if (user) {
            // If the user is found, store the user information in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Save the rememberMe preference for the user
            localStorage.setItem('rememberMe', JSON.stringify(values.rememberMe));

            if (values.rememberMe) {
                // Store the user's email and password if rememberMe is checked
                localStorage.setItem('rememberedUser', JSON.stringify(user));
                onLogin(user);
            } else {
                // Remove the rememberedUser from localStorage if rememberMe is unchecked
                localStorage.removeItem('rememberedUser');
            }

            // Clear the form
            setValues({
                email: '',
                password: '',
                rememberMe: false,
                showPassword: false,
            });

            // Redirect to another page or show a success message
            alert('Vous vous êtes connecté avec succès !');
        } else {
            // If the user is not found, show an error message
            alert('Nom d\'utilisateur ou mot de passe incorrect !');
        }
    };


    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
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
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Connexion
            </Typography>
            <TextField
                label="Email"
                type="email"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
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
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}

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
                        onChange={(e) => setValues({ ...values, rememberMe: e.target.checked })}

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
