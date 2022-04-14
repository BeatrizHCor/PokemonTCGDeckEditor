import React from "react";
import Register from "../../components/LoginPage/Register";
import Login from "../../components/LoginPage/Login";
import useToggle from "../../hooks/useToggle";
import { Box, Button, Card } from "@mui/material";

// Página de Login Customizada em Pokebola ultilizada no Início da Aplicação

const LoginForm = () => {
    const [isLoginActive, toggleLoginActive] = useToggle(true);

    return (
        <>
            <Box sx={{ Top: 10 }}>
                <Card
                    sx={{
                        marginTop: 1,
                        boxShadow: 4,
                        border: 4,
                        borderColor: " #000000",
                        borderTopLeftRadius: 500,
                        borderTopRightRadius: 500,
                        height: 400,
                        width: 800,
                        backgroundColor: "#be5757",
                    }}>
                    {isLoginActive ? <Login /> : <Register />}
                </Card>
                <Card
                    sx={{
                        boxShadow: 4,
                        border: 4,
                        borderColor: " #000000",
                        borderBottomLeftRadius: 500,
                        borderBottomRightRadius: 500,
                        height: 400,
                        width: 800,
                    }}>
                    <Button
                        sx={{ color: "#000000", margin: 15 }}
                        onClick={() => toggleLoginActive()}>
                        {isLoginActive ? (
                            <p>Precisa Criar uma nova Conta?</p>
                        ) : (
                            <p>Ja tem uma Conta?</p>
                        )}
                    </Button>
                </Card>
            </Box>
        </>
    );
};

export default LoginForm;
