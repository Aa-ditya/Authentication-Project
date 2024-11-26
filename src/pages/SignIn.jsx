import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const theme = createTheme({
    palette: {
        red: {
            main: '#ED3A57',
            light: '#ED3A5740'
        }
    }
})
const SignIn = () => {
    const firebase = useFirebase()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    }

    useEffect(() => {
        if (firebase.isLoggedIn) navigate('/')
        console.log(firebase.isLoggedIn)
    }, [firebase, navigate])

    const handleClick = async (e) => {
        e.preventDefault();
        // console.log("signing in");
        const result = await firebase.signInUser(email, password);
        // console.log("signin successful");
    }
    return (
        <ThemeProvider theme={theme}>

            <Stack sx={{

                padding: 10,
                alignItems: {
                    xs: 'start',
                    md: 'center',
                    lg: 'center'
                }
            }}>
                <Stack sx={{
                    m: 2
                }}>
                    <Typography variant="h3" color="#FCFCFFDD">Sign In</Typography>
                </Stack>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {
                            m: 2,
                            width: '43ch',
                        },
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 10,
                            color: "#FCFCFF",
                        },
                        '& .MuiInputLabel-root': {
                            color: '#FCFCFFAA'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ED3A57', // Border color
                        },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ED3A5780', // Border color on hover
                        },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ED3A57', // Border color when focused
                        },
                    }}
                    noValidate
                    autoComplete="off"
                    className=" flex flex-col "
                >
                    <TextField id=" outlined-basic " label="Email" variant="outlined" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <TextField id="outlined-basic" type={showPassword ? 'text' : 'password'} label="Password" variant="outlined" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span onClick={toggleShowPassword} >  {showPassword ? <FaEyeSlash /> : <FaEye />}</span>

                </Box>
                <Stack sx={{
                    m: 2,
                    width: '43ch',
                }}>
                    <Button variant="contained" color="error" onClick={handleClick} >Log in</Button>
                </Stack>

                <Stack sx={{
                    m: 2,

                }}>
                    <Typography variant="subtitle" color="#FCFCFF" >Or Sign in with
                        <Button sx={{ ml: 3 }} variant="contained" color="error" onClick={firebase.signinWithGoogle}>Google</Button>
                    </Typography>
                </Stack>
                <Stack sx={{
                    m: 1
                }}>
                    <Typography variant="caption" color="error"> Don't have an account? <Link to="/signup">Sign up</Link></Typography>

                </Stack>
            </Stack>

        </ThemeProvider>
    )
}

export default SignIn;