
import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import AddAssignBook from './AddAssignBook';
import DisplayAssign from './DisplayAssign';


function GetAssignBook() {
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