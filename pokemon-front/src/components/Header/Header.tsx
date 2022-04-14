import { Button, Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

// Cabeçalho das páginas para navegação e Saída do Usuário para a aplicação, removendo o JWT

const Header = () => {
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <>
            <Card
                sx={{
                    position: "fixed",
                    top: 0,
                    height: 90,
                    backgroundColor: " #bdd3ec",
                    width: "100%",
                    display: "flex",
                }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Pokémon_Trading_Card_Game_logo.svg"></img>

                <Button
                    variant="contained"
                    sx={{ left: 30, backgroundColor: "#92a7be" }}
                    onClick={() => navigate("/home")}>
                    <FormatListBulletedIcon />
                    Lista de Decks
                </Button>
                <Button
                    sx={{ left: 50, backgroundColor: "#92a7be", position: "relative" }}
                    onClick={logOut}>
                    Sair
                    <ExitToAppIcon />
                </Button>
            </Card>
            ;
        </>
    );
};

export default Header;
