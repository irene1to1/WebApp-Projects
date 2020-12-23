import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
// import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {MyContext} from './Mobile.js';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    overflow: 'scroll',
    zIndex: 2,
    width: '100%',
    bottom: '1%',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      height: '50%',
    },
  },
  title: {
    fontSize: 20,
  },
  pos: {
    fontSize: 15,
    marginBottom: 12,
  },
  appBar: {
    zIndex: 2,
  },
}));
/**
 * credits to: Material-UI Card
 * https://material-ui.com/components/cards/#OutlinedCard.js
 *
 * @return {object} JSX
 */
export default function SimpleCard() {
  const classes = useStyles();
  const value = React.useContext(MyContext);

  const handleBoth = (name) => {
    console.log('hope this work!!!');
    value.setClick(-1);
  };

  return (
    <Card className={classes.root} elevation={0}>
      <Toolbar>
        <Grid container justify='space-between'>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleBoth}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <div>
            <IconButton color="inherit">
              <SaveIcon />
            </IconButton>
          </div>
        </Grid>
      </Toolbar>
      <CardContent>
      </CardContent>
    </Card>
  );
}
