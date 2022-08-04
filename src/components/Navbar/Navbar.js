import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import { Tab, Tabs, Toolbar, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  
    const [value,setValue] = useState();


  return (
    <React.Fragment>
        <AppBar sx={{background : "#063970"}}  position='static'>
            <Toolbar>
            <Typography>
               CQTECH   
            </Typography>
            <MenuBookIcon/>

            <Tabs sx={{marginLeft: "30px"}} textColor="#fff" value={value} onChange={(e,value)=> setValue(value)} indicatorColor="#fff">
             <Link style={{ textDecoration: 'none' ,textColor:"#fff" }}  to="/books" >
             <Tab  label="Books" />
             </Link>
             <Link to="students">
             <Tab label="Students" />
             </Link>

             <Link to="assignbook">
             <Tab label="Assign Books" />
             </Link>
            </Tabs>
            </Toolbar>
            
            
        </AppBar>
    </React.Fragment>
  )
}

export default Navbar