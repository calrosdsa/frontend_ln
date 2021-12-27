import React,{useState} from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NextIcon from "@material-ui/icons/ChevronRight";
import PreviousIcon from "@material-ui/icons/ChevronLeft";
const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(0.5)
  }
}));

const Pagination = ({ location,pageIndex,current,pages_count,previous,next }) => {

  
  const classes = useStyles();

  var Buttons = [];
  if (pages_count) {
    for (let i = 1; i < pages_count + 1; i++ ) {
      Buttons.push(
        <Button
          key={i}
          variant="contained"
          color = 'primary'
          component={Link}
          to = {`/updates?page=${i}`}
          className={classes.button}
          size="small"
          color={i === current ? "contained" : "default"}
        >
          
          {i}
        </Button>
      );
    }
  }

  return (
   
<Grid container alignItems="star" justify="star">
        <Grid item>

            <Button
            component={Link}
            to = {`/updates${previous}`}
            disabled={previous === null}
            color = 'primary'
            className={classes.button}
            variant={current ? "contained" : "contained"}
            size="small"
            >
            <PreviousIcon />
          </Button>
          {Buttons}
          <Button
            component={Link}
            disabled={next === null}
            to = {`/updates${next}`}
            variant={current ? "contained" : "contained"}

            color = 'primary'
            size="small"
            className={classes.button}
            >
            <NextIcon />
          </Button>
        </Grid>
      </Grid>

  );
};

export default Pagination;
