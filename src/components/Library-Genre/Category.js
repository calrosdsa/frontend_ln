import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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

const Category = ({ location }) => {
  const category = useSelector(state => state.filter.category);
  const category_ = useSelector(state => state.filter.category_);

  const classes = useStyles();

  return (
    <div className="text-2xl">
    <h1 className="border-b-2 ml-3 w-64 pb-2 border-gray-400 text-gray-400">Genre / Category</h1>
    <div className="pt-3 flex flex-wrap"> 
        <Button
        component={Link}
        to={removeQuery(location, "category")}
        className={classes.button}
        color="primary"
        variant={category_ === null ? "contained" : "outlined"}
      >
        All
      </Button>
            {category.map(item=>(
                <div key={item.id}>
                    <Button
        component={Link}
        to={appendQuery(location, {category : item.id})}
        className={classes.button}
        color="primary"
        variant={category_ === `${item.id}` ? "contained" : "outlined"}
      >
        {item.title}
      </Button>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Category;
