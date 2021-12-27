import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NextIcon from "@material-ui/icons/ChevronRight";
import PreviousIcon from "@material-ui/icons/ChevronLeft";

import { appendQuery } from "../../utils/utils";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(0.5)
  } 
}));

const PaginationFilter = ({ location }) => {
  const { current, next, previous, pages_count } = useSelector(
    state => state.filter
  );
  const classes = useStyles();

  var Buttons = [];
  if (pages_count) {
    for (var i = 1; i < pages_count + 1; i++) {
      Buttons.push(
        <Button
          key={i}
          component={Link}
          to={appendQuery(location, { page: i })}
          variant={current ? "contained" : "outlined"}
          className={classes.button}
          color={i === current ? "primary" : "default"}
        >
          {i}
        </Button>
      );
    }
  }

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Button
            component={Link}
            to={`/genre/${previous}`}
            disabled={previous === null}
            variant="contained"
            color = "primary"
            size="small"
            className={classes.button}
          >
            <PreviousIcon />
          </Button>
          {Buttons}
          <Button
            disabled={next === null}
            component={Link}
            to={`/genre/${next}`}
            variant="contained"
            color = "primary"
            size="small"
            className={classes.button}
          >
            <NextIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default PaginationFilter;
