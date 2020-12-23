import React, {useState} from 'react';
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/Star';
import Viewer from './Viewer.js';
import Setting from './Setting.js';
import Compose from './Compose.js';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    'position': 'relative',
    'borderRadius': theme.shape.borderRadius,
    'backgroundColor': fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    'marginRight': theme.spacing(2),
    'marginLeft': 0,
    'width': '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

export const MyContext = React.createContext();
/**
 * Simple component with no state.
 *
 * @param {function} setMail set the mail
 * @param {function} text set the mail
 */
function getMail(setMail, text) {
  fetch('http://localhost:3010/v0/mail')
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        setMail(json);
      })
      .catch((error) => {
        setMail(error.toString());
      });
}

/**
 * Simple component with no state.
 *
 * @param {function} email get email
 * @param {function} setMail set the mail
 * @param {function} text mailbox
 */
function putMail(email, setMail, text) {
  // PUT request using fetch inside useEffect React hook
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    body: JSON.stringify(email),
  };
  fetch('http://localhost:3010/v0/mail/'+email.id+'?mailbox=' + text.toLowerCase(), requestOptions)
      .then(() => {
        getMail(setMail);
        console.log('current mailbox = ' + text.toLowerCase());
        console.log(email.read);
        // console.log(JSON.stringify(email));
        // console.log(emails[0].mail[0].content);
        // console.log(emails[0].mail[0].star);
      });
}

/**
 * Simple component with no state.
 *
 * @param {function} email get email
 * @param {function} setMail set the mail
 * @param {function} text mailbox
 */
function putUnread(email, setMail, text) {
  // PUT request using fetch inside useEffect React hook
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    body: JSON.stringify(email),
  };
  fetch('http://localhost:3010/v0/mail/'+email.id+'?mailbox=' + text.toLowerCase(), requestOptions)
      .then(() => {
        getMail(setMail);
        setClick(-1);
        // console.log(JSON.stringify(email));
        // console.log(emails[0].mail[0].content);
        // console.log(emails[0].mail[0].star);
      });
}

/**
 * Simple component with no state.
 *
 * @param {function} email get email
 * @param {function} setMail set the mail
 * @param {function} setClick set the mail
 */
function putTrash(email, setMail, setClick) {
  // PUT request using fetch inside useEffect React hook
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    body: JSON.stringify(email),
  };
  fetch('http://localhost:3010/v0/mail/'+email.id+'?mailbox=trash', requestOptions)
      .then(() => {
        getMail(setMail);
        // console.log('here');
        setClick(-1);

        // console.log(emails[0].mail[0].content);
        // console.log(emails[0].mail[0].star);
      });
}

/**
 * Simple component with no state.
 *
 * @param {function} email get email
 * @param {function} setMail set the mail
 * @param {function} setType set the mail
 * @param {function} name set the mail
 */
function putMailbox(email, setMail, setType, name) {
  // PUT request using fetch inside useEffect React hook
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    body: JSON.stringify(email),
  };
  fetch('http://localhost:3010/v0/mail/'+email.id+'?mailbox='+name, requestOptions)
      .then(() => {
        getMail(setMail);
        setType(name);
        // console.log('here2');
      });
}


/**
 * credits to: Material-ui Drawer
 * https://material-ui.com/components/drawers/#ResponsiveDrawer.js
 *
 * @return {object} JSX
 */
export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [text, setType] = useState('Inbox');
  const [emails, setMail] = React.useState('');
  const [card, setCard] = React.useState({});
  const [click, setClick] = useState(-1);
  const [clock, setClock] = React.useState('');
  const [rclick, setRead] = useState(-1);
  const theme = useTheme();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // console.log(emails);

  if (!emails) {
    getMail(setMail, text);
  }

  let currentMailbox = {};
  if (emails) {
    // console.log(emails);
    currentMailbox = emails.find(
        (m) => m.name === text.toLowerCase());
    // console.log(currentMailbox);
    if (currentMailbox) {
      currentMailbox.mail.sort((a, b) =>
        new Date(b.received) - new Date(a.received),
      );
    } else {
      console.log('There are no mails in this mailbox');
    }
  }

  let unread = 0;
  if (emails) {
    emails.forEach((key) => {
      // console.log(key);
      if (key.name == 'inbox') {
        key.mail.forEach((mail) =>{
          // console.log(mail);
          if (mail.read === false) {
            unread += 1;
          }
        });
      }
    });
  }

  let starred = 0;
  if (emails) {
    emails.forEach((key) => {
      // console.log(key);
      key.mail.forEach((mail) =>{
        // console.log(mail);
        if (mail.star === true) {
          starred += 1;
        }
      });
    });
  }

  const handleStar = (email) => {
    // console.log('clicked star = ' + email.star);
    if (!email.star) {
      email.star = true;
    } else {
      email.star = false;
    }
    // console.log(email.star);
    putMail(email, setMail, text);
  };

  const handleRead = (email, time) => {
    // console.log('read this email');
    // console.log(open);
    setCard(email);
    setClick(1);
    setClock(time);
  };

  const closeCard = () => {
    setClick(-1);
    console.log('test2');
  };

  // resource: Material UI - Dialog
  // citation: https://material-ui.com/components/dialogs/#dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const showDialog = (
    <Dialog open={open} onClose={handleClickClose}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Mailbox</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="add new mailbox"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickClose} color="primary">
        Cancel
        </Button>
        <Button onClick={handleClickClose} color="primary">
        Add
        </Button>
      </DialogActions>
    </Dialog>
  );

  // const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setClick(2);
  };

  const handleComposeOpen = () => {
    setClick(3);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  //  const handleMenuClose = () => {
  //    setAnchorEl(null);
  //    handleMobileMenuClose();
  //  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleComposeOpen}>
        <IconButton aria-label="show mails" color="inherit">
          <MailIcon />
        </IconButton>
        <p>Compose</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Settings</p>
      </MenuItem>
    </Menu>
  );
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Typography variant="h6" noWrap>
        CSE183 Mail
      </Typography>
      <Divider />
      <Typography variant="subtitle1" noWrap>
        {text}
      </Typography>
      <Divider />
      <List>
        <ListItem button disabled onClick={()=> {
          setType('Starred');
        }}
        >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
          <ListItemText>
            {starred}
          </ListItemText>
        </ListItem>
        <ListItem button onClick={()=> {
          setType('Inbox');
        }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
          <ListItemText>
            {unread}
          </ListItemText>
        </ListItem>
        <ListItem button onClick={()=> {
          setType('Sent');
        }}
        >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItem>
        <ListItem button disabled onClick={()=> {
          setType('Drafts');
        }}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
        <ListItem button onClick={()=> {
          setType('Trash');
        }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
      <Divider />
      <Divider />
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="New Mailbox" />
      </ListItem>
      {showDialog}
      <Divider />
      <ListItem button onClick={()=> {
        setClick(2);
      }}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </div>
  );
  // console.log(emails);
  return (
    <div className={classes.grow}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      {renderMobileMenu}
      <Typography variant="h6" noWrap>
        {text}
      </Typography>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <MyContext.Provider value={{emails, card, text, closeCard, clock,
          putTrash, setMail, setClick, setType, putMailbox, handleStar,
          rclick, setRead, handleRead, putMail, putUnread,
        }}>
          {click == 1 && <Viewer/>}
          {click == 2 && <Setting/>}
          {click == 3 && <Compose/>}
        </MyContext.Provider>
        <List>
          {emails && currentMailbox &&
            currentMailbox.mail.map((email) => {
              const dateInfo = new Date(email.received);
              // console.log(email.received);
              const today = new Date();
              let time = '';
              if (dateInfo.getDate() === today.getDate() &&
                dateInfo.getMonth() === today.getMonth() &&
                dateInfo.getFullYear() === today.getFullYear()) {
                const start = email.received.indexOf('T')+1;
                const end = email.received.indexOf('Z')-3;
                time = email.received.substring(start, end);
              } else if (dateInfo.getDate()+1 === today.getDate() &&
                dateInfo.getMonth() === today.getMonth() &&
                dateInfo.getFullYear() === today.getFullYear()) {
                time = 'Yesterday';
              } else if (dateInfo.getFullYear() === today.getFullYear()) {
                const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                time = m[dateInfo.getMonth()]+' '+dateInfo.getDate();
              } else if (dateInfo.getFullYear() !== today.getFullYear()) {
                time = dateInfo.getFullYear();
              }
              // console.log(email);
              return (
                <ListItem key={email.id}>
                  <ListItemAvatar>
                    <Avatar alt={email.from.name}
                      src="/static/images/avatar/1.jpg"/>
                  </ListItemAvatar>
                  <ListItemText button="true"
                    onClick={() => handleRead(email, time)}>
                    <Grid container justify="space-between">
                      <Typography noWrap variant='body1' align='left'
                        component={'span'}>
                        {email.read === false &&
                         <Box fontWeight="fontWeightBold">
                           {email.from.name}
                         </Box>}
                        {email.read === true &&
                         <Box>{email.from.name}</Box>}
                      </Typography>
                      <Typography variant='caption' align='right'>
                        {time}
                      </Typography>
                    </Grid>
                    <Typography noWrap variant= 'subtitle1'
                    >
                      {email.read === false &&
                       <Box fontWeight="fontWeightBold">
                         {email.subject}
                       </Box>}
                      {email.read === true &&
                       <Box>{email.subject}</Box>}
                    </Typography>
                    <Typography noWrap variant='body2'>
                      {email.content}
                    </Typography>
                  </ListItemText>
                  <Typography align='right'>
                    <IconButton color='inherit'
                      onClick={() => handleStar(email)}>
                      {!email.star?
                        <StarBorderIcon fontSize='small'/>:
                        <StarIcon fontSize='small'/>
                      }
                    </IconButton>
                  </Typography>
                </ListItem>
              );
            })}
        </List>
      </main>
    </div>
  );
}
