import React, { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@material-ui/icons";
import {
  ClickAwayListener,
  IconButton,
  List,
  Toolbar,
  AppBar,
  Drawer,
  CssBaseline,
  Divider,
} from "@material-ui/core";
import UserMenu from "../UserMenu/UserMenu";
import useStyles from "./useStyles";

interface MiniAppBarProps {
  appDrawer: any;
  component?: any;
}

const MiniAppBar: React.FunctionComponent<MiniAppBarProps> = ({
  component: Component,
  appDrawer: AppDrawer,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <ClickAwayListener onClickAway={handleDrawerClose}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <UserMenu />
          </Toolbar>
        </ClickAwayListener>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon color="primary" />
            ) : (
              <ChevronLeftIcon color="primary" />
            )}
          </IconButton>
        </div>
        <Divider
          style={{ backgroundColor: theme.palette.secondary.contrastText }}
        />
        <List className={classes.drawerContent}>
          <AppDrawer {...rest} />
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Component {...rest} />
      </main>
    </div>
  );
};

export default MiniAppBar;
