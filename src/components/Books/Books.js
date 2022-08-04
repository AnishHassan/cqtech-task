
import React, { useEffect, useState } from 'react'
import AddBook from './AddBook';
import BooksList from './BooksList';
import { Typography } from '@mui/material'


function Books() {
    const cards = [{id:1, assigned: true , name:'Chronicles of Amazon',author:'Alexa' , borrowedBy:'Anish Hassan' , dateOdBorrow:'01-07-2022' , dateOfReturn:'11-07-2022'} , {id:1, assigned: false , name:'Life of me',author:'Ash'}];
    const [books , setBooks] = useState([]);


    useEffect( () => {
        fetch('http://localhost:8000/books').then(res => {
           return res.json();
        })
        .then((data) =>{
            setBooks(data);
        })
    }, [])

  return (
    <React.Fragment>

        <AddBook/>

         <Typography variant="h4" component="h5" mt={2}>
            Books List
         </Typography>
         
         {/* <Typography variant="h4" component="h5" mt={2}>
           Assigned Books
         </Typography> */}

        {books && <BooksList data={books} />} 

         {/* <Typography variant="h4" component="h5" mt={2}>
            Available Books
         </Typography> */}

         {/* <BooksList data={cards.filter((card)=> card.assigned==false)} /> */}


    </React.Fragment>
  )
}

export default Books