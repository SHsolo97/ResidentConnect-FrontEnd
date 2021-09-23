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
import { ParticipateInPoll } from "../../../polling/pages/ParticipateInPoll.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const { isOpen, open, close } = useModelState();
  const [poll,setPoll]=React.useState(null);
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  
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
                
                    <TableCell className={classes.tableCell} key={key}>
                      <Link component="button"
      variant="body2"  onClick={() => {
        console.info(prop._id);
        setPoll(prop);
        open();
      }} > {prop.question} </Link>
                    </TableCell>
                
               
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isOpen &&
       <ParticipateInPoll poll={poll} handleClose={close} open={open} />}
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
