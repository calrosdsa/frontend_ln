import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
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

const Status = ({ location }) => {
  const status = useSelector(state => state.filter.status);
  const status_ = useSelector(state => state.filter.status_);

  const classes = useStyles();

  return (
    <div className="text-2xl">
    <h1 className="border-b-2 w-40 pb-2 border-gray-400 text-gray-400">Status</h1>
    <div className="pt-3 flex -ml-4"> 
        <Button
        component={Link}
        to={removeQuery(location, "status")}
        className={classes.button}
        color="primary"
        variant={status_ === null ? "contained" : "outlined"}
      >
        All
      </Button>
            {status.map(item=>(
                <div key={item.id}>
                    <Button
        component={Link}
        to={appendQuery(location, {status : item.id})}
        className={classes.button}
        color="primary"
        variant={status_ === `${item.id}` ? "contained" : "outlined"}
      >
        {item.status}
      </Button>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Status;
