import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';


export default function StudentList() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const columns = [
        { id: 'firstName', label: 'Firstname', minWidth: 170, format: (value) => value.toLocaleString('en-US'), },
        { id: 'lastName', label: 'Lastname', minWidth: 100, format: (value) => value.toLocaleString('en-US'), },
    ];
    
    const [rows,setRow] = React.useState([]);

    React.useEffect( () => {
        fetch('http://localhost:8001/students').then(res => {
           return res.json();
        })
        .then((data) =>{
        console.log(data);
          setRow(data);
        })
    }, [])
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper  sx={{ width: '50%', overflow: 'hidden' ,marginTop:"80px" , marginLeft:'350px' }}>
            <TableContainer  sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {console.log(row)}
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}

                                                </TableCell>

                                            );
                                        })}
                                        <Button size="small">View</Button>
                    <Button size="small">Update</Button>

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}