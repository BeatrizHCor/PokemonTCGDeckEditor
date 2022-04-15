import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
} from "@mui/material";
import { TCommentDto } from "../../generated";
import { DeleteForever } from "@mui/icons-material";
import { useDeleteComment, useSaveComment } from "../../graphql/hooks/Comment";

interface IProps {
    isOpen: boolean;
    comments: TCommentDto[];
    toggleOpen: () => void;
    id: number;
}
const CommentDialog = (props: IProps) => {
    const [input, setInput] = useState("");
    const saveComment = useSaveComment();
    const deleteComment = useDeleteComment();

    const saveHandler = () => {
        saveComment({
            content: input,
            deckId: props.id,
        });
        setInput("");
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    return (
        <Dialog open={props.isOpen} maxWidth="md" fullWidth>
            <DialogTitle>Comentários</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <List>
                        {props.comments.map((comment) => (
                            <ListItem key={comment.id}>
                                <ListItemText>{comment.content}</ListItemText>
                                <ListItemIcon
                                    onClick={() => deleteComment(comment.id)}
                                    sx={{ cursor: "pointer" }}>
                                    <DeleteForever />
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </DialogContentText>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={input}
                    onChange={inputChangeHandler}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.toggleOpen}>Voltar</Button>
                <Button onClick={saveHandler}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CommentDialog;
