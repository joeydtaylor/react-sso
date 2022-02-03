import React, { useState } from "react";
import clsx from "clsx";
import useStyles from "./useStyles";
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  ClickAwayListener,
  Divider,
  IconButton,
  useTheme,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@material-ui/icons";
import UserMenu from "src/components/AppBar/UserMenu/UserMenu";

interface TemporaryAppBarProps {
  appDrawer: React.FunctionComponent;
}

const TemporaryAppBar: React.FunctionComponent<TemporaryAppBarProps> = ({
  appDrawer: AppDrawer,
  ...rest
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <AppBar
          position="sticky"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setOpen(true)}
              size="small"
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
            <UserMenu />
          </Toolbar>
        </AppBar>
      </ClickAwayListener>
      <div className={classes.drawer}>
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            <IconButton onClick={() => setOpen(false)}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon color="primary" />
              ) : (
                <ChevronLeftIcon color="primary" />
              )}
            </IconButton>
          </div>
          <Divider />
          <AppDrawer {...rest} />
        </Drawer>
      </div>
    </div>
  );
};
export default TemporaryAppBar;
