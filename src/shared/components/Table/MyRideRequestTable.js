import React from "react";
import PropTypes from "prop-types";

import {convertDate} from '../../../misc/helpers';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "./styles/tableStyle.js";


import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  const history=useHistory();
  // eslint-disable-next-line no-extend-native
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop} 
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
    
       {tableData.map((prop, key) => {
            return (
              <TableRow key={prop._id} className={classes.tableBodyRow}>
                                     <TableCell className={classes.tableCell} key={key}>{convertDate(prop.ride.ridedatetime)}</TableCell>
                                     <TableCell className={classes.tableCell} key={key}>{prop.ride.source.area.capitalize()}</TableCell>
                                     <TableCell className={classes.tableCell} key={key}>{prop.ride.destination.area.capitalize()}</TableCell>
                                     <TableCell className={classes.tableCell} key={key}>{prop.seats}</TableCell>

                                     <TableCell className={classes.tableCell} key={key}>{prop.status.capitalize()}</TableCell>
                                     <TableCell className={classes.tableCell} key={key}>
                                     <Button  onClick={()=>{
                       history.push('/carpolling');
                 }} color="primary">View</Button> 
                                     </TableCell>


                
             
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
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
