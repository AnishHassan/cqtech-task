import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useState } from 'react'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import moment from 'moment'


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

export default function AddAssignBook() {


    const [students, setStudents] = useState([]);
    const [books, setBooks] = useState([]);

    const [studentAssign , setStudentAssign] = useState([]);
    const [bookAssign , setBookAssign] = useState([]);
    const [added , setAdded] = useState(false);

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [img, setImg] = useState('');

    const [borrowedBy, setBorrowedBy] = useState('');

    const [dateOfBorrow, setdateOfBorrow] = useState(new Date());

    

    const [dateOfReturn, setDateOfReturn] = useState(new Date());

    React.useEffect( () => {
        fetch('http://localhost:8000/books').then(res => {
           return res.json();
        })
        .then((data) =>{
            console.log(data);
            setBooks(data);
        });

        fetch('http://localhost:8001/students').then(res => {
           return res.json();
        }).then((data) =>{
           const students =  data.map((item)=>{
                let firstName = item.firstName;
                let lastName = item.lastName;
                const label = firstName.concat(" ", lastName);
                return label;
            })

            setStudents(students);
            console.log(students)
        });
    }, [])




    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(bookAssign)
        console.log(studentAssign)
       
        const formatdateOfBorrow = moment(dateOfBorrow).format('L');
        const formatdateOfReturn = moment(dateOfReturn).format('L');

        console.log(formatdateOfBorrow);
        console.log(formatdateOfReturn);

        setdateOfBorrow(formatdateOfBorrow);
        setDateOfReturn(formatdateOfReturn);


        const assignedBookData = {
            name : bookAssign.label,
            author : bookAssign.author,
            borrowedBy : studentAssign,
            dateOfBorrow : dateOfBorrow,
            dateOfReturn : dateOfReturn
        }

        fetch('http://localhost:8002/assigned_books',{
          method : 'POST',
          headers: {'Content-Type' : "application/json"},
          body : JSON.stringify(assignedBookData),
         }).then(()=>{
            console.log('assigned book to student ');
         })

        setAdded(true);
        
        console.log(added);
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
                                    <Autocomplete
                                        disablePortal
                                        id="books-list"
                                        options={books}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Books" />}
                                        onChange={(event, value) => setBookAssign(value)} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9}>
                                <Autocomplete
                                        disablePortal
                                        id="students-list"
                                        options={students}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="students" />}
                                        onChange={(event, value) => setStudentAssign(value)} 
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="dateOfBorrow"
                                            inputFormat="MM/dd/yyyy"
                                            value={dateOfBorrow}
                                            onChange={(value) => setdateOfBorrow(value)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DesktopDatePicker
                                            label="dateOfReturn"
                                            inputFormat="MM/dd/yyyy"
                                            value={dateOfReturn}
                                            onChange={(value) => setDateOfReturn(value)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>

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