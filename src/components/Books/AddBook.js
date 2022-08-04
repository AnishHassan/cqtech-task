import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useState , useEffect } from 'react'
import TextField from '@mui/material/TextField';




function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function AddBook() {

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [img, setImg] = useState('');
    
    const [book , setBook] = useState('');




    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(name)
        console.log(author)
       
        const bookData = {
            label : name,
            author : author,
            
        }

        setBook(bookData);

     
        fetch('http://localhost:8000/books',{
            method : 'POST',
            headers: {'Content-Type' : "application/json"},
            body : JSON.stringify(book),
           }).then(()=>{
              console.log('book added ');
           });

           handleClose();

           window.location.reload(false);

    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

   

    useEffect(()=>{
         
    } , [handleClose]);

   
   

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Fab onClick={handleClickOpen} color="secondary" aria-label="add"  >
                    <AddIcon />
                </Fab>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Add Book
                    </DialogTitle>
                    <DialogContent>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="name"
                                        autoFocus
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="author"
                                        label="author"
                                        name="author"
                                        autoComplete="book-author"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload Book Image                                <input
                                            id="image"
                                            label="image"
                                            name="image"
                                            required
                                            fullWidth
                                            type="file"
                                            hidden
                                            value={img}
                                            onChange={(e) => setImg(e.target.value)}
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit"

                            variant="contained"
                            sx={{ mt: 3, mb: 2 }} onClick={handleSubmit} >Add Book</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>

    );
}