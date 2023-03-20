// External libraries
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Custom hooks
import { useFormState } from '../../hooks/useFormState';
import { useUser } from '../../contexts/UserContext';

import ReCAPTCHA from 'react-google-recaptcha';


const SignUpForm = ({ onSignupSuccess }) => {
    const { handleSignup } = useUser();
    const [values, handleChange, handlePasswordVisibility] = useFormState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        name: '',
        showPassword: false,
        showConfirmPassword: false,
    });

    // State to hold the value of the ReCAPTCHA response (currently not functional with no back-end).
    // const [captchaValue, setCaptchaValue] = useState('');

    // Function to handle changes in the ReCAPTCHA response (currently not functional with no back-end).
    // const handleCaptchaChange = (value) => {
    //     setCaptchaValue(value);
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignup(values, onSignupSuccess);
    };

    // Function to toggle the visibility of both the password and confirm password fields.
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
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Inscription
            </Typography>
            <TextField
                label="Name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
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
            <TextField
                label="Confirm Password"
                type={values.showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {/* I added ReCAPTCHA for the fun of it, I'm well aware that without a back-end, it's unusable */}
            {/* <ReCAPTCHA sitekey="6LeJ8AQlAAAAANqwBMV3x799ask5UFJUkxxY8-lL" onChange={handleCaptchaChange} /> */}

            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                S'incrire
            </Button>
        </Box>
    );
};

export default SignUpForm;
