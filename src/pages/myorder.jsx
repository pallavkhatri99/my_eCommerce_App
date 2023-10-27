import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import '../css/myorders.css';
import { useSelector } from 'react-redux';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(prodImg, prodName, category, date, quantity="1", status,) {
  return { prodImg, prodName, category, date, quantity, status };
}

//.sort((a, b) => (a.calories < b.calories ? -1 : 1));


export default function MyOrders() {
  let [rows,setRowDate] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const myOrders = useSelector((state)=>state.product.myOrders);
  useEffect(()=>{
    let tempRow = []
    myOrders.map(item=>tempRow.push(createData(item.image, item.name, item.category, new Date(), item.quantity, "Delivered")));
    setRowDate(tempRow);
  },[])
 
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <div className='my-order-container'>
    {rows.length>0 ?
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} >
        <TableBody>
          <TableRow hover='true' >
            <TableCell colSpan={6} sx={{fontSize:35,fontWeight: 'medium',color:'error.main',width: 160}}>
               List of my orders:- 
            </TableCell>
          </TableRow>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow hover='true' key={row.prodImg}>
              <TableCell component="th" scope="row" style={{ width: 100 }}>  
                <img src={row.prodImg} style={{maxWidth:"70px",maxHeight:"85px"}}/>
              </TableCell>
              <TableCell style={{ width: 180 }} align="left">
                {row.prodName}
              </TableCell>
              <TableCell style={{ width: 100 }} align="left">
                {row.category}
              </TableCell>
              <TableCell style={{ width: 100 }} align="left">
                {row.date.getDate() +"/"+row.date.getMonth()+"/"+row.date.getFullYear()}
              </TableCell>
              <TableCell style={{ width: 50 }} align="left">
                {row.quantity}
              </TableCell>
              <TableCell style={{ width: 100 }} align="left">
                {row.status}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>:<div style={{textAlign:"center",fontSize:"70px",color:"#ba3c3c"}}>No Products in My Orders</div>}
    </div>
    </>
  );
}