import React from "react";
import Main from "./Main";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { SnackbarProvider } from "notistack";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Create from "./components/Create";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  main: {
    padding: 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const notifyConfig = {
  vertical: "top",
  horizontal: "right",
};

export default function DenseAppBar() {
  const classes = useStyles();

  return (
    <SnackbarProvider maxSnack={3} persist="false" anchorOrigin={notifyConfig}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              // onClick={() => window.history.go("/")}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Crud
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.main}>
          <Router>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/create" component={Create} />
            </Switch>
          </Router>
        </div>
      </div>
    </SnackbarProvider>
  );
}
