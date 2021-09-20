import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import  { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#FF9800',
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  


function descendingComparator(a, b, orderBy) {
if (b[orderBy]

< a[orderBy]) { return -1; } if (b[orderBy]> a[orderBy]) {
  return 1;
  }
  return 0;
  }

  function getComparator(order, orderBy) {
  return order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
  const order = comparator(a[0], b[0]);
  if (order !== 0) return order;
  return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
  { id: 'question', numeric: false, disablePadding: false, label: 'Poll Question' },
  { id: 'expiredat', numeric: false, disablePadding: false, label: 'Expires at' },
  { id: 'answeredby', numeric: false, disablePadding: false, label: 'Participants' },
  { id: 'view', numeric: false, disablePadding: false, label: 'View' },

  ];

  function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
  onRequestSort(event, property);
  };

  return (
  <TableHead>
    <TableRow>

      {headCells.map((headCell) => (
      <StyledTableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left' } padding={headCell.disablePadding ? 'none' : 'normal' } sortDirection={orderBy===headCell.id ? order : false}>
        <TableSortLabel active={orderBy===headCell.id} direction={orderBy===headCell.id ? order : 'asc' } onClick={createSortHandler(headCell.id)}>
          {headCell.label}
          {orderBy === headCell.id ? (
          <span className={classes.visuallyHidden}>
            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
          </span>
          ) : null}
        </TableSortLabel>
      </StyledTableCell>
      ))}
    </TableRow>
  </TableHead>
  );
  }

  EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  };

  const useToolbarStyles = makeStyles((theme) => ({
  root: {
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1),
  },
  highlight:
  theme.palette.type === 'light'
  ? {
  color: theme.palette.secondary.main,
  backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  }
  : {
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.dark,
  },
  title: {
  flex: '1 1 100%',
  },
  }));



  const useStyles = makeStyles((theme) => ({
  root: {
  width: '100%',
  },
  paper: {
  width: '100%',
  marginBottom: theme.spacing(2),
  },
  table: {
  minWidth: 750,
  },
  visuallyHidden: {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 20,
  width: 1,
  },
  }));

  export default function ActivePollingListTable({...props}) {
    const history=useHistory();
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ID');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows =props.polls;
  const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
  };



  const handleChangePage = (event, newPage) => {
  setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
  };



  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
  <div className={classes.root}>
    <Paper className={classes.paper}>
      <TableContainer>
        <Table className={classes.table} aria-labelledby="tableTitle" size='small' aria-label="enhanced table">
          <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={rows.length} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
            <TableRow hover   role="checkbox" tabIndex={-1} key={row._id}>

              <TableCell align="left">{row.question}</TableCell>
              <TableCell align="left">{row.expiredat}</TableCell>
              <TableCell align="left">{row.answeredby.length}</TableCell>              
              <TableCell align="left">
                 <Button  onClick={()=>{
                props.selectPoll(row)
                
            }} color="primary">View</Button> 
              </TableCell> 

            </TableRow>
            );
            })}
            {emptyRows > 0 && (
            <TableRow style={{ height:33 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[5, 10]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </Paper>

  </div>
  );
  }