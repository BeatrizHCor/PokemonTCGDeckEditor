import { Button, Container, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { TUserLoginInput } from "../../generated";
import { useUserLogin } from "../../graphql/hooks/User";

const INITIAL_STATE = {
    password: "",
    email: "",
};
const Login = () => {
    const [state, setState] = useState<TUserLoginInput>(INITIAL_STATE);
    const { setToken } = useContext(AuthContext);
    const login = useUserLogin();
    const navigate = useNavigate();
    const inputChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        inputType: keyof TUserLoginInput
    ) => {
        setState({ ...state, [inputType]: e.target.value });
    };

    const registerHandler = () => {
        login(state)
            .then((result) => {
                setToken(result.data.loginUser);
                navigate("/Home");
            })
            .catch(() => {
                alert("User not Found or Password not Match");
            });
    };

    return (
        <Container className="base-container">
            <h1>Login</h1>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <TextField
                            sx={{ margin: 1 }}
                            type="email"
                            name="email"
                            label="Email"
                            value={state.email}
                            onChange={(event) => inputChangeHandler(event, "email")}
                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            sx={{ margin: 1 }}
                            type="password"
                            name="password"
                            label="Password"
                            value={state.password}
                            onChange={(event) => inputChangeHandler(event, "password")}
                        />
                    </div>
                </div>
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
                    Login
                </Button>
            </div>
        </Container>
    );
};

export default Login;
