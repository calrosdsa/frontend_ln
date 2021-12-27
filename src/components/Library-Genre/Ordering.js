import React from "react";
import { useSelector } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { appendQuery,removeQuery } from "../../utils/utils";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(0.5)
  }
}));

const Ordering = ({ location }) => {
  const ordering = useSelector(state => state.filter.ordering);
  const classes = useStyles();

  return (
      <div className="text-2xl">
    <h1 className="border-b-2 w-40 pb-2 border-gray-400 text-gray-400">Sorted By</h1>
    <div className="pt-3 -ml-4"> 
      <Button
        component={Link}
        to={appendQuery(location, { ordering: "-created" })}
        className={classes.button}
        color="primary"
        variant={ordering === "-created" ? "contained" : "outlined"}
        >
        New
      </Button>
      <Button
        component={Link}
        to={appendQuery(location, { ordering: "-update_at" })}
        className={classes.button}
        color="primary"
        variant={ordering === "-update_at" ? "contained" : "outlined"}
        >
        Updated
      </Button>
      <Button
        component={Link}
        to={appendQuery(location, { ordering: "-popular" })}
        className=''
        color="primary"
        variant={ordering === "-popular" ? "contained" : "outlined"}
        >
        Popular
      </Button>
    </div>
          </div>
  );
};

export default Ordering;
