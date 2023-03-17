import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import ReCAPTCHA from 'react-google-recaptcha';


const SignUpForm = () => {
    // State to hold form values and UI interactions.
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
    });

    // State to hold the value of the ReCAPTCHA response (currently not functional with no back-end).
    const [captchaValue, setCaptchaValue] = useState('');

    // Function to handle changes in the ReCAPTCHA response (currently not functional with no back-end).
    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    // Function to handle form submission, validate form fields, and save user data in localStorage.
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the form, e.g. make sure the password and confirm password fields match
        if (values.password !== values.confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        // Create a user object
        const user = {
            id: Date.now(),
            name: values.name,
            email: values.email,
            password: values.password,
        };

        // Save the user object to localStorage
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Clear the form
        setValues({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: false,
            showConfirmPassword: false,
        });

        // Show a success message
        alert('Tu t\'es inscrit avec succès !');
    };

    // Function to toggle the visibility of both the password and confirm password fields.
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
            showConfirmPassword: !values.showConfirmPassword,
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
                Inscription
            </Typography>
            <TextField
                label="Name"
                type="text"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                    shrink: true,
                }}
            />
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
            <TextField
                label="Confirm Password"
                type={values.showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
                onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {/* I added ReCAPTCHA for the fun of it, I'm well aware that without a back-end, it's unusable */}
            <ReCAPTCHA sitekey="6LeJ8AQlAAAAANqwBMV3x799ask5UFJUkxxY8-lL" onChange={handleCaptchaChange} />

            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                S'incrire
            </Button>
        </Box>
    );
};

export default SignUpForm;
