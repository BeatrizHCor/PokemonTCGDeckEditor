import React from "react";
import Register from "../../components/LoginPage/Register";
import Login from "../../components/LoginPage/Login";
import useToggle from "../../hooks/useToggle";
import { Box, Button, Card } from "@mui/material";

const LoginForm = () => {
    const [isLoginActive, toggleLoginActive] = useToggle(true);

    return (
        <>
            <Box sx={{ Top: 10 }}>
                <Card
                    sx={{
                        marginTop: 20,
                        boxShadow: 4,
                        border: 2,
                        borderColor: " #000000",
                        color: "#FB1B1B",
                    }}>
                    {isLoginActive ? <Login /> : <Register />}
                </Card>
                <Button sx={{ color: "#000000" }} onClick={() => toggleLoginActive()}>
                    {isLoginActive ? (
                        <p>Need to Create a User?</p>
                    ) : (
                        <p>Already have an account?</p>
                    )}
                </Button>
            </Box>
        </>
    );
};

export default LoginForm;
