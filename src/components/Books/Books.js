
import React, { useEffect, useState } from 'react'
import AddBook from './AddBook';
import BooksList from './BooksList';
import { Typography } from '@mui/material'


function Books() {
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