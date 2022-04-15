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
                    zIndex: 100,
                    top: 0,
                    backgroundColor: " #bdd3ec",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <div
                    style={{
                        display: "flex",
                        columnGap: "3rem",
                        height: 90,
                    }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Pokémon_Trading_Card_Game_logo.svg"></img>

                    <Button variant="text" onClick={() => navigate("/home")}>
                        <FormatListBulletedIcon />
                        Lista de Decks
                    </Button>
                </div>

                <Button variant="text" onClick={logOut} sx={{ margin: 5 }}>
                    Sair
                    <ExitToAppIcon />
                </Button>
            </Card>
        </>
    );
};

export default Header;
