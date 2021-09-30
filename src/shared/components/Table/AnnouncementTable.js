import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "./styles/tableStyle.js";
import { Link } from "@material-ui/core";
import { useModelState } from "../../../misc/custom-hooks.js";
import { ViewAnnouncementModal } from "../../../announcements/pages/ViewAnnouncementModal.js";
import { useProfile } from "../../../context/profile.context.js";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import announcementAPI from '../../../misc/axios-calls/announcementAPI';

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
const {user}=useProfile();
const { isOpen, open, close } = useModelState();
const [announcement,setAnnouncement]=React.useState(null);
const classes = useStyles();
const { tableHead, tableData, tableHeaderColor } = props;
const deleteAnnouncement=async()=>{
  console.log('delete');
  var apiBaseUrl = `/announcements/${announcement._id}`
  // eslint-disable-next-line no-extend-native
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
  await announcementAPI.delete(apiBaseUrl)
    .then(function (response) {
      if (response.status === 200) {

        console.log(response.data);
      
      }

    })
    .catch(function (error) {
      console.log(error);
  


    });
}
return (
<div className={classes.tableResponsive}>
  <Table className={classes.table}>
    {tableHead !== undefined ? (
    <TableHead className={classes[tableHeaderColor + "TableHeader" ]}>
      <TableRow className={classes.tableHeadRow}>
        {tableHead.map((prop, key) => {
        return (
        <TableCell className={classes.tableCell + " " + classes.tableHeadCell} key={key}>
          {prop}
        </TableCell>
        );
        })}
      </TableRow>
    </TableHead>
    ) : null}
    <TableBody>
    {tableData.length===0  &&
     
        <TableRow key='no-record' className={classes.tableBodyRow}>
  
          <TableCell className={classes.tableCell}  style={{color:'gray'}}> No Announcements</TableCell>
          </TableRow>
      
      }
      {tableData.length!==0 && tableData.map((prop, key) => {
      return (
      <TableRow key={prop._id} className={classes.tableBodyRow}>

        <TableCell className={classes.tableCell} > {prop.title} </TableCell>
        <TableCell style={{width:"20px"}} className={classes.tableCell}>
          <Link component="button" variant="body2" onClick={()=> {
          console.info(prop._id);
          setAnnouncement(prop);
          open();
          }} > View</Link>
        </TableCell>
        {user.type==='admin'&&
        <TableCell style={{width:"20px"}} className={classes.tableCell}>
          <IconButton onClick={()=> {
          console.info(prop._id);
          setAnnouncement(prop);
          deleteAnnouncement();
          }} >
            <DeleteIcon />
          </IconButton>
        </TableCell> }
        {user.type==='admin' && <TableCell style={{width:"20px"}} className={classes.tableCell} >
          <IconButton>
            <EditIcon />
          </IconButton>
        </TableCell>
        }
      </TableRow>
      );
      })}
    </TableBody>
  </Table>
  {isOpen &&
  <ViewAnnouncementModal announcement={announcement} handleClose={close} open={open} />}
</div>
);
}

CustomTable.defaultProps = {
tableHeaderColor: "gray",
};

CustomTable.propTypes = {
tableHeaderColor: PropTypes.oneOf([
"warning",
"primary",
"danger",
"success",
"info",
"rose",
"gray",
]),
tableHead: PropTypes.arrayOf(PropTypes.string),
tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};