import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const drawerWidth: number = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 1,
      justifyContent: "flex-end",
      background: theme.palette.primary.main,
      boxShadow: `0px 10px ${theme.palette.secondary.contrastText}`,
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      background: "transparent",
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: "auto",
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      width: "5%",
      marginRight: theme.spacing(1),
      color: theme.palette.background.paper,
    },
    menuIcon: {
      color: theme.palette.background.paper,
    },
    hide: {
      display: "none",
    },
    drawer: {
      display: "flex",
      width: drawerWidth,
      flexShrink: 1,
    },
    drawerPaper: {
      width: drawerWidth,
      background: theme.palette.background.paper,
      border: `2px solid ${theme.palette.primary.main}`,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

export default useStyles;
