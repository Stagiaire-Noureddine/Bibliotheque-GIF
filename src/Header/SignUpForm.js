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
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
        showConfirmPassword: false,
    });

    const [captchaValue, setCaptchaValue] = useState('');

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Validate the form, e.g. make sure the password and confirm password fields match
        if (values.password !== values.confirmPassword) {
            alert("Passwords don't match!");
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
        alert('Vous vous êtes inscrit avec succès !');
    };
    

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
            {/* I added ReCAPTCHA for the fun of it, I'm well aware that without a back-end, it's useless and would be a vulnerability */}
            <ReCAPTCHA sitekey="6LeJ8AQlAAAAANqwBMV3x799ask5UFJUkxxY8-lL" onChange={handleCaptchaChange} />

            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                S'incrire
            </Button>
        </Box>
    );
};

export default SignUpForm;
