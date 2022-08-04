
import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import AddAssignBook from './AddAssignBook';
import DisplayAssign from './DisplayAssign';


function GetAssignBook() {
    const cards = [{id:1, assigned: true , name:'Chronicles of Amazon',author:'Alexa' , borrowedBy:'Anish Hassan' , dateOdBorrow:'01-07-2022' , dateOfReturn:'11-07-2022'} , {id:1, assigned: false , name:'Life of me',author:'Ash'}];
    const [books , setBooks] = useState([]);


    useEffect( () => {
        fetch('http://localhost:8002/assigned_books').then(res => {
           return res.json();
        })
        .then((data) =>{
            setBooks(data);
        })
    }, [])

  return (
    <React.Fragment>

        <AddAssignBook/>

         <Typography variant="h4" component="h5" mt={2}>
           Assigned Books List
         </Typography>
         
         {/* <Typography variant="h4" component="h5" mt={2}>
           Assigned Books
         </Typography> */}

        {books && <DisplayAssign data={books} />} 

         {/* <Typography variant="h4" component="h5" mt={2}>
            Available Books
         </Typography> */}

         {/* <BooksList data={cards.filter((card)=> card.assigned==false)} /> */}


    </React.Fragment>
  )
}

export default GetAssignBook