import React from 'react'
import { appendQuery,removeQuery } from "../../utils/utils";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    button: {
      margin: theme.spacing(0.2)
    }
  }));
function Title({location,title}) {
    const classes = useStyles();
    const alphabet =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    return (
        <div className='py-5'>
            {alphabet.map(item=>(
                <Button
                component={Link}
                to={appendQuery(location, { title: item })}
                className='text-xs '
                color="primary"
                size='small'
                variant={title === item ? "contained" : "outlined"}
                >
                    <h1 className='text-xs lg:text-sm '>
                {item}
                    </h1>
              </Button>
            ))}
        </div>
    )
}

export default Title
