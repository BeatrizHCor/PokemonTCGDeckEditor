import { Box, Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { TUserInput } from "../../generated";
import { useUserRegister } from "../../graphql/hooks/User";

// Formulário Padrão de Registro

const INITIAL_STATE = {
    username: "",
    password: "",
    email: "",
};
interface IProps {
    setSuccessMessage: (message: string) => void;
    setErrorMessage: (message: string) => void;
    toggleLoginActive: () => void;
}

const Register = (props: IProps) => {
    const [state, setState] = useState<TUserInput>(INITIAL_STATE);

    const saveUser = useUserRegister();

    const inputChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        inputType: keyof TUserInput
    ) => {
        setState({ ...state, [inputType]: e.target.value });
    };

    const registerHandler = () => {
        saveUser(state)
            .then(() => {
                props.setSuccessMessage("Usuário registrado com Sucesso");
                props.toggleLoginActive();
            })
            .catch(() => {
                props.setErrorMessage("Email já cadastrado");
            });
    };

    return (
        <>
            <Container className="base-container">
                <h1 className="header">Registro de Usuário</h1>
                <div className="content">
                    <div className="image"></div>
                    <Box sx={{ widht: 100, height: 300, borderRadius: 8 }} className="form">
                        <div className="form-group">
                            <TextField
                                sx={{ margin: 1 }}
                                variant="outlined"
                                type="text"
                                name="username"
                                label="Nome de Usuário"
                                value={state.username}
                                onChange={(event) => inputChangeHandler(event, "username")}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                sx={{ margin: 1 }}
                                label="Email"
                                variant="outlined"
                                type="email"
                                name="email"
                                value={state.email}
                                onChange={(event) => inputChangeHandler(event, "email")}
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                sx={{ margin: 1 }}
                                variant="outlined"
                                type="password"
                                name="password"
                                label="Senha"
                                value={state.password}
                                onChange={(event) => inputChangeHandler(event, "password")}
                            />
                        </div>
                    </Box>
                </div>
                <div className="footer">
                    <Button
                        sx={{
                            margin: 5,
                            position: "absolute",
                            top: "32.4%",
                            left: "45%",
                            borderRadius: "50%",
                            width: 100,
                            height: 100,
                            backgroundColor: "#ffff",
                            color: "#000000",
                            borderColor: "#000000",
                            border: 8,
                        }}
                        variant="contained"
                        onClick={registerHandler}>
                        Registrar
                    </Button>
                </div>
            </Container>
        </>
    );
};

export default Register;
