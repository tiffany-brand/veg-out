import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import './Menu.css'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    fontFamily: 'VT323',
    fontSize: 30,
  }
});

type Anchor = 'left';

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.MouseEvent,
  ) => {
    setState({ ...state, [anchor]: open });
  };

  const viewArray = [
    {
      label: "Home",
      link: "/home"
    },
    {
      label: "Community",
      link: "/community"
    },
    {
      label: "Challenges",
      link: "/challenges"
    },
    {
      label: "Plant Log",
      link: "/plant-log"
    },
    {
      label: "Log Out",
      link: "/"
    },
  ]

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
    >
      <List>
        {viewArray.map((item, index) => (
          <ListItem button key={index}>
            <Link to={item.link}>
              <ListItemText primary={item.label} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {(['left'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <div className="menu-i" onClick={toggleDrawer(anchor, true)}>i</div>
          {/* <Button className={classes.menuIcon} onClick={toggleDrawer(anchor, true)}>i</Button> */}
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}