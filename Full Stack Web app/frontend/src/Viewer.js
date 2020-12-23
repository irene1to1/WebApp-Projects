import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {MyContext} from './Mobile.js';
import IconButton from '@material-ui/core/IconButton';
// import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MailIcon from '@material-ui/icons/Mail';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ReplyIcon from '@material-ui/icons/Reply';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    overflow: 'scroll',
    zIndex: 2,
    width: '100%',
    bottom: '1%',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
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
  console.log(value.card);
  const [anchorEl, setAnchorEl] = React.useState(null);
  //  let current = {};
  //  if (value.emails) {
  //    console.log(value.emails);
  //    current = value.emails.find(
  //      (m) => m.name === value.text.toLowerCase());
  //  }
  const throwTrash = () => {
    console.log('test');
    value.putTrash(value.card, value.setMail, value.setClick);
  };

  const handleMove = (name) => {
    console.log('hope this work');
    console.log(name);
    value.putMailbox(value.card, value.setMail, value.setType, name);
  };

  const handleCloseCard = () => {
    if (value.card.read === false) {
      value.card.read = true;
      value.putMail(value.card, value.setMail, value.text);
      value.setClick(-1);
    } else {
      value.setClick(-1);
      // console.log('help');
    }
  };

  const handleComposeCard = () => {
    value.setClick(3);
  };

  const handleUnread = () => {
    if (value.card.read === true) {
      value.card.read = false;
      value.putMail(value.card, value.setMail, value.text);
      value.setClick(-1);
    } else {
      value.setClick(-1);
    }
  };

  // resource: Material UI - PopOver
  // citation: https://material-ui.com/components/popover/#anchor-playground
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const popupMailbox = (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List>
          {value.emails.map((email) => {
            return (
              <ListItem key={email.name}>
                <ListItemText button='true'
                  onClick={() => handleMove(email.name)}>
                  <Typography>
                    {email.name}
                  </Typography>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Popover>
    </div>
  );

  return (
    <Card className={classes.root} elevation={0}>
      <Toolbar>
        <Grid container justify='space-between'>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleCloseCard}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <div>
            <IconButton color="inherit"
              onClick={handleUnread}>
              <MailIcon />
            </IconButton>
            <IconButton color="inherit" aria-describedby={id}
              onClick={handleClick}>
              <SystemUpdateAltIcon />
            </IconButton>
            <IconButton color="inherit"
              onClick={throwTrash}>
              <DeleteIcon/>
            </IconButton>
          </div>
        </Grid>
      </Toolbar>
      {popupMailbox}
      <Divider />
      <CardContent>
        <Typography variant='h6'>
          {value.card.subject}
        </Typography>
        <Divider />
        <Grid container justify='space-between' alignItems='center'>
          <Button variant="contained" disabled
            style={{maxWidth: '30px', maxHeight: '30px', minHeight: '30px'}}>
            {value.text}
          </Button>
          <IconButton color='inherit'
            onClick={() => value.handleStar(value.card)}>
            {!value.card.star?
              <StarBorderIcon fontSize='small'/>:
              <StarIcon fontSize='small'/>
            }
          </IconButton>
        </Grid>
        <Divider />
        <Grid container justify='space-between' alignItems='center'>
          <div>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={value.card.from.name}
                  src="/static/images/avatar/1.jpg"/>
              </ListItemAvatar>
              <ListItemText>
                <Grid container item justify='flex-start'>
                  <Typography noWrap variant='body1' >
                    {value.card.from.name}
                  </Typography>
                  <Typography variant='body2'>
                    {value.clock}
                  </Typography>
                </Grid>
                <Typography noWrap variant='body2' >
                  {value.card.from.email}
                </Typography>
              </ListItemText>
            </ListItem>
          </div>
          <IconButton color='inherit' onClick={handleComposeCard}>
            <ReplyIcon/>
          </IconButton>
        </Grid>
        <Divider />
        <Typography variant="body2">
          {value.card.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
